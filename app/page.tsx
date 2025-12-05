'use client';

import Link from 'next/link';
import Image from "next/image";
import React from "react";
import Landing from "./landing";

const FeaturedItems = ({ items }: any) => <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map((item: any) => <div key={item.id} className="bg-white p-4 rounded shadow">Item: {item.title}</div>)}</div>;
const QuickStats = ({ stats }: any) => <div className="grid grid-cols-3 gap-6 text-center">{Object.keys(stats).map((key) => <div key={key} className="bg-white p-4 rounded shadow"><p className="text-xl font-bold">{stats[key]}</p><p className="text-sm">{key}</p></div>)}</div>;

// --- HARDCODED PROTOTYPE DATA ---
const MOCK_FEATURED_ITEMS = [
    { id: 'f1', title: 'Calculus Textbook' },
    { id: 'f2', title: 'Almost New Sneakers' },
    { id: 'f3', title: 'Desk Lamp (USB powered)' },
];
const MOCK_GLOBAL_STATS = { 'Total Users': 452, 'Total Swaps': 1258, 'CO2 Saved': '387.5kg' };

const Home: React.FC = () => {
    
    // Auth status is hardcoded for routing simplicity
    const isLoggedIn = false; // Set to true to see "Welcome Back"

    return (
        <div className="min-h-screen"> 
        
            <Landing />
        
            
        </div>
    );
}

export default Home;
