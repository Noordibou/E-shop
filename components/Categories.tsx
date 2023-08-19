import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img1 from '../public/assets/her-him-glasses.jpg';
import img2 from '../public/assets/her-him-watches.jpg';
import img3 from '../public/assets/her-him-bags.jpg';




export default function Categories() {
  return (
    <div className="h-full w-full flex justify-center">
      <div className="h-full w-10/12">
        {/* title */}
        <h2 className="mb-8 text-3xl text-darkColor">Categories</h2>
        <div className="h-full w-full flex items-center justify-between">
          {/* category */}
          <Link href='/category/sunglasses' className="h-[325px] w-[325px] relative">
            <Image src={img1} alt=" " width={325} height={325} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-lightColor ">Sunglasses</span>
          </Link>
          {/* category */}
          <Link href='/category/watches' className="h-[325px] w-[325px] relative">
            <Image src={img2} alt=" " width={325} height={325} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-lightColor">Watches</span>
          </Link>
          {/* category */}
          <Link href='/ category/bags' className="h-[325px] w-[325px] relative">
            <Image src={img3} alt=" " width={325} height={325} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-lightColor" >Bags </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
