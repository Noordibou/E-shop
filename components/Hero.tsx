import React from 'react';
import Image from 'next/image';
import main from '../public/assets/main.jpg';

export default function Hero() {
  return (
    <div className='relative h-[500px] w-full'>
      <Image
        className='h-[500px] w-full object-cover rounded-xl'
        src={main}
        alt=''
        width={900}
        height={500}
      />
      <div className='absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center text-white'>
        <h1 className='text-4xl font-semibold mb-2'>
          Discover the Perfect Sunglasses
        </h1>
        <p className='text-lg mb-4'>
          Find stylish sunglasses for every occasion.
        </p>
        <button className='bg-mainColor text-white px-8 py-2 rounded-lg text-lg hover:bg-opacity-80'>
          Shop Now
        </button>
      </div>
      </div>
    
  );
}