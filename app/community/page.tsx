'use client';

import Image from 'next/image';
import Link from 'next/link';

// --- Types for Data ---
interface Story {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

// --- Component: Success Story Card ---
const StoryCard = ({ story }: { story: Story }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
    <div className="relative h-48 w-full bg-gray-200">
      <Image 
        src={story.image} 
        alt={story.name} 
        fill 
        className="object-cover"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="font-bold text-green-900 text-sm mb-1">{story.name}, <span className="text-gray-600 font-medium">{story.role}</span></h3>
      <p className="text-gray-600 text-sm italic mb-4 flex-grow">"{story.quote}"</p>
      <Link href="#" className="text-green-600 text-sm font-bold underline decoration-1 underline-offset-4 hover:text-green-800 mt-auto">
        Read full story &rarr;
      </Link>
    </div>
  </div>
);

export default function CommunityPage() {
  const stories: Story[] = [
    {
      id: 1,
      name: "Sarah",
      role: "FSKTM Student",
      quote: "I traded my old Java textbooks for a graphing calculator. I saved RM200 and kept the books out of the dumpster!",
      image: "/happy.png" 
    },
    {
      id: 2,
      name: "Team 3 Occ 7",
      role: "",
      quote: "Our recent donation drive collected over 50kg of clothes. That's a massive reduction in our campus carbon footprint.",
      image: "/meeting.png"
    },
    {
      id: 3,
      name: "Lisa",
      role: "Engineering",
      quote: "I found a second-hand lab coat in perfect condition on EcoSwap. It was free, and I met a great senior!",
      image: "/help.png"
    }
  ];

  return (
    // CHANGE 1: Removed 'pb-20' from this div to remove bottom gap
    <div className="bg-[#f4fbf4] min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative h-[400px] w-full bg-green-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <Image 
             src="/plant.png" 
             alt="Community Nature Background" 
             fill 
             className="object-cover" 
             priority
           />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            EcoSwap Community
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto font-light">
            Join the movement at UM. See how your peers are turning "trash" into treasure.
          </p>
        </div>
      </section>

      {/* 2. Success Stories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900 inline-block relative">
            Success Stories
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-600 rounded-full"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 3. Info / Why Reuse Matters Section */}
      <section className="max-w-6xl mx-auto px-4 mb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-48 h-48 shadow-lg rounded-md overflow-hidden">
                <Image 
                  src="/swap.png" 
                  alt="SDG 12 Responsible Consumption" 
                  fill 
                  className="object-cover"
                />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Why Reuse Matters?</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              According to Planet Aid, the average college student creates 640 pounds of trash annually. By choosing to swap instead of buy, you directly contribute to <span className="font-bold text-gray-800">SDG 12</span> by reducing waste generation through prevention, reduction, recycling, and reuse.
            </p>

            <div className="bg-[#f0fdf4] border border-green-100 rounded-lg p-6">
              <h4 className="font-bold text-green-800 mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span> Tips for a Green Campus Life
              </h4>
              <ul className="text-sm text-gray-700 space-y-2 list-disc list-inside">
                <li><span className="font-bold">Donate Responsibly:</span> Ensure items are clean and functional before listing.</li>
                <li><span className="font-bold">Check Material Factors:</span> Items with higher "Material Factors" earn more Green Points!</li>
                <li><span className="font-bold">Reduce CO₂:</span> Opt for campus meetups to avoid shipping emissions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Events Section */}
      {/* CHANGE 2: Changed 'mb-20' to 'pb-20' to keep internal spacing but remove external margin */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900 inline-block relative">
            Upcoming Campus Events
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-green-600 rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Event 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex">
            <div className="bg-green-900 text-white w-24 flex flex-col items-center justify-center p-4 shrink-0">
              <span className="text-3xl font-bold">15</span>
              <span className="text-sm font-medium uppercase">OCT</span>
            </div>
            <div className="p-6 flex flex-col justify-center w-full">
              <h3 className="font-bold text-gray-900 text-lg mb-1">End of Semester Swap Meet</h3>
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <span className="mr-1">📍</span> Dewan Tunku Canselor (DTC) Foyer
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Bring your old notes and clothes before the semester break starts!
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-6 rounded-md w-fit transition-colors">
                Join
              </button>
            </div>
          </div>

          {/* Event 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex">
            <div className="bg-green-900 text-white w-24 flex flex-col items-center justify-center p-4 shrink-0">
              <span className="text-3xl font-bold">22</span>
              <span className="text-sm font-medium uppercase">OCT</span>
            </div>
            <div className="p-6 flex flex-col justify-center w-full">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Zero Waste Workshop</h3>
              <div className="flex items-center text-xs text-gray-500 mb-3">
                <span className="mr-1">📍</span> FSKTM Bilik Kuliah
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Learn how to calculate your personal "Monolized Equivalency Unit" impact.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 px-6 rounded-md w-fit transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}