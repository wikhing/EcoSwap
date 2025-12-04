'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Calendar, MapPin, Trophy, Sprout, Recycle } from 'lucide-react';

export default function ProfilePage() {
  
  // --- Mock Data ---
  const user = {
    name: "Jason",
    role: "UM Student • FSKTM",
    email: "jason@siswa.um.edu.my",
    joined: "Sept 2024",
    location: "Kuala Lumpur, MY",
    image: "/prof.png" 
  };

  const stats = [
    { label: "ITEMS DONATED", value: "12" },
    { label: "SUCCESSFUL SWAPS", value: "5" },
    { label: "CO₂ SAVED", value: "8.4kg" },
  ];

  // UPDATED: Added 'imageFit' property to control individual image sizing
  const listings = [
    {
      id: 1,
      title: "Java Programming Textbook",
      image: "/java.png", 
      status: "Active",
      subtitle: "The Fundamental Guide for beginners",
      imageFit: 'contain' // Java book shows fully with padding
    },
    {
      id: 2,
      title: "Scientific Calculator",
      image: "/calculator.png", 
      status: "Active",
      subtitle: "",
      imageFit: 'cover' // Calculator fills the box (previous characteristic)
    }
  ];

  const badges = [
    { id: 1, title: "First Donation", icon: <Recycle className="w-6 h-6 text-green-600" /> },
    { id: 2, title: "Eco Starter", icon: <Sprout className="w-6 h-6 text-green-600" /> },
    { id: 3, title: "Zero Waste Hero", icon: <Trophy className="w-6 h-6 text-yellow-500" /> },
  ];

  return (
    <div className="bg-[#f4fbf4] min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* --- LEFT COLUMN: Profile Sidebar --- */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            
            {/* Profile Image */}
            <div className="relative w-32 h-32 mb-4">
              <Image 
                src={user.image} 
                alt="Profile" 
                fill
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Name & Role */}
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.role}</p>

            {/* Edit Button */}
            <button className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 transition text-sm mb-8">
              Edit Profile
            </button>

            {/* Meta Info */}
            <div className="w-full space-y-4 text-left">
              <div className="flex items-center text-gray-500 text-sm">
                <Mail className="w-4 h-4 mr-3 text-gray-400" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                <span>Joined {user.joined}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Main Content --- */}
        <div className="md:col-span-3 space-y-6">
          
          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
             <div className="flex space-x-8 overflow-x-auto">
                <button className="text-green-700 font-bold border-b-2 border-green-600 pb-1 whitespace-nowrap">Overview</button>
                <button className="text-gray-500 hover:text-green-700 font-medium whitespace-nowrap">My Listings</button>
                <button className="text-gray-500 hover:text-green-700 font-medium whitespace-nowrap">My Donations</button>
                <button className="text-gray-500 hover:text-green-700 font-medium whitespace-nowrap">My Impact</button>
             </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center h-32">
                <span className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Recent Listings Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Listings</h3>
              <Link href="#" className="text-green-700 text-sm font-bold hover:underline">View All</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((item) => {
                 // Determine correct class based on data property
                 const imageClassName = item.imageFit === 'cover' 
                    ? "object-cover" // Fills box, crops
                    : "object-contain p-1"; // Shows full image, padded

                 return (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                  {/* Item Image Container */}
                  <div className="relative w-24 h-32 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className={imageClassName} // Apply conditional class
                    />
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex flex-col flex-grow py-1">
                    <h4 className="font-bold text-gray-900 leading-tight mb-1">{item.title}</h4>
                    <div className="mb-auto">
                       <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                         {item.status}
                       </span>
                    </div>
                    
                    {/* Action Links */}
                    <div className="flex space-x-4 mt-2 text-sm text-gray-500 font-medium">
                      <button className="hover:text-green-700">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="hover:text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Achievements & Badges</h3>
            <div className="flex flex-wrap gap-8">
              {badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-green-100 bg-green-50 flex items-center justify-center mb-2">
                    {badge.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-800 w-20 leading-tight">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}