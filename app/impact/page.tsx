"use client";

import React, { useState } from "react";
import StatCard from "../components/statCard";

// --- Types ---



interface AchievementProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked?: boolean;
}

// --- Components ---
const AchievementCard: React.FC<AchievementProps> = ({ title, description, icon, isUnlocked = true }) => {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border-2 ${isUnlocked ? 'border-[#D4AF37] bg-white' : 'border-gray-100 bg-gray-50'} flex flex-col items-center text-center h-full`}>
      <div className={`mb-3 p-3 rounded-full shadow-sm text-white ${isUnlocked ? 'bg-[#D4AF37]' : 'bg-gray-400'}`}>
        {icon}
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-tight">{description}</p>
    </div>
  );
};

// --- Main Page Component ---

export default function ImpactTracker() {
  const [selectedYear, setSelectedYear] = useState<string>("2025");

  // Mock Data
  const chartData: Record<string, number[]> = {
    "2024": [5, 8, 12, 10, 15, 18, 22, 20, 25, 28, 30, 32],
    "2025": [28, 30, 35, 32, 40, 42, 45, 0, 0, 0, 0, 0], 
  };

  const currentData = chartData[selectedYear];

  // Helper to generate SVG polyline points dynamically
  const generatePoints = (data: number[]) => {
    const maxVal = 50; 
    const width = 300;
    const height = 150;
    
    return data.map((val, index) => {
      const x = (index / 11) * width; 
      const y = height - (val / maxVal) * (height - 20) - 10; 
      return `${x},${y}`;
    }).join(" ");
  };

  const generateFillPath = (data: number[]) => {
    const points = generatePoints(data);
    return `M0,150 ${points.replace(/ /g, " L")} L300,150 Z`; 
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
      
      <div className="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Section Header */}
        <div className="mb-6 border-b-2 border-green-600 pb-2">
            <h1 className="text-2xl font-bold text-green-700">Your Eco Impact Tracker</h1>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="CO₂ Saved Today" value="0.5 kg" trend="+15% from yesterday" isPositive={true} subtext="" accentColor="border-b-green-500" />
          <StatCard label="Total CO₂ Saved" value="12.5 kg" subtext="Equivalent to 6 trees planted" accentColor="border-b-blue-400" />
          <StatCard label="Items Reused" value="8" subtext="3 Donated, 5 Swapped" accentColor="border-b-orange-400"/>
          <StatCard label="Community Score" value="450" subtext="Green Points Earned" accentColor="border-b-yellow-400" />
        </div>
        {/* Main Dashboard Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
            {/* 1. Monthly Activity Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-sm text-gray-900 mb-6">Monthly Activity: Items Reused</h3>
              <div className="space-y-6">
                <div className="flex items-center text-xs">
                  <span className="w-24 text-right text-gray-500 mr-3 font-medium">Donated Items</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden relative">
                    <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-3 font-bold text-gray-700 w-12">3 Items</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-24 text-right text-gray-500 mr-3 font-medium">Swapped Items</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden relative">
                    <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                  </div>
                  <span className="ml-3 font-bold text-gray-700 w-12">5 Items</span>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-50 text-center">
                 <p className="text-xs text-gray-400">Activity peaked on Week 3</p>
              </div>
            </div>

            {/* 2. Trends Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-sm text-gray-900">CO₂ Reduction (kg)</h3>
                
                {/* Year Selector */}
                <div className="relative">
                    <select 
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        aria-label="Select year"
                        className="block w-full pl-3 pr-8 py-1 text-xs font-bold text-green-700 bg-green-50 border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer appearance-none"
                    >
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
              </div>
              
              <div className="relative h-48 w-full pr-2">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400">
                  <span>50kg</span>
                  <span>25kg</span>
                  <span>0kg</span>
                </div>
                
                {/* Chart Area */}
                <div className="ml-8 h-full border-l border-b border-gray-200 relative">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line x1="0" y1="0" x2="300" y2="0" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4"/>
                    
                    {/* The Green Fill Area */}
                    <path
                      d={generateFillPath(currentData)}
                      fill="url(#greenGradient)"
                      className="transition-all duration-500 ease-in-out"
                    />

                    {/* The Main Green Line */}
                    <polyline
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="3"
                      points={generatePoints(currentData)}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      className="transition-all duration-500 ease-in-out"
                    />

                    {/* Interactive Dots */}
                    {currentData.map((val, i) => {
                         if(val === 0) return null; 
                         const xy = generatePoints(currentData).split(" ")[i].split(",");
                         return (
                            <circle key={i} cx={xy[0]} cy={xy[1]} r="3" fill="#15803d" stroke="white" strokeWidth="2" />
                         )
                    })}
                  </svg>
                  
                  {/* X-Axis Labels (UPDATED: Jan, Feb... and Smaller Size) */}
                  <div className="absolute -bottom-6 w-full flex justify-between text-[6px] text-gray-500 px-0">
                    {months.map((month) => (
                        <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

        </div>

        {/* Green Banner */}
        <div className="bg-white border-2 border-green-500 rounded-lg p-4 mb-8 text-center shadow-sm">
          <p className="text-green-700 font-medium">
            🏆 You saved <span className="font-bold text-green-700 text-xl">47% more CO₂</span> than the average user this month!
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-bold text-md text-gray-900 mb-4">Top Eco Contributors (Monthly)</h3>
          <div className="space-y-4">
            <LeaderboardRow rank={1} name="Sarah L. (Law)" score="15.8 kg CO₂" isGold />
            <LeaderboardRow rank={2} name="Team EcoSwap" score="14.1 kg CO₂" isSilver />
            <LeaderboardRow rank={3} name="Alex Tan (FSKTM)" score="12.5 kg CO₂" isBronze />
            <LeaderboardRow rank={4} name="Wei Ming (Arts)" score="10.3 kg CO₂" />
            <LeaderboardRow rank={5} name="The Average User" score="8.5 kg CO₂" />
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4 border-b-2 border-green-600 pb-2 inline-block">Your Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AchievementCard 
              title="First Donation" 
              description="The first step to sustainability."
              icon={<HeartIcon />}
              isUnlocked={true}
            />
            <AchievementCard 
              title="One Month Streak" 
              description="Active on the platform for 30 days."
              icon={<RefreshIcon />}
              isUnlocked={true}
            />
             <AchievementCard 
              title="Zero Waste Hero" 
              description="Saved over 20kg of CO₂ emissions."
              icon={<LeafIcon />}
              isUnlocked={false}
            />
             <AchievementCard 
              title="Community Pillar" 
              description="Facilitated 10 successful exchanges."
              icon={<UsersIcon />}
              isUnlocked={false}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

const LeaderboardRow = ({ rank, name, score, isGold, isSilver, isBronze }: { rank: number, name: string, score: string, isGold?: boolean, isSilver?: boolean, isBronze?: boolean }) => {
  let iconColor = "text-gray-400";
  if (isGold) iconColor = "text-yellow-500";
  if (isSilver) iconColor = "text-gray-400"; 
  if (isBronze) iconColor = "text-orange-700";

  return (
    <div className={`flex items-center justify-between text-sm py-2 ${rank !== 5 ? 'border-b border-gray-50' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 flex justify-center font-bold ${iconColor}`}>
           {rank <= 3 ? '🏅' : <span className="text-gray-500 font-normal text-xs">{rank}.</span>}
        </div>
        <span className={`font-medium ${rank === 1 ? 'text-yellow-600 text-lg' : 'text-gray-700'}`}>{name}</span>
      </div>
      <span className={`font-bold text-green-600 ${rank === 1 ? 'text-lg text-yellow-600' : 'text-xs'}`}>{score}</span>
    </div>
  );
};

// --- Icons ---
const HeartIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);
const RefreshIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>);
const LeafIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>);
const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);