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
    `http://e-shop-five-nu.vercel.app/api/products?term=${searchTerm}`
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
      <div>Search Results for: {searchParams?.term || ''}</div>
      <div className="grid grid-cols-3 gap-16">
        {data?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

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
