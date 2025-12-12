'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Calendar, MapPin, Trophy, Sprout, Recycle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

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

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* --- LEFT COLUMN: Profile Sidebar --- */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">

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
            <div className="w-full space-y-4 text-left">
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

        {/* --- RIGHT COLUMN: Main Content --- */}
        <div className="md:col-span-3 space-y-6">

          {/* Tabs Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
            <div className="flex space-x-8 overflow-x-auto">
              <button className="text-(--green-color) font-bold border-b-2 border-(--green-color) pb-1 whitespace-nowrap">Overview</button>
              <button className="text-(--dark-grey-color) hover:text-(--green-color) font-medium whitespace-nowrap">My Listings</button>
              <button className="text-(--dark-grey-color) hover:text-(--green-color) font-medium whitespace-nowrap">My Donations</button>
              <button className="text-(--dark-grey-color) hover:text-(--green-color) font-medium whitespace-nowrap">My Impact</button>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center h-32">
                <span className="text-3xl font-bold text-(--black-color) mb-1">{stat.value}</span>
                <span className="text-xs font-bold text-(--dark-grey-color) uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Recent Listings Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-(--black-color)">Recent Listings</h3>
              <Link href="#" className="text-(--green-color) text-sm font-bold hover:underline">View All</Link>
            </div>

            {listings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-(--dark-grey-color) mb-4">You haven&apos;t listed any items yet.</p>
                <Link href="/share" className="bg-(--green-color) text-white px-6 py-2 rounded-lg font-bold inline-block">
                  Share Your First Item
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((item) => {
                  const imageUrl = item.item_images?.[0]?.url || '/placeholder.png';

                  return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4">
                      {/* Item Image Container */}
                      <div className="relative w-24 h-32 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={item.title}
                          fill
                          className="object-contain p-1"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex flex-col grow py-1">
                        <h4 className="font-bold text-(--black-color) leading-tight mb-1">{item.title}</h4>
                        <div className="mb-auto">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${item.status === 'active'
                            ? 'bg-[#E6F0E6] text-(--green-color)'
                            : 'bg-gray-200 text-gray-600'
                            }`}>
                            {item.status}
                          </span>
                        </div>

                        {/* Action Links */}
                        <div className="flex space-x-4 mt-2 text-sm text-(--dark-grey-color) font-medium">
                          <button className="hover:text-(--green-color)">Edit</button>
                          <span className="text-gray-300">|</span>
                          <button className="hover:text-red-600">Remove</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-bold text-(--black-color) mb-6">Achievements & Badges</h3>
            <div className="flex flex-wrap gap-8">
              {badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full border-2 ${badge.received ? "border-(--green-color) bg-[#E6F0E6]" : "border-[#CCCCCC] border-dashed"} flex items-center justify-center mb-2 ${badge.received ? '' : 'opacity-50'}`}>
                    {badge.icon}
                  </div>
                  <span className="text-xs font-bold text-(--black-color) w-20 leading-tight">{badge.title}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}