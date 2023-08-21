import Link from 'next/link';
import {  AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartContext } from '../ctx/cartContex';
import Cart from './Cart';
import SearchBox from './SearchBox';

export default function Navbar() {
  const { isCartOpen, toggleCart, cartItems } = useCartContext();

  return (
    <div className='sticky top-0 p-3 flex shadow-navbarShadow bg-bodyColor opacity-3 items-start justify-between lg:h-[12hv] mx-auto z-50 xl:items-center opacity-80'>
      <div className='h-full w-10/12 my-auto flex justify-between items-center'>
        <h2 className='text-3xl text-mainColor  font-titleFont font-semibold px-4'>
          <Link href='/'>Urban Chronicles</Link>
        </h2>
        <ul className='flex justify-center items-center text-bgColor gap-6  text-[18px]'>
          <Link href='/section/women' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Women</Link >
          <Link href='/section/men' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Men</Link >
          <Link href='/category/watches' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Watches</Link>
          <Link href='/category/bags' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Bags</Link>
          <Link href='/category/sunglasses' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Sunglasses</Link>
        </ul>
        < SearchBox />
        <div className='relative'>
          <AiOutlineShoppingCart size={25} style={{ color: 'white' }} onClick={toggleCart} />
          <span className='absolute-top-3 -right-4 px-2 rounded-full bg-white text-darkColor'>{cartItems?.length}</span>
          <div className='absolute top-4 -right-16 z-10'>
            {isCartOpen && <Cart />}
          </div>
        </div>
      </div>
    </div>

  )
}
