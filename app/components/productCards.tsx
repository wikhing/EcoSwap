'use client';

import React from "react";
import { Sprout, Recycle } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "./button";

interface Product {
  id: number | string;
  title: string;
  images: string[];
  type: 'Donate' | 'Swap';
  category?: string;
  condition?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (product.images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);

    return () => clearInterval(intervalId);

  }, [product.images.length]);

  return (
    <div className="bg-white min-w-2xs rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col overflow-hidden group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full p-4">
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm z-10">
          {product.type === 'Donate' ? (
            <Sprout size={24} className="text-(--green-color) fill-current" />
          ) : (
            <Recycle size={24} className="text-(--green-color) fill-current" />
          )}
        </div>
        <div
          className="absolute inset-0 flex h-full w-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images.map((img, index) => (
            <div key={index} className="shrink-0 w-full h-full flex items-center justify-center p-6">
              <img
                src={img}
                alt={`${product.title} view ${index + 1}`}
                className="max-w-full max-h-full object-contain mix-blend-multiply"
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-2 left-0 w-full flex justify-center gap-1.5 z-20">
          {product.images.length > 1 && product.images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-(--green-color)' : 'w-1.5 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 flex flex-col grow text-center">
        <h3 className="font-bold text-(--black-color) text-sm md:text-base leading-tight mb-4 line-clamp-2">
          {product.title}
        </h3>

        {/* Need to link to Item Details page for each item when button for the item clicked */}
        <div className="mt-auto">
          <Button className="text-sm md:w-auto w-full" children="View Details" variant="green" />
        </div>
      </div>
    </div>
  )
};

export default ProductCard;