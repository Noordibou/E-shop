import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router'; 
import React, { useState } from 'react';
import { AiFillShopping, AiFillHeart } from 'react-icons/ai';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import Layout from '../../../components/Layout';
import { useCartContext } from '../../../ctx/cartContex';
import { GetServerSidePropsContext } from 'next';

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

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCartContext();
  const router = useRouter();

  const addQuantity = (command: 'dec' | 'inc') => {
    setQuantity((prev) => {
      if (command === 'dec') {
        if (prev <= 1) return 1;
        else return prev - 1;
      }

      if (command === 'inc') {
        return prev + 1;
      }
      return prev;
    });
  };


  return (
    <Layout>
      <div className="container mx-auto py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Back button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center text-bodyColor hover:text-mainColor transition-colors mb-4 md:mb-6"
        >
          <IoArrowBackCircleOutline size={28} className="mr-2" />
          <span className="text-sm md:text-base">Back to products</span>
        </button>

        {/* Product Container */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-16">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-md">
              <Image
                src={product?.image}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                alt={product?.name || "Product image"}
                className="transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            {/* Category & Favorite */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                {product?.category}
              </span>
             
            </div>
            
            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-bodyColor mb-4">
              {product?.name}
            </h1>
            
            {/* Price */}
            <div className="text-xl md:text-2xl font-semibold text-mainColor mb-4">
              ${product?.price.toFixed(2)}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product?.desc}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => addQuantity("dec")}
                  className="w-10 h-10 flex items-center justify-center rounded-l-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <span className="text-lg font-medium">−</span>
                </button>
                <div className="w-14 h-10 flex items-center justify-center bg-gray-100 border-t border-b border-gray-200">
                  <span className="text-lg">{quantity}</span>
                </div>
                <button
                  onClick={() => addQuantity("inc")}
                  className="w-10 h-10 flex items-center justify-center rounded-r-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                  aria-label="Increase quantity"
                >
                  <span className="text-lg font-medium">+</span>
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart({ ...product, quantity })}
              className="mt-auto py-3 px-6 rounded-lg flex items-center justify-center gap-3 bg-mainColor text-white hover:bg-opacity-90 transition-all text-lg font-medium w-full md:w-auto"
            >
              <AiFillShopping size={22} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const { id } = context.params || {};

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: product } = await axios.get(
      `https://e-shop-unty.vercel.app/api/products/${id}`
    );
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);

    return {
      notFound: true,
    };
  }
}