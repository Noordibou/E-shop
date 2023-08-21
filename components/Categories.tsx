import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img1 from '../public/assets/her-him-glasses.jpg';
import img2 from '../public/assets/her-him-watches.jpg';
import img3 from '../public/assets/her-him-bags.jpg';




export default function Categories() {
  return (
    <div className="relative h-full w-full top-24 flex justify-center">
      <div className="h-full w-10/12 top-24">
        {/* title */}
        <h2 className="mb-8 text-3xl font-titleFont font-semibold text-darkColor">Categories</h2>
        <div className="h-full w-full flex items-center gap-4 justify-between">
          {/* category */}
          {/* category */}
          <Link href='/category/watches' className="h-[350px] w-[350px] relative">
            <Image src={img2} alt=" " width={325} height={325} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-bgColor font-titleFont ">Watches</span>
          </Link>
          {/* category */}
          <Link href='/category/bags' className="h-[350px] w-[350px] relative">
            <Image src={img3} alt=" " width={325} height={325} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-bgColor font-titleFont" >Bags </span>
          </Link>
          <Link href='/category/sunglasses' className="h-[350px] w-[350px] relative">
            <Image src={img1} alt=" " width={500} height={500} className="h-full w-full object-cover" />
            <span className="absolute bottom-0 left-0 bg-mainColor px-6 py-2 text-bgColor font-titleFont">Sunglasses</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
