'use client';

import Image from 'next/image';
import Link from 'next/link';
import Hero from '../components/hero';

// --- Types for Data ---
interface Story {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

interface Event {
  id: number;
  day: number;
  month: string;
  title: string;
  location: string;
  description: string;
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
    <div className="p-6 flex flex-col grow">
      <h3 className="font-bold text-(--green-color) text-sm mb-1">{story.name}, <span className="text-(--green-color) font-bold">{story.role}</span></h3>
      <p className="text-[#555555] text-sm italic mb-4 grow">"{story.quote}"</p>
      <Link href="#" className="text-[#4CAF50] text-sm font-bold underline decoration-1 underline-offset-4 hover:text-(--green-color) mt-auto">
        Read full story &rarr;
      </Link>
    </div>
  </div>
);

const UpcomingEvent = [
  {
    id: 1,
    day: 15,
    month: "OCT",
    title: "End of Semester Swap Meet",
    location: "Dewan Tunku Canselor (DTC) Foyer",
    description: "Bring your old notes and clothes before the semester break starts!"}, 
  {
    id: 2,
    day: 22,
    month: "OCT",
    title: "Zero Waste Workshop",
    location: "FSKTM Bilik Kuliah",
    description: "Learn how to calculate your personal \"Monolized Equivalency Unit\" impact."
  }
];

const UpcomingEventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex">
    <div className="bg-(--green-color) text-white w-24 flex flex-col items-center justify-center p-4 shrink-0">
      <span className="text-3xl font-bold">{event.day}</span>
      <span className="text-sm font-medium uppercase">{event.month}</span>
    </div>
    <div className="p-6 flex flex-col justify-center w-full">
      <h3 className="font-bold text-(--black-color) text-lg mb-1">{event.title}</h3>
      <div className="flex items-center text-xs text-(--dark-grey-color) mb-3">
        <span className="mr-1">📍</span> {event.location}
      </div>
      <p className="text-(--black-color) text-sm mb-4 line-clamp-2">
        {event.description}
      </p>
      <button className="bg-[#4CAF50] hover:bg-(--green-color) text-white text-xs font-bold py-2 px-6 rounded-md w-fit transition-colors">
        Join
      </button>
    </div>
  </div>
  );
};

export default function CommunityPage() {
  const stories: Story[] = [
    {
      id: 1,
      name: "Sarah",
      role: "FSKTM Student",
      quote: "I traded my old Java textbooks for a graphing calculator. I saved RM200 and kept the books out of the dumpster!",
      image: "/assets/community/happy.png" 
    },
    {
      id: 2,
      name: "Team 3 Occ 7",
      role: "",
      quote: "Our recent donation drive collected over 50kg of clothes. That's a massive reduction in our campus carbon footprint.",
      image: "/assets/community/meeting.png"
    },
    {
      id: 3,
      name: "Lisa",
      role: "Engineering",
      quote: "I found a second-hand lab coat in perfect condition on EcoSwap. It was free, and I met a great senior!",
      image: "/assets/community/help.png"
    }
  ];

  return (
    // CHANGE 1: Removed 'pb-20' from this div to remove bottom gap
    <div className="min-h-screen">
      
      {/* 1. Hero Section */}
      <Hero title="EcoSwap Community" subtitle="Join the movement at UM. See how your peers are turning &quot;trash&quot; into treasure."></Hero>

      {/* 2. Success Stories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-(--green-color) inline-block relative">
            Success Stories
            <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-(--green-color) rounded-full"></span>
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
          
          <div className="m-auto w-full md:w-1/3 flex flex-col justify-center items-center">
            <div className="relative w-48 h-48 shadow-lg shadow-[#BF8B2E66] rounded-md overflow-hidden mx-auto">
                <Image 
                  src="/assets/community/SDG12.png" 
                  alt="SDG 12 Responsible Consumption" 
                  fill 
                  className="object-cover"
                />
            </div>
            <p className='text-center mt-3.5 max-w-50 text-[#BF8B2E]'>Responsible Consumption and Production</p>
          </div>

          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-bold text-(--green-color) mb-4">Why Reuse Matters?</h3>
            <p className="text-(--black-color) text-sm mb-6 leading-relaxed">
              According to Planet Aid, the average college student creates 640 pounds of trash annually. By choosing to swap instead of buy, you directly contribute to <span className="font-bold text-gray-800">SDG 12</span> by reducing waste generation through prevention, reduction, recycling, and reuse.
            </p>

            <div className="bg-[#F1F8E9] border-l-6 border-(--green-color) rounded-lg p-6">
              <h4 className="font-bold text-(--green-color) mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span> Tips for a Green Campus Life
              </h4>
              <ul className="text-sm text-(--black-color) space-y-2 list-disc list-inside">
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
          <h2 className="text-3xl font-bold text-(--green-color) inline-block relative">
            Upcoming Campus Events
            <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-(--green-color) rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UpcomingEvent.map((event, idx) => (
            <UpcomingEventCard
              key={idx + 1}
              event={event}
            />
          ))}
        </div>
      </section>

    </div>
  );
}