import React from 'react';
import ProductItem from './ProductItem';

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

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const featuredProducts = products.filter(product => product.featured);

  // Add loading state if no products
  if (!featuredProducts.length) {
    return (
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-semibold text-gray-800 font-titleFont">Featured Products</h2>
          <p className="text-gray-600 text-center">No featured products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative element */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-titleFont relative inline-block">
            Featured Products
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-mainColor rounded-full" />
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products
          </p>
        </div>

        {/* Enhanced grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product._id}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <ProductItem 
                product={product} 
              />
            </div>
          ))}
        </div>
      </div>
      </section>
    );
};

export default FeaturedProducts;