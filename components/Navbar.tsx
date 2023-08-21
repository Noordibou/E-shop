import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartContext } from '../ctx/cartContex';
import Cart from './Cart';
import router from 'next/router';
import SearchBox from './SearchBox';

export default function Navbar() {
  const { isCartOpen, toggleCart, cartItems } = useCartContext();
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     if (searchQuery) {
//         // Navigate to the search page with the search query as a query parameter
//         router.push(`/search?query=${searchQuery}`);
//     }
// };

  return (
    <div className='bg-darkColor text-mainColor h-[60px] w-full py-2 px-6 flex justify-center'>
      <div className='h-full w-10/12 my-auto flex justify-between items-center'>
        <h2 className='text-3xl text-mainColor'>
          <Link href='/'>Eshop</Link>
        </h2>
        {/* center */}
        <ul className='flex justify-center items-center gap-6 text-[18px]'>
          <Link href='/section/women' className='cursor-pointer transition-all hover:text-lightColor'>Women</Link >
          <Link href='/section/men' className='cursor-pointer transition-all hover:text-lightColor'>Men</Link >
          <Link href='/category/watches' className='cursor-pointer transition-all hover:text-lightColor'>Watches</Link>
          <Link href='/category/bags' className='cursor-pointer transition-all hover:text-lightColor'>Bags</Link>
          <Link href='/category/sunglasses' className='cursor-pointer transition-all hover:text-lightColor'>Sunglasses</Link>
        </ul>
        {/*right */}
     {/* </div> 
        <div className='flex items-center gap-6 '>
        <div className='flex items-center gap-4 bg-white px-2 py-1 rounded-lg'>
        <input type="text" placeholder='Search...' />
        <AiOutlineSearch color='darkColor' />
      </div>  */}
    < SearchBox />
          <div className='relative'>
            <AiOutlineShoppingCart size={25} onClick={toggleCart} />
            <span className='absolute-top-3 -right-4 px-2 rounded-full bg-white text-darkColor'>{cartItems?.length}</span>
            <div className='absolute top-4 -right-16 z-10'>
              {isCartOpen && <Cart />}
            </div>
          </div>
          <span>Guest</span>
        </div>
      </div>

  )
}
