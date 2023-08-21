import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillShopping } from 'react-icons/ai';
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



export default function ProductDetail({product}: {product: Product}) {
const [quantity, setQuantity] = useState(1);

const { addToCart } = useCartContext()

const addQuantity = (command: 'dec' | 'inc') => {
    setQuantity((prev) => {
        if (command === 'dec') {
            if (prev <= 1) return 1
            else return prev - 1
        }

        if (command === 'inc') {
            return prev + 1
        }
        return prev;
    })
}

return (
    <>
        <Layout>
            <div className='py-32 mt-4 h-full w-full flex justify-center '>
                {/* left */}
                <div className="h-full w-10/12 flex justify-between">
                    <div className='flex-1 px-4 rounded-lg'>
                        <Image src={product?.image} width="500" height="1250" alt="product image" />
                    </div>
                    {/* right */}
                    <div className='flex-1 flex flex-col gap-8 '>
                        <h2 className='text-[20px] text-bodyColor font-titleFont'>Name of Product: <span className='text-mainColor capitalize ml-2'>{product?.name}</span></h2>
                        <p className='text-[20px] text-bodyColor'>Description: <span className='text-mainColor ml-2 text-ellipsis'>{product?.desc}</span></p>
                        <div className='flex gap-6 items-center'>
                            <span onClick={() => addQuantity('dec')} className='bg-slate-300 px-4 py-2 text-[18px]'>-</span>
                            <span>{quantity}</span>
                            <span onClick={() => addQuantity('inc')} className='bg-slate-300 px-4 py-2 text-[18px]'>+</span>
                        </div>
                        <span className="text-[20px] text-bodyColor">Price: <span className='text-mainColor ml-2'>${product?.price}</span></span>
                        <button onClick={() => addToCart({...product, quantity})} className="mt-auto py-2 px-5 rounded-lg flex items-center gap-4 bg-mainColor text-[#efefef] max-w-max hover:bg-mainColor tranistion-all">Add to Cart <AiFillShopping /></button>
                    </div>
                </div>
            </div>
        </Layout>
    </>
)
}


export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>) {
    const { id } = context.params || {}; 
  
    if (!id) {
    
      return {
        notFound: true, 
      };
    }
  
    try {
      const { data:product } = await axios.get(`http://localhost:3000/api/products/${id}`);
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