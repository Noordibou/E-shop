"use client";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  desc: string;
  category: string;
  section: string;
  price: number;
  image: string;
  featured: boolean;
}

function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState('');

  // Updated to use relative URL for API call instead of absolute URL
  const fetchSearchResults = async (term: string) => {
    console.log(`Fetching results for term: "${term}"`);
    try {
      // Use relative URL to avoid CORS issues
      const url = `/api/products?term=${encodeURIComponent(term)}`;
      console.log(`API URL: ${url}`);
      
      const response = await axios.get<Product[]>(url);
      console.log(`API response status: ${response.status}`);
      console.log(`Results count: ${response.data.length}`);
      
      return response.data;
    } catch (err) {
      console.error('API request failed:', err);
      if (axios.isAxiosError(err)) {
        setError(`Search failed: ${err.message}`);
      } else {
        setError('Search failed: Unknown error');
      }
      return [];
    }
  };

  // Effect to update results when search term changes
  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setData([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        const results = await fetchSearchResults(searchTerm);
        setData(results);
      } catch (error) {
        console.error('Error in useEffect:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]); // Re-run when searchTerm changes

  return (
    <Layout>
      <div className="flex flex-col">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Search Header */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-titleFont">
              Search Results for: &quot;{searchTerm}&quot;
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              {isLoading ? (
                "Searching..."
              ) : (
                `Found ${data?.length || 0} ${data?.length === 1 ? "result" : "results"}`
              )}
            </p>
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600">
                <p>{error}</p>
                <p className="text-sm mt-1">
                  Check that your API route at /api/products is properly set up to handle search requests.
                </p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-mainColor border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading results...</p>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {!isLoading && (
            <>
              {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                  {data.map((product) => (
                    <div
                      key={product._id}
                      className="group transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <ProductItem product={product} />
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-mainColor text-white text-xs font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Featured
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center pt-20 bg-white rounded-xl shadow-sm p-10">
                  <h3 className="text-2xl font-medium text-gray-800 font-titleFont mb-2">
                    No Results Found
                  </h3>
                  <p className="text-gray-500">
                    No products match your search term &quot;{searchTerm}&quot;. Try something else!
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default SearchPage;