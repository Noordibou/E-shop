import React from 'react';
import Link from 'next/link';
import { AiOutlineSearch, AiOutlineShoppingCart  } from 'react-icons/ai';
import { useCartContext } from '../ctx/cartContex';
import Cart from './Cart';


export default function Navbar() {
  const {isCartOpen, toggleCart, cartItems} = useCartContext()
  return (
    <div className='bg-darkColor text-mainColor h-[60px] w-full py-2 px-6 flex justify-center'>
      <div className='h-full w-10/12 my-auto flex justify-between items-center'>

        <h2 className='text-3xl text-mainColor'>
          <Link href='/' >WebDevMania</Link>
        </h2>
        {/* center */}
        <ul className='flex justify-center items-center gap-6 text-[18px]'>
          <li className='cursor-pointer transition-all hover:text-lightColor'>Home</li>
          <li className='cursor-pointer transition-all hover:text-lightColor'>Hero</li>
          <li className='cursor-pointer transition-all hover:text-lightColor'>Categories</li>
          <li className='cursor-pointer transition-all hover:text-lightColor'>Featured</li>
          <li className='cursor-pointer transition-all hover:text-lightColor'>Contacts</li>
        </ul>
       {/*right */}
        <div className='flex items-center gap-6 '>
          <div className='flex items-center gap-4 bg-white px-2 py-1 rounded-lg'>
            <input type="text" placeholder='Search...' />
            <AiOutlineSearch color='darkColor' />
          </div>
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
    </div>
    )
}
