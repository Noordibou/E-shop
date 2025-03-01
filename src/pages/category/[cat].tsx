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
  category: string;
}

const Category = ({ data: initialData, category }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<Product[]>(initialData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const toggleFilterPanel = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Group products by section for optional display
  const sectionGroups = data.reduce((acc, product) => {
    if (!acc[product.section]) {
      acc[product.section] = [];
    }
    acc[product.section].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header with back button and category title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex md:flex-col items-center mb-4 md:mb-0">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-bodyColor hover:text-mainColor transition-colors mr-4"
              aria-label="Go back"
            >
              <IoArrowBackCircleOutline size={28} className="mr-2" />
              <span className="text-sm md:text-base">Back</span>
            </button>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-bodyColor md:mt-6">
              <span className="uppercase">{category}</span>
            </h1>
          </div>
          
          <div className="flex items-center mt-0 md:mt-10 space-x-2">
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
              <div className="flex items-center bg-gray-200 rounded-lg p-2">
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
          Showing {data.length} {data.length === 1 ? 'product' : 'products'} in {category}
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
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">{product.section}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-xl font-bold text-mainColor">${product.price.toFixed(2)}</p>
                    <button className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-opacity-90 transition-colors">
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
            <p className="text-gray-500 text-lg mb-4">No products found in this category</p>
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
  const category = ctx.params!.cat;

  try {
    const { data } = await axios.get<Product[]>(
      `https://e-shop-unty.vercel.app/api/products?cat=${category}`
    );

    return {
      props: {
        data,
        category
      }
    };
  } catch (error) {
    console.error('Error fetching products for category:', error);
    
    return {
      props: {
        data: [],
        category
      }
    };
  }
};
  
export default Category;