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

// Common function to fetch search results
async function fetchSearchResults(searchTerm: string) {
  const { data } = await axios.get<Product[]>(
    `https://e-shop-unty.vercel.app/api/products?term=${encodeURIComponent(searchTerm)}`
  );
  return data;
}

export default function SearchPage({ initialData = [] }: { initialData?: Product[] }) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('term') || '';
  
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Product[]>(initialData);

  // Effect to update results when search term changes
  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm) {
        setIsLoading(true);
        try {
          const results = await fetchSearchResults(searchTerm);
          setData(results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setData([]);
      }
    };

    fetchData();
  }, [searchTerm]);

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
              {data?.length > 0 ? (
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
                <div className="text-center pt-20 bg-white rounded-xl shadow-sm">
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