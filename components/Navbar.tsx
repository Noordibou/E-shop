import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartContext } from '../ctx/cartContex';
import Cart from './Cart';
import SearchBox from './SearchBox';

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCartContext();

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (event.target && isHTMLElement(event.target)) {
        if (!event.target.closest('nav')) {
          setIsMenuOpen(false);
          setIsCartOpen(false);
        }
      }
    }
    function isHTMLElement(target: EventTarget): target is HTMLElement {
      return target instanceof HTMLElement;
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  function toggleMenu() {
    setIsMenuOpen(prev => !prev);
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  return (
    <div className='sticky top-0 bg-bodyColor z-30'>
      <div className='flex items-center justify-between px-4 py-3'>
        <button
          className='block lg:hidden text-bgColor'
          onClick={toggleMenu}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
        <h2 className='text-3xl font-titleFont font-semibold text-bgColor'>
          <Link href='/'>Time Totes</Link>
        </h2>
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden absolute top-16 left-0 w-full bg-bodyColor`}
        >
          <ul className='flex flex-col items-center gap-4 px-8 py-8 text-bgColor uppercase cursor-pointer font-titleFont'>
            < SearchBox />
            <Link href='/section/women'>Woman</Link>
            <Link href='/section/men'>Man</Link>
            <Link href='/category/bags'>Bags</Link>
            <Link href='/category/watches'>Watches</Link>
            <Link href='/category/sunglasses'>Sunglasses</Link>
          </ul>
        </div>
        <ul className='hidden lg:flex justify-center gap-6 text-bgColor uppercase text-[18px] font-titleFont'>
          <Link href='/section/women' className='cursor-pointer transition-all hover:text-mainColor'>Woman</Link >
          <Link href='/section/men' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Man</Link >
          <Link href='/category/bags' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Bags</Link>
          <Link href='/category/watches' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Watches</Link>
          <Link href='/category/sunglasses' className='cursor-pointer font-titleFont uppercase transition-all hover:text-mainColor'>Sunglasses</Link>
          < SearchBox />
        </ul>
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
