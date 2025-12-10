"use client";

import React from "react";
// --- Imports for Header and Footer ---
// Adjust the '@/' path if your aliases are configured differently (e.g., '../component/layout/Footer')


// --- Types ---

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  trend?: string; // e.g., "+15% from yesterday"
  isPositive?: boolean;
}

interface AchievementProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isUnlocked?: boolean;
}

// --- Components ---

// 1. Top Stat Card
const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, trend, isPositive }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <h3 className="text-green-800 font-bold text-sm mb-2">{label}</h3>
      <div className="text-3xl font-extrabold text-gray-800 mb-1">{value}</div>
      {trend && (
        <p className={`text-xs font-medium mb-1 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-auto">{subtext}</p>
    </div>
  );
};

// 2. SVG Donut Chart for EcoScore
const EcoScoreChart = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

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
        <span className="text-3xl font-bold text-green-800">{percentage}%</span>
      </div>
    </div>
  );
};

// 3. Achievement Card
const AchievementCard: React.FC<AchievementProps> = ({ title, description, icon, isUnlocked = true }) => {
  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border ${isUnlocked ? 'border-yellow-200 bg-yellow-50/50' : 'border-gray-100'} flex flex-col items-center text-center h-full`}>
      <div className="mb-3 p-3 bg-white rounded-full shadow-sm text-yellow-500">
        {icon}
      </div>
      <h4 className="font-bold text-gray-800 text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-500 leading-tight">{description}</p>
    </div>
  );
};

// --- Main Page Component ---

export default function ImpactTracker() {
  return (
    <div className="min-h-screen bg-[#f7fdf5] font-sans text-gray-800 flex flex-col">
      
      {/* 1. Added Header Here */}
     

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Section Header */}
        <div className="mb-6 border-b border-green-800 pb-2">
            <h1 className="text-2xl font-bold text-green-900">Your Eco Impact Tracker</h1>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="CO₂ Saved Today" 
            value="0.5 kg" 
            trend="+15% from yesterday" 
            isPositive={true} 
            subtext="" 
          />
          <StatCard 
            label="Total CO₂ Saved" 
            value="12.5 kg" 
            subtext="Equivalent to 6 trees planted" 
          />
          <StatCard 
            label="Items Reused" 
            value="8" 
            subtext="3 Donated, 5 Swapped" 
          />
          <StatCard 
            label="Community Score" 
            value="450" 
            subtext="Green Points Earned" 
          />
        </div>

        {/* Main Dashboard Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Left Column: Charts */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Monthly Activity Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-sm text-gray-800 mb-6">Monthly Activity: Items Reused</h3>
              <div className="space-y-4">
                <div className="flex items-center text-xs">
                  <span className="w-20 text-right text-gray-500 mr-3">Donated Items</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="ml-3 font-bold text-gray-700">3 Items</span>
                </div>
                <div className="flex items-center text-xs">
                  <span className="w-20 text-right text-gray-500 mr-3">Swapped Items</span>
                  <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="ml-3 font-bold text-gray-700">5 Items</span>
                </div>
              </div>
            </div>

            {/* Trends Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm text-gray-800">CO₂ Reduction Trend (Week/Month)</h3>
                <span className="text-xs font-bold text-green-700 underline cursor-pointer">Month</span>
              </div>
              
              <div className="relative h-48 w-full">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400">
                  <span>10kg</span>
                  <span>5kg</span>
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
                    <line x1="0" y1="0" x2="300" y2="0" stroke="#f3f4f6" strokeWidth="1" />
                    <line x1="0" y1="75" x2="300" y2="75" stroke="#f3f4f6" strokeWidth="1" />
                    
                    {/* The Green Fill Area (Polygon under the line) */}
                    <path
                      d="M0,130 L50,110 L100,120 L150,80 L200,90 L250,40 L300,20 L300,150 L0,150 Z"
                      fill="url(#greenGradient)"
                    />

                    {/* The Main Green Line */}
                    <polyline
                      fill="none"
                      stroke="#15803d"
                      strokeWidth="3"
                      points="0,130 50,110 100,120 150,80 200,90 250,40 300,20" 
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Data Points (Aligned exactly with points above) */}
                    <circle cx="0" cy="130" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="50" cy="110" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="100" cy="120" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="150" cy="80" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="200" cy="90" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="250" cy="40" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                    <circle cx="300" cy="20" r="4" fill="#15803d" stroke="white" strokeWidth="2" />
                  </svg>
                  
                  {/* X-Axis Labels */}
                  <div className="absolute -bottom-6 w-full flex justify-between text-[10px] text-gray-400 px-1">
                    <span>Wk 1</span>
                    <span>Wk 2</span>
                    <span>Wk 3</span>
                    <span>Wk 4</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Eco Score */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-sm text-gray-800 mb-6 self-start w-full text-left">Your EcoScore</h3>
            
            <div className="mb-6">
              <EcoScoreChart percentage={75} />
            </div>

            <h4 className="font-bold text-gray-700 mb-2">You are a &quot;Green Advocate&quot;!</h4>
            <p className="text-xs text-gray-500 max-w-[200px]">
              Keep your score high by using the platform often
            </p>
          </div>
        </div>

        {/* Green Banner */}
        <div className="bg-white border border-green-600 rounded-lg p-4 mb-8 text-center shadow-sm">
          <p className="text-green-900 font-medium">
            🏆 You saved <span className="font-black text-green-700 text-lg">47% more CO₂</span> than the average user this month!
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-bold text-sm text-gray-800 mb-4">Top Eco Contributors (Monthly)</h3>
          <div className="space-y-4">
            
            <LeaderboardRow 
              rank={1} 
              name="Sarah L. (Law)" 
              score="15.8 kg CO₂" 
              isGold 
            />
            <LeaderboardRow 
              rank={2} 
              name="Team EcoSwap" 
              score="14.1 kg CO₂" 
              isSilver 
            />
            <LeaderboardRow 
              rank={3} 
              name="Alex Tan (FSKTM)" 
              score="12.5 kg CO₂" 
              isBronze 
            />
            <LeaderboardRow 
              rank={4} 
              name="Wei Ming (Arts)" 
              score="10.3 kg CO₂" 
            />
            <LeaderboardRow 
              rank={5} 
              name="The Average User" 
              score="8.5 kg CO₂" 
            />

          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold text-green-900 mb-4 border-b border-green-800 pb-2 inline-block">Your Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AchievementCard 
              title="First Donation" 
              description="The first step to sustainability."
              icon={<HeartIcon />}
            />
            <AchievementCard 
              title="One Month Streak" 
              description="Active on the platform for 30 days."
              icon={<RefreshIcon />}
            />
             <AchievementCard 
              title="Zero Waste Hero" 
              description="Saved over 20kg of CO₂ emissions."
              icon={<LeafIcon />}
            />
             <AchievementCard 
              title="Community Pillar" 
              description="Facilitated 10 successful exchanges."
              icon={<UsersIcon />}
            />
          </div>
        </div>

      </main>

      {/* 2. Added Footer Here */}
     
      
    </div>
  );
}

// --- Helper Components for the Leaderboard ---

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
        <span className={`font-medium ${rank === 1 ? 'text-yellow-600' : 'text-gray-700'}`}>{name}</span>
      </div>
      <span className="font-bold text-green-800 text-xs">{score}</span>
    </div>
  );
};

// --- SVG Icons ---

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
)

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/></svg>
)

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)