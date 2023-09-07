import React from 'react';
import Image from 'next/image';
import main from '../public/assets/main.jpg';

export default function Hero() {
  return (
    <div className='relative h-[500px] w-full'>
      <Image
        className='h-[500px] w-full object-cover'
        src={main}
        alt=''
        width={900}
        height={500}
      />
      <div className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-bodyColor px-8 text-container shadow-md bg-white bg-opacity-60 rounded'>
        <h1 className='text-4xl font-semibold mb-2 font-titleFont '>
          Discover the Perfect Accessories
        </h1>
        <p className='text-lg  mb-4'>
          Find stylish watches, bags, and sunglasses for every occasion.
        </p>
      </div>
    </div>
  );
}
