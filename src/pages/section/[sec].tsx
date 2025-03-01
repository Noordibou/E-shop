import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import ProductItem from '../../../components/ProductItem';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { IoArrowBackCircleOutline, IoFilterOutline, IoGridOutline, IoListOutline } from 'react-icons/io5';
import { BiSort } from 'react-icons/bi';

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

interface Props {
  data: Product[];
  section: string;
}

const Section = ({ data: initialData, section }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<Product[]>(initialData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('');

  // Sort products when sort option changes
  useEffect(() => {
    let sortedData = [...initialData];
    
    if (sortOption === 'price-asc') {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setData(sortedData);
  }, [sortOption, initialData]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header with back button and section title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-bodyColor hover:text-mainColor transition-colors mr-4"
              aria-label="Go back"
            >
              <IoArrowBackCircleOutline size={28} className="mr-2" />
              <span className="text-sm md:text-base">Back</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-bodyColor">
              <span className=" uppercase">{section}</span> Collection
            </h1>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            {/* View mode toggle */}
            <div className="flex items-center bg-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                aria-label="Grid view"
              >
                <IoGridOutline size={20} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                aria-label="List view"
              >
                <IoListOutline size={20} />
              </button>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <div className="flex items-center bg-gray-300 rounded-lg p-2">
                <BiSort size={20} className="text-gray-500 mr-2" />
                <select 
                  className="bg-transparent text-sm focus:outline-none"
                  value={sortOption}
                  onChange={handleSortChange}
                  aria-label="Sort products"
                >
                  <option value="">Sort By</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 mb-6">
          Showing {data.length} {data.length === 1 ? 'product' : 'products'}
        </p>
        
        {/* Products grid/list */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {data.map(product => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {data.map(product => (
              <div 
                key={product._id} 
                className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                onClick={() => router.push(`/product/${product._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="sm:w-1/3 md:w-1/4 h-48 sm:h-auto relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3 md:w-3/4 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
                  <div className="mt-auto">
                    <p className="text-xl font-bold text-mainColor">${product.price}</p>
                    <button className="mt-2 px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-opacity-90 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state */}
        {data.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No products found in this section</p>
            <button 
              onClick={() => router.push('/')}
              className="bg-mainColor text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Browse all products
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const section = ctx.params!.sec;

  try {
    const { data } = await axios.get<Product[]>(
      `https://e-shop-unty.vercel.app/api/products?sec=${section}`
    );

    return {
      props: {
        data,
        section
      }
    };
  } catch (error) {
    console.error('Error fetching products for section:', error);
    
    return {
      props: {
        data: [],
        section
      }
    };
  }
};

export default Section;