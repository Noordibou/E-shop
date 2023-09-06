import axios from 'axios';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductItem from '../../../components/ProductItem';
import { GetServerSideProps } from 'next';

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
  data: Product[];
  category: string;
}

const Category = ({ data, category }: Props) => {
    return (
      <Layout>
      <div className="w-full h-full mx-auto px-8">
        <h2 className="text-center pt-16 text-2xl">
          <span className="text-mainColor text-2xl font-titleFont uppercase font-semibold">
            {category}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.map(product => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
  
  export const getServerSideProps: GetServerSideProps = async ctx => {
    const category = ctx.params!.cat;
  
    const { data } = await axios.get<Product[]>(
      `https://e-shop-unty.vercel.app/api/products?cat=${category}`
    );
  
    return {
      props: {
        data,
        category
      }
    };
  };
  
  export default Category;

