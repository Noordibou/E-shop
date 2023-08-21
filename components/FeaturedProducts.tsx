import React from 'react'
import ProductItem from './ProductItem'

interface FeaturedProductsProps {
  products: Array<{
    _id: string; 
    name: string;
    desc: string;
    category: string;
    section: string;
    price: number;
    image: string;
    featured: boolean;
  }>;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className='relative top-36 mt-20 h-full w-full pb-48 flex justify-center  '>
      <div className='h-full w-10/12 mx-auto'>
        <h2 className='mb-8 text-3xl text-darkColor font-titleFont font-semibold'>Featured Products</h2>
        <div className="grid grid-cols-3 gap-16">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
