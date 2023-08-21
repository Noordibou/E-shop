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
        <div className="w-10/12 h-full mx-auto">
          <h2 className="text-center pt-16 text-2xl">
             <span className="text-mainColor text-2xl font-titleFont uppercase font-semibold">{category}</span>
          </h2>
  
          <div className="grid grid-cols-3 gap-16">
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
      `http://localhost:3000/api/products?cat=${category}`
    );
  
    return {
      props: {
        data,
        category
      }
    };
  };
  
  export default Category;

