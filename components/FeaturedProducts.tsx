import React from 'react';
import ProductItem from './ProductItem';

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

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="relative top-12 mt-20 pb-16 ">
      
      <div className="container mx-auto px-4">

        <h2 className="mb-8 text-3xl font-semibold text-gray-800 font-titleFont">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {featuredProducts.map(product => (
            <ProductItem 
              key={product._id}
              product={product} 
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default FeaturedProducts;