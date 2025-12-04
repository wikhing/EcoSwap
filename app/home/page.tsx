'use client';

import React, { useEffect } from 'react';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/navigation';

// --- Types ---
interface Product {
  id: number;
  title: string;
  image: string;
  type: 'donate' | 'swap';
}

interface StatProps {
  label: string;
  value: string;
  subtext: string;
  accentColor: string;
}

// --- Mock Data, To Be Replaced with Database Input ---
const recommendedProducts: Product[] = [
  {
    id: 1,
    title: "2nd Hand Introduction to Parallel Programming",
    image: "./assets/home_mock_datas/mock_data1.png",
    type: 'donate'
  },
  {
    id: 2,
    title: "Wireless Mechanical Keyboard",
    image: "./assets/home_mock_datas/mock_data2.png",
    type: 'swap'
  },
  {
    id: 3,
    title: "2nd Hand North Caroline Hoodie",
    image: "./assets/home_mock_datas/mock_data3.png",
    type: 'donate'
  },
  {
    id: 4,
    title: "IKEA Desk Lamp",
    image: "./assets/home_mock_datas/mock_data4.png",
    type: 'swap'
  }
];

const trendingProducts: Product[] = [
  {
    id: 5,
    title: "JBL Portable Bluetooth Speaker",
    image: "./assets/home_mock_datas/mock_data5.png",
    type: 'donate'
  },
  {
    id: 6,
    title: "Stanley 40 oz Quencher",
    image: "./assets/home_mock_datas/mock_data6.png",
    type: 'swap'
  },
  {
    id: 7,
    title: "IKEA Frakta Bag",
    image: "./assets/home_mock_datas/mock_data7.png",
    type: 'donate'
  },
  {
    id: 8,
    title: "Heavy Duty Umbrella",
    image: "./assets/home_mock_datas/mock_data8.png",
    type: 'swap'
  }
];

const StatCard: React.FC<StatProps> = ({ label, value, subtext, accentColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden h-40">
    <h3 className="text-(--dark-grey-color) text-sm font-bold mb-2 uppercase tracking-wide">{label}</h3>
    <p className="text-4xl font-extrabold text-(--black-color) mb-2">{value}</p>
    <p className="text-(--dark-grey-color) text-xs">{subtext}</p>
    <div className={`absolute bottom-0 left-0 w-full h-2 ${accentColor}`}></div>
  </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white min-w-2xs rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden group">
    <div className="relative h-48 w-full p-4">
      <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10">
        {product.type === 'donate' ? (
          <img src="/assets/donate.png" alt='Donate' width={24} height={24} className="text-(--green-color) fill-current" />
        ) : (
          <img src="/assets/swap.svg" alt='Recycle' width={24} height={24} className="text-(--green-color) fill-current" />
        )}
      </div>
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
      />
    </div>

    <div className="p-4 flex flex-col grow text-center">
      <h3 className="font-bold text-(--black-color) text-sm md:text-base leading-tight mb-4 line-clamp-2">
        {product.title}
      </h3>
      
      <div className="mt-auto">
        <button className="bg-(--green-color) text-white text-sm font-bold py-2 px-6 rounded-full hover:bg-green-900 transition-colors w-full md:w-auto">
          View Details
        </button>
      </div>
    </div>
  </div>
);



export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            // Get authentication status from backend, if user not logged in, redirect to login page

            // Then get data from database for recommended and trending products
        };

        init();
    }, [router]);

    return (
        <main>
            <Header />
            <div className="min-h-screen p-6 md:p-12 font-sans">
                <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-(--green-color) mb-2">
                        Welcome back, Jason!
                    </h1>
                    <p className="text-(--dark-grey-color) text-lg mb-8">
                        Here's what's happening today on EcoSwap.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto relative bg-white rounded-full ">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <img src="/assets/search_icon.svg" alt="Search" className="text-(--light-grey-color)" width={20} height={20} />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search for items, categories, or users..." 
                            className="w-full py-4 pl-12 pr-4 rounded-full border-none shadow-sm focus:ring-2 focus:ring-[--green-color] text-(--black-color) placeholder-(--light-grey-color) outline-none"
                        />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mb-12">
                        <div className="flex justify-between items-end mb-6">
                            <h2 className="text-2xl md:text-3xl font-extrabold text-(--green-color)">Your Eco Journey</h2>
                            <a href="/impact" className="text-(--black-color) font-medium underline hover:text-(--green-color)">View Full Impact</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                label="CO₂ Saved Today" 
                                value="0.5 kg" 
                                subtext="↑ +15% from yesterday" 
                                accentColor="bg-green-500" 
                            />
                            <StatCard 
                                label="Total CO₂ Saved" 
                                value="12.5 kg" 
                                subtext="Equivalent to 6 trees planted" 
                                accentColor="bg-blue-400" 
                            />
                            <StatCard 
                                label="Items donated" 
                                value="8" 
                                subtext="3 Donated, 5 Swapped" 
                                accentColor="bg-orange-400" 
                            />
                            <StatCard 
                                label="Community Score" 
                                value="450" 
                                subtext="Green Points Earned" 
                                accentColor="bg-yellow-400" 
                            />
                        </div>
                    </div>

                    {/* Recommended Section */}
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#085209] mb-6">Recommended For You</h2>
                        <div className="flex overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-hide">
                            {recommendedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Trending Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-[#085209] mb-6">Trending Now</h2>
                        <div className="flex overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-hide">
                            {trendingProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Banner Section */}
                    <div className="w-full h-full md:h-70 lg:h-100 rounded-2xl overflow-hidden relative shadow-sm">
                        <img 
                            src="/assets/banner.png"
                            alt="Eco Impact Banner"
                            className="w-full h-full object-cover absolute inset-0"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}