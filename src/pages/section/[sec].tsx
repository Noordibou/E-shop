import axios from 'axios';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductItem from '../../../components/ProductItem';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

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
  const router = useRouter();

  return (
    <Layout>
      <div className="w-full px-4">
      <IoArrowBackCircleOutline
            size={35}
            onClick={() => router.back()} 
            style={{ cursor: 'pointer' }}
            className='text-bodyColor mt-8 '
          />
        <h2 className="text-center pb-4 text-2xl">
          <span className="text-mainColor text-2xl font-titleFont uppercase font-semibold">{section}</span>
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
  const section = ctx.params!.sec;

  const { data } = await axios.get<Product[]>(
    `https://e-shop-unty.vercel.app/api/products?sec=${section}`
  );

  return {
    props: {
      data,
      section
    }
  };
};

export default Section;
