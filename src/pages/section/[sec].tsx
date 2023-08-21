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
  section: string;
}

const Section = ({ data, section }: Props) => {
    return (
      <Layout>
        <div className="w-10/12 h-full mx-auto">
          <h2 className="text-center pt-16 text-2xl">
             <span className="text-mainColor text-2xl font-titleFont uppercase font-semibold">{section}</span>
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
    const section = ctx.params!.sec;
  
    const { data } = await axios.get<Product[]>(
      `https://e-shop-five-nu.vercel.app/api/products?sec=${section}`
    );
  
    return {
      props: {
        data,
        section
      }
    };
  };
  
  export default Section;