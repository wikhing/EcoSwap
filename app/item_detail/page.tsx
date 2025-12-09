'use client';
import React, { useState, useEffect } from 'react';
import { Sprout, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Hero from '../components/hero';
import Footer from '../../components/layout/Footer';
import ProductCard from '../components/productCards';

// --- Types ---
interface Item {
  id: number;
  title: string;
  images: string[];
  category: ('Donate' | 'Swap')[];
  condition: string; // e.g., "4.5/5"
  co2Saved: string;
  description: string;
  owner: {
    name: string;
    joined: string;
    avatar: string;
  };
}

interface Product {
  id: number;
  title: string;
  images: string[];
  type: 'Donate' | 'Swap';
  category?: string;
  condition?: string;
}

// --- Mock Data ---
const MAIN_ITEM: Item = {
  id: 1,
  title: "One Life Graphic T-shirt",
  images: [
    "./assets/mock_datas/item_details_mock1.png",
    "./assets/mock_datas/item_details_mock2.png",
    "./assets/mock_datas/item_details_mock3.png"
  ],
  category: ['Donate', 'Swap'],
  condition: "4.5/5",
  co2Saved: "1.2kg CO₂",
  description: "This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. Features a relaxed fit and durable print design.",
  owner: {
    name: "Alex Wong",
    joined: "Joined 2023",
    avatar: "./assets/mock_datas/mock_profile.png" 
  }
};

const RELATED_ITEMS: Product[] = [
  { id: 1, title: "Checkered Tshirt", images: ["./assets/mock_datas/item_details_mock4.png"], type: 'Donate' },
  { id: 2, title: "Tshirt with Tape Details", images: ["./assets/mock_datas/item_details_mock5.png"], type: 'Donate' },
  { id: 3, title: "Skinny Fit Jeans", images: ["./assets/mock_datas/item_details_mock6.png"], type: 'Donate' },
  { id: 4, title: "Sleeved Stripe T-shirt", images: ["./assets/mock_datas/item_details_mock7.png"], type: 'Donate' },
];

// --- Components ---

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="mr-2">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Gallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="self-center flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 border-2 rounded-lg overflow-hidden transition-all duration-200
              ${idx === currentIndex ? 'border-(--green-color) opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}
            `}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover bg-[#F0EEED]" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-[#F0EEED] rounded-2xl overflow-hidden relative group aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
        <img 
          src={images[currentIndex]} 
          alt="Main Item" 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Navigation Arrows (visible on hover) */}
        <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            aria-label='Previous'
        >
            <ArrowLeft size={20} className="text-gray-700"/>
        </button>
        <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            aria-label='Next'
        >
            <ArrowRight size={20} className="text-gray-700"/>
        </button>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ItemDetailsMiddle() {
  return (
    <div className="min-h-screen flex flex-col">

      <Hero title="Item Details" subtitle="Everything you need to know about this item."/>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 w-full grow">
        
        {/* Item Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <Gallery images={MAIN_ITEM.images} />

          <div>
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-(--black-color) tracking-tight">
                {MAIN_ITEM.title}
              </h1>
              <div className="flex items-center gap-1.5 bg-[#08520942] text-(--green-color) px-3 py-1.5 rounded-full font-bold text-sm">
                <Sprout size={16} className="fill-current" />
                <span>saves {MAIN_ITEM.co2Saved}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-6 border-b-2 border-gray-200 pb-6">
              <div>
                <h3 className="text-[#00000099] text-lg mb-3">Category:</h3>
                <div className="flex gap-3">
                  <span className="px-6 py-2 bg-white border border-gray-200 rounded-full font-medium text-(--green-color) shadow-sm">
                    Donate
                  </span>
                  <span className="px-6 py-2 bg-(--green-color) border border-(--green-color) rounded-full font-medium text-white shadow-sm">
                    Swap
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-[#00000099] text-lg mb-3">Condition:</h3>
                <div className="flex items-center">
                    <span className="text-2xl font-regular text-(--black-color)">{MAIN_ITEM.condition}</span>
                </div>
              </div>
            </div>

            <div className="pb-6 mb-6 border-b-2 border-gray-200">
              <h3 className="text-[#00000099] text-lg mb-2">Description:</h3>
              <p className="text-(--black-color) leading-relaxed text-md">
                {MAIN_ITEM.description}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-[#00000099] text-lg mb-4">Owner:</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={MAIN_ITEM.owner.avatar} 
                  alt={MAIN_ITEM.owner.name} 
                  className="w-24 h-24 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-regular text-xl text-[#00000099]">{MAIN_ITEM.owner.name}</h4>
                  <p className="text-[#00000099] text-sm">{MAIN_ITEM.owner.joined}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-(--green-color) text-white font-bold py-1 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center text-md">
                <WhatsAppIcon />
                Contact via Whatsapp
              </button>
              <button className="flex-1 bg-white border border-gray-200 text-(--green-color) font-bold py-1 rounded-full shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center text-md">
                <Mail className="mr-2" size={20} />
                Email Owner
              </button>
            </div>

          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-(--black-color) mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_ITEMS.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

      </section>

    </div>
  );
}