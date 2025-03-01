import React, { useState, useMemo } from "react";
import ProductItem from "./ProductItem";
import { IoGridOutline, IoListOutline } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import Link from "next/link";

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

interface AllProductsProps {
  products: Product[];
}

const AllProducts: React.FC<AllProductsProps> = ({
  products: initialProducts,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<string>("");
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Memoized sorted products to improve performance
  const sortedProducts = useMemo(() => {
    const productsToSort = [...initialProducts];

    switch (sortOption) {
      case "price-asc":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsToSort.sort((a, b) => b.price - a.price);
      case "name-asc":
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
        return productsToSort.sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
      default:
        return productsToSort;
    }
  }, [initialProducts, sortOption]);

  const displayedProducts = sortedProducts.slice(0, visibleProducts);

  const handleShowMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 8, initialProducts.length));
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Controls Header */}
        <div className="mb-8 rounded-xl  p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-titleFont">
              Our Collection
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${
                    viewMode === "grid" ? "bg-white shadow-sm text-gray-500" : "text-gray-500"
                  }`}
                  aria-label="Grid view"
                >
                  <IoGridOutline size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${
                    viewMode === "list" ? "bg-white shadow-sm text-gray-500" : "text-gray-500"
                  }`}
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
                    className="bg-transparent text-sm focus:outline-none text-gray-500"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
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
        </div>

        {/* Products Display */}
        <div className="transition-all duration-300">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {displayedProducts.map((product) => (
                <Link key={product._id} href={`/product/${product._id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row"
                >
                  <div className="relative sm:w-1/3 h-64 sm:h-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-mainColor text-white text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:w-2/3 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize text-mainColor">
                          {product.category}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize text-mainColor text-center">
                          {product.section}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.desc}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <p className="text-xl font-bold text-mainColor">
                        ${product.price.toFixed(2)}
                      </p>
                      <button className="px-4 py-2 bg-mainColor text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Load More & Empty State */}
        {displayedProducts.length > 0 &&
          visibleProducts < initialProducts.length && (
            <div className="mt-10 text-center">
              <button
                onClick={handleShowMore}
                className="px-6 py-3 bg-mainColor text-white rounded-lg hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                Load More Products
              </button>
            </div>
          )}

        {displayedProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <h3 className="text-2xl font-medium text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500">
              No products available in this collection
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
