import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import { GetServerSideProps } from 'next';
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

interface Props {
  initialData: Product[]; 
  searchParams?: { term: string };
}

async function fetchSearchResults(searchTerm: string) {
  const { data } = await axios.get<Product[]>(
    `https://e-shop-unty.vercel.app/api/products?term=${searchTerm}`
  );
  return data;
}

function SearchPage({ searchParams, initialData }: Props) {
  const [data, setData] = useState<Product[]>(initialData);

  useEffect(() => {
    if (searchParams?.term) {
      fetchSearchResults(searchParams.term).then((result) => {
        setData(result);
      });
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="flex flex-col">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 ">
          {/* Search Header */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-titleFont">
              Search Results for: "{searchParams?.term || ""}"
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              Found {data?.length || 0} {data?.length === 1 ? "result" : "results"}
            </p>
          </div>

          {/* Product Grid or Empty State */}
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
                No products match your search term "{searchParams?.term || ""}". Try something else!
              </p>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const search = ctx.query.term as string | undefined;

  if (!search) {
    return {
      props: {
        initialData: [], 
      },
    };
  }

  const data = await fetchSearchResults(search);

  return {
    props: {
      initialData: data,
      searchParams: { term: search },
    },
  };
};

export default SearchPage;
