'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Calendar, MapPin, Trophy, Sprout, Recycle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { title } from 'process';

interface ItemImage {
  id: string;
  url: string;
}

interface Listing {
  id: string;
  title: string;
  status: string;
  created_at: string;
  item_images: ItemImage[];
}

const RecentListingCard: React.FC<{ item: Listing }> = ({ item }) => {
  const imageUrl = item.item_images?.[0]?.url || '/placeholder.png';
  const [isHovering, setIsHovering] = useState<boolean>(false);

  return (
    <div key={item.id} className={`${isHovering ? 'w-90' : 'w-40'} grow bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 transition-all duration-300`}
      onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}
    >
      {/* Item Image Container */}
      <div className={`relative ${isHovering ? 'w-32' : 'w-full'} h-full bg-gray-100 rounded-md overflow-hidden grow shrink-0 transition-all duration-300`}>
        <Image
          src={imageUrl}
          alt={item.title}
          fill
          className="object-contain p-1"
        />
      </div>
  
      {/* Item Details */}
      <div className={`${isHovering ? '' : 'hidden'} flex flex-col grow py-1 overflow-x-hidden`}>
        <h4 className={`${isHovering ? 'w-90' : 'w-0'} grow font-bold text-(--black-color) leading-tight mb-1 mr-4`}>{item.title}</h4>
        <div className="mb-auto">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.status === 'active'
            ? 'bg-[#E6F0E6] text-(--green-color)'
            : 'bg-gray-200 text-gray-600'
            }`}>
            {item.status}
          </span>
        </div>
        
        <div className="grow">
            <button className="mt-4 flex font-medium text-sm text-(--dark-grey-color) hover:text-(--green-color)">Edit</button>
            <button className="mt-4 flex font-medium text-sm text-(--dark-grey-color) hover:text-(--green-color)">Complete</button>
            <button className="mt-4 flex font-medium text-sm text-(--dark-grey-color) hover:text-red-600">Remove</button>
        </div>
        
      </div>
    </div>
  );
}

const EcoScoreChart = ({ swaps }: { swaps: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (swaps / 10) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#15803d" 
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-green-800">{swaps}/10</span>
      </div>
    </div>
  );
};


export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [swaps, setSwaps] = useState(0); 

  useEffect(() => {
    const fetchUserData = async () => {

      const mockListings = [
        {
          id: 1,
          title: "Eco-Friendly Backpack",
          status: "active",
          created_at: "2024-08-01T10:00:00Z",
          item_images: [
            { id: "img1", url: "/items/backpack.jpg" }
          ]
        },
        {
          id: 2,
          title: "Reusable Water Bottle",
          status: "active",
          created_at: "2024-07-25T14:30:00Z",
          item_images: [
            { id: "img2", url: "/items/water_bottle.jpg" }
          ]
        }
      ]

      // Get current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);

      if (currentUser) {
        // Fetch user's listings with images
        const { data: userListings, error } = await supabase
          .from('items')
          .select(`
            id,
            title,
            status,
            created_at,
            item_images (
              id,
              url
            )
          `)
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(4);

        if (!error && userListings) {
          setListings(userListings as Listing[]);
        }
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  // Format join date
  const formatJoinDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Get user display name from metadata or email
  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const updateTab = () => {
    alert('Tab navigation is not implemented in this demo.');
  }

  const stats = [
    { label: "ITEMS DONATED", value: listings.filter(l => l.status === 'active').length.toString() },
    { label: "SUCCESSFUL SWAPS", value: "0" },
    { label: "CO₂ SAVED", value: "0kg" },
  ];

  const badges = [
    { id: 1, title: "First Donation", icon: <Recycle className="w-6 h-6 text-(--green-color)" />, received: listings.length > 0 },
    { id: 2, title: "Eco Starter", icon: <Sprout className="w-6 h-6 text-(--green-color)" />, received: listings.length >= 3 },
    { id: 3, title: "Zero Waste Hero", icon: <Trophy className="w-6 h-6 text-yellow-500" />, received: listings.length >= 10 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-10 px-4 flex items-center justify-center">
        <p className="text-lg text-(--dark-grey-color)">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-center">
        <p className="text-lg text-(--dark-grey-color) mb-4">Please log in to view your profile</p>
        <Link href="/login" className="bg-(--green-color) text-white px-6 py-2 rounded-lg font-bold">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-10 gap-8">

        {/* --- LEFT COLUMN: Profile Sidebar --- */}
        <div className="md:col-span-1 md:row-span-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col place-content-center items-center text-center h-full">

            {/* Profile Image */}
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={user.user_metadata?.avatar_url || "/prof.png"}
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Name & Role */}
            <h2 className="text-xl font-bold text-(--black-color)">{getUserName()}</h2>
            <p className="text-sm text-(--dark-grey-color) mb-6">UM Student</p>

            {/* Edit Button */}
            <button className="w-full border border-[#CCCCCC] text-(--black-color) font-semibold py-2 rounded-lg hover:bg-gray-50 transition text-sm mb-8">
              Edit Profile
            </button>

            {/* Meta Info */}
            <div className="space-y-4 text-left">
              <div className="flex items-center text-(--dark-grey-color) text-sm">
                <Mail className="w-4 h-4 mr-3 text-(--dark-grey-color)" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center text-(--dark-grey-color) text-sm">
                <Calendar className="w-4 h-4 mr-3 text-(--dark-grey-color)" />
                <span>Joined {formatJoinDate(user.created_at)}</span>
              </div>
              <div className="flex items-center text-(--dark-grey-color) text-sm">
                <MapPin className="w-4 h-4 mr-3 text-(--dark-grey-color)" />
                <span>Malaysia</span>
              </div>
            </div>
          </div>
        </div>

        {/* LEFT COLUMN: HOW MANY SWAP LEFT */}
        <div className='md:col-span-1 md:row-span-4 md:row-start-7 bg-white rounded-xl shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center h-full justify-center'>
          <h3 className="text-lg font-bold text-(--black-color) mb-2">Swaps Left This Month</h3>
          <EcoScoreChart swaps={swaps} />
          <p className="text-sm text-(--dark-grey-color) mt-2">Renewal on 1st of next month</p>
        </div>

        {/* Tabs Navigation */}
          <div className="md:col-start-2 md:col-span-3 md:row-span-1 bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4 h-full">
            <div className="flex space-x-8 overflow-x-auto">
              <button className="text-(--green-color) font-bold border-b-2 border-(--green-color) pb-1 whitespace-nowrap" onClick={updateTab}>Overview</button>
              <button className="text-(--dark-grey-color) hover:text-(--green-color) font-medium whitespace-nowrap" onClick={updateTab}>My Listings</button>
              <Link href='impact' className="self-center text-(--dark-grey-color) hover:text-(--green-color) font-medium whitespace-nowrap">My Impact</Link>
            </div>
          </div>

          {/* Stats Cards Row */}
        <div className="md:col-start-2 md:col-span-3 md:row-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center h-full">
              <span className="text-3xl font-bold text-(--black-color) mb-1">{stat.value}</span>
              <span className="text-xs font-bold text-(--dark-grey-color) uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Recent Listings Section */}
        <div className='md:col-start-2 md:col-span-3 md:row-span-3 md:row-start-4 h-full'>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-(--black-color)">Recent Listings</h3>
            <button className="text-(--green-color) text-sm font-bold hover:underline" onClick={updateTab}>View All</button>
          </div>
      
          {listings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center h-19/23 flex flex-col items-center justify-center">
              <p className="text-(--dark-grey-color) mb-4">You haven&apos;t listed any items yet.</p>
              <Link href="/list" className="bg-(--green-color) text-white px-6 py-2 rounded-lg font-bold inline-block">
                List Your First Item
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-6 h-19/23">
              {listings.map((item) => {              
                return (
                  <RecentListingCard key={item.id} item={item} />
                );
              })}
            </div>
          )}
        </div>
        
        {/* Achievements Section */}
        <div className="md:col-start-2 md:col-span-3 md:row-span-4 md:row-start-7 bg-white rounded-xl shadow-sm border border-gray-100 p-8 h-full">
          <h3 className="text-lg font-bold text-(--black-color) mb-6">Achievements & Badges</h3>
          <div className="flex flex-row gap-8 h-4/5 items-center">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-full border-2 ${badge.received ? "border-(--green-color) bg-[#E6F0E6]" : "border-[#CCCCCC] border-dashed"} flex items-center justify-center mb-2 ${badge.received ? '' : 'opacity-50'}`}>
                  {badge.icon}
                </div>
                <span className="text-xs font-bold text-(--black-color) w-20 leading-tight">{badge.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}