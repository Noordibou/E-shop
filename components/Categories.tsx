import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import img1 from '../public/assets/her-him-glasses.jpg';
import img2 from '../public/assets/her-him-watches.jpg'; 
import img3 from '../public/assets/her-him-bags.jpg';

export default function Categories() {
  return (
    <div className="relative h-full w-full top-12">
      <div className="container mx-auto px-4">
        
        {/* title */}
        <h2 className="mb-8 text-3xl font-titleFont font-semibold text-bodyColor">Categories</h2>
        
        <div className="flex flex-col md:flex-row gap-4 px-4 justify-between">
          
          <Link href='/category/watches' className="mb-4 md:mb-0 md:w-1/3 h-64 relative">
            <Image 
              src={img2}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              className="rounded"
            />

            <span className="absolute bottom-0 left-0 bg-bodyColor text-bgColor px-4 py-2 text-sm font-medium">
              Watches
            </span>
          </Link>

          <Link href='/category/bags' className="mb-4 md:mb-0 md:w-1/3 h-64 relative">
            <Image 
              src={img3}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              className="rounded" 
            />

            <span className="absolute bottom-0 left-0 bg-bodyColor text-bgColor px-4 py-2 text-sm font-medium">
              Bags
            </span>
          </Link>

          <Link href='/category/sunglasses' className="md:w-1/3 h-64 relative">
            <Image 
              src={img1}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              className="rounded"
            />

            <span className="absolute bottom-0 left-0 bg-bodyColor text-bgColor px-4 py-2 text-sm font-medium">
              Sunglasses
            </span>
          </Link>

        </div>
      </div>
    </div>
  )
}