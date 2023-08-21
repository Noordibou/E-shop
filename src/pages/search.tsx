import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Specify the expected shape
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Fetch search results based on the 'query' parameter
      // You can use axios or any other HTTP library for this purpose
      // Replace the following code with your actual API call
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data: Product[]) => {
          setSearchResults(data); // Assuming data is an array of search results
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setIsLoading(false);
        });
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              {result.name} - ${result.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}