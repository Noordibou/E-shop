import Head from "next/head";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Categories from "../../components/Categories";
import FeaturedProducts from "../../components/FeaturedProducts";
import AllProducts from "../../components/AllProducts";
import Footer from "../../components/Footer";
import axios from "axios";

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
  allProducts: Product[];
}

export default function Home({ featuredProducts, allProducts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Time Totes</title>
        <meta name="description" content="Your one-stop shop for stylish bags, watches, and sunglasses" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-bgColor ">
        <Navbar />
        <main className="flex-grow ">
          <Hero />
          <Categories />
          <FeaturedProducts products={featuredProducts} />
          <AllProducts products={allProducts} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await axios.get(`https://e-shop-unty.vercel.app/api/products`);
    const featuredProducts = data.filter((product: Product) => product.featured);
    const allProducts = data;

    return {
      props: {
        featuredProducts,
        allProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredProducts: [],
        allProducts: [],
      },
    };
  }
}