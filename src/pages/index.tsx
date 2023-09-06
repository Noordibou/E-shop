import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Categories from '../../components/Categories'
import FeaturedProducts from '../../components/FeaturedProducts'
import Footer from '../../components/Footer'
import axios from 'axios';


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

interface HomeProps {
  featuredProducts: Product[];
}

export default function Home({ featuredProducts }: HomeProps) {
  return (
    <>
    <div
        className=' bg-bgColor text-white w-full z-50'>
      <Head>
        <title>Time Totes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <>
        <Navbar />
        <Hero />
        <Categories />
        <FeaturedProducts products={featuredProducts}/>
        <Footer />
      </>
        </div>
    </>
  )
};

export async function getServerSideProps(){
  const { data } = await axios.get(`https://e-shop-unty.vercel.app/api/products`)

  return {
    props: {
      featuredProducts: data
    }
  }
}