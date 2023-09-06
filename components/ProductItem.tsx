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
    <Link href={`/product/${product._id}`} className=" no-underline hover:shadow-xl transition-all block p-5 shadow rounded-lg">

      <div className="relative h-64">
        <Image 
          src={product.image}
          alt=""
          layout="fill"
          objectFit="cover"
          className="rounded "
        />
      </div>

      <div className="text-center ">
        <h3 className="text-bodyColor font-titleFont text-2xl capitalize mt-4">{product.name}</h3>
        <p className="text-mainColor font-titleFont capitalize">{product.category}</p>
        <p className="font-bold text-bodyColor">${product.price}</p>
      </div>

    </Link>
  );
}

export default ProductItem