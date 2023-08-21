import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`/product/${product._id}`} className="no-underline shadow-lg p-5 hover:shadow-xl transition-all">
      <div>
        <div>
          <Image  className='h-[350px] w-[350px] relative object-cover' src={product.image} width={500} height={500} alt=""/>
        </div>
        <div className='flex items-center justify-center flex-col gap-2'>
          <h3 className='text-mainColor font-titleFont text-2xl capitalize mt-4'>{product.name}</h3>
          <span className='text-[18px] text-bodyColor font-titleFont capitalize'>{product.category}</span>
          <span className='text-[#555]'>${product.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem