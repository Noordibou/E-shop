import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
  priority?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, priority = false }) => {
  return (
    <Link
      href={`/product/${product._id}`}
      className="group no-underline bg-white rounded-lg shadow-md hover:shadow-xl h-full flex flex-col" // Added flex properties
      aria-label={`View ${product.name} details`}
    >
      {/* Fixed Image Container */}
      <div className="relative h-64 flex-shrink-0"> {/* flex-shrink-0 prevents image compression */}
        <Image
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-lg "
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Content Container with consistent height */}
      <div className="p-5 text-center flex flex-col flex-grow justify-between min-h-[140px]">
        <div>
          <h3
            className="text-gray-900 font-titleFont text-xl capitalize 
                      mt-2 mb-1 font-semibold line-clamp-2 "
          >
            {product.name}
          </h3>
          <p
            className="text-gray-600 font-titleFont text-sm capitalize 
                      mb-2 line-clamp-1"
          >
            {product.category}
          </p>
        </div>
        <p className="text-gray-900 font-bold text-lg mt-auto">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default React.memo(ProductItem);