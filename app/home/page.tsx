'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sprout, Recycle } from 'lucide-react';
import ProductCard from '../components/productCards';

// Todo: line-111, line-128-130

interface Product {
  id: number;
  title: string;
  images: string[];
  type: 'Donate' | 'Swap';
  category?: string;
  condition?: string;
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
    images: ["./assets/mock_datas/mock_data1.png", "./assets/mock_datas/mock_data2.png", "./assets/mock_datas/mock_data3.png"],
    type: 'Donate'
  },
  {
    id: 2,
    title: "Wireless Mechanical Keyboard",
    images: ["./assets/mock_datas/mock_data2.png"],
    type: 'Swap'
  },
  {
    id: 3,
    title: "2nd Hand North Caroline Hoodie",
    images: ["./assets/mock_datas/mock_data3.png"],
    type: 'Donate'
  },
  {
    id: 4,
    title: "IKEA Desk Lamp",
    images: ["./assets/mock_datas/mock_data4.png"],
    type: 'Swap'
  }
];

const trendingProducts: Product[] = [
  {
    id: 5,
    title: "JBL Portable Bluetooth Speaker",
    images: ["./assets/mock_datas/mock_data5.png"],
    type: 'Donate'
  },
  {
    id: 6,
    title: "Stanley 40 oz Quencher",
    images: ["./assets/mock_datas/mock_data6.png"],
    type: 'Swap'
  },
  {
    id: 7,
    title: "IKEA Frakta Bag",
    images: ["./assets/mock_datas/mock_data7.png"],
    type: 'Donate'
  },
  {
    id: 8,
    title: "Heavy Duty Umbrella",
    images: ["./assets/mock_datas/mock_data8.png"],
    type: 'Swap'
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
                      <Search className="text-(--light-grey-color)" size={20} />
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
                  <h2 className="text-2xl md:text-3xl font-extrabold text-(--green-color) mb-6">Recommended For You</h2>
                  <div className="flex overflow-x-auto gap-6 pb-6 snap-x scroll-smooth scrollbar-hide">
                      {recommendedProducts.map(product => (
                          <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
              </div>
                    
              {/* Trending Section */}
              <div className="mb-16">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-(--green-color) mb-6">Trending Now</h2>
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
    );
}