'use client';

import { use, useEffect, useState } from 'react'; // Added useState for interactivity
import Image from 'next/image';
import Link from 'next/link';
import Hero from '../components/hero';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

// --- Types for Data ---
interface Story {
  id: number;
  name: string;
  role: string;
  quote: string;
  fullStory: string; // Added this field
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

// --- Component: Story Modal (New) ---
const StoryModal = ({ story, onClose }: { story: Story; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
    <div 
      className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <div className="relative h-64 w-full">
        <Image src={story.image} alt={story.name} fill className="object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all shadow-md"
        >
          ✕
        </button>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-[var(--green-color)] mb-2">
          {story.name} <span className="text-gray-500 text-lg font-normal">| {story.role}</span>
        </h3>
        <p className="text-gray-600 italic mb-6 text-lg">"{story.quote}"</p>
        <div className="prose text-gray-700 leading-relaxed">
          {story.fullStory.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 border border-[var(--green-color)] text-[var(--green-color)] font-bold rounded-lg hover:bg-green-50 transition-colors"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Component: Success Story Card ---
const StoryCard = ({ story, onReadMore }: { story: Story, onReadMore: (s: Story) => void }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
    <div className="relative h-48 w-full bg-gray-200">
      <Image src={story.image} alt={story.name} fill className="object-cover" />
    </div>
    <div className="p-6 flex flex-col grow">
      <h3 className="font-bold text-[var(--green-color)] text-sm mb-1">
        {story.name}, <span className="text-[var(--green-color)] font-bold">{story.role}</span>
      </h3>
      <p className="text-[#555555] text-sm italic mb-4 grow">"{story.quote}"</p>
      
      {/* Changed Link to button for Modal interaction */}
      <button 
        onClick={() => onReadMore(story)}
        className="text-[#4CAF50] text-sm font-bold underline decoration-1 underline-offset-4 hover:text-[var(--green-color)] mt-auto text-left"
      >
        Read full story &rarr;
      </button>
    </div>
  </div>
);

// --- Upcoming Event Data ---
const UpcomingEvent = [
  {
    id: 1,
    day: 15,
    month: "OCT",
    title: "End of Semester Swap Meet",
    location: "Dewan Tunku Canselor (DTC) Foyer",
    description: "Bring your old notes and clothes before the semester break starts! Earn double points for textbooks."
  }, 
  {
    id: 2,
    day: 22,
    month: "OCT",
    title: "Zero Waste Workshop",
    location: "FSKTM Bilik Kuliah",
    description: "Learn how to calculate your personal 'Monolized Equivalency Unit' impact and reduce daily plastic usage."
  }
];

const UpcomingEventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex hover:shadow-md transition-shadow">
      <div className="bg-[var(--green-color)] text-white w-24 flex flex-col items-center justify-center p-4 shrink-0">
        <span className="text-3xl font-bold">{event.day}</span>
        <span className="text-sm font-medium uppercase">{event.month}</span>
      </div>
      <div className="p-6 flex flex-col justify-center w-full">
        <h3 className="font-bold text-[var(--black-color)] text-lg mb-1">{event.title}</h3>
        <div className="flex items-center text-xs text-[var(--dark-grey-color)] mb-3">
          <span className="mr-1">📍</span> {event.location}
        </div>
        <p className="text-[var(--black-color)] text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        {/* Link to Mock Event Page */}
        <Link href={`/events/${event.id}`} className="w-fit">
          <button className="bg-[#4CAF50] hover:bg-[var(--green-color)] text-white text-xs font-bold py-2 px-6 rounded-md transition-colors">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function CommunityPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const router = useRouter();

  const checkAuthStatus = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if(!user) {
      router.push('/login');
      return false;
    }
    return true;
  }

  useEffect(() => {
    checkAuthStatus();
  }, [router, createClient]);

  const stories: Story[] = [
    {
      id: 1,
      name: "Sarah",
      role: "FSKTM Student",
      quote: "I traded my old Java textbooks for a graphing calculator. I saved RM200 and kept the books out of the dumpster!",
      image: "/assets/community/happy.png",
      fullStory: "As a computer science student, textbooks are incredibly expensive. I had three Java programming books from last semester gathering dust. Through EcoSwap, I connected with a junior student who needed them.\n\nSurprisingly, she had a graphing calculator she didn't need anymore. We met at the library, made the swap, and I saved nearly RM200 that I would have spent buying a new calculator. It feels great to know my books are helping someone else ace their exams!"
    },
    {
      id: 2,
      name: "Team 3 Occ 7",
      role: "Residential College",
      quote: "Our recent donation drive collected over 50kg of clothes. That's a massive reduction in our campus carbon footprint.",
      image: "/assets/community/meeting.png",
      fullStory: "Our residential college team decided to organize a massive spring cleaning drive. We realized that many students throw away perfectly good clothes when moving out.\n\nUsing the EcoSwap platform to announce our drive, we collected over 50kg of clothing in just one weekend. We sorted them and organized a 'Free Market' event where students could pick what they needed for free. The remaining items were donated to a local shelter."
    },
    {
      id: 3,
      name: "Lisa",
      role: "Engineering",
      quote: "I found a second-hand lab coat in perfect condition on EcoSwap. It was free, and I met a great senior!",
      image: "/assets/community/help.png",
      fullStory: "Lab coats are mandatory for engineering workshops, but buying a new one for just a few semesters seemed wasteful. I browsed EcoSwap and found a senior listing hers for free.\n\nNot only was the coat in perfect condition, but the senior also gave me some great advice on which electives to take next year. EcoSwap isn't just about items; it's about connecting with people you wouldn't meet otherwise."
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Section */}
      <Hero title="EcoSwap Community" subtitle="Join the movement at UM. See how your peers are turning &quot;trash&quot; into treasure."></Hero>

      {/* 2. Success Stories Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--green-color)] inline-block relative">
            Success Stories
            <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[var(--green-color)] rounded-full"></span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} onReadMore={setSelectedStory} />
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
            <h3 className="text-2xl font-bold text-[var(--green-color)] mb-4">Why Reuse Matters?</h3>
            <p className="text-[var(--black-color)] text-sm mb-6 leading-relaxed">
              According to Planet Aid, the average college student creates 640 pounds of trash annually. By choosing to swap instead of buy, you directly contribute to <span className="font-bold text-gray-800">SDG 12</span> by reducing waste generation through prevention, reduction, recycling, and reuse.
            </p>

            <div className="bg-[#F1F8E9] border-l-6 border-[var(--green-color)] rounded-lg p-6">
              <h4 className="font-bold text-[var(--green-color)] mb-3 flex items-center">
                <span className="text-xl mr-2">💡</span> Tips for a Green Campus Life
              </h4>
              <ul className="text-sm text-[var(--black-color)] space-y-2 list-disc list-inside">
                <li><span className="font-bold">Donate Responsibly:</span> Ensure items are clean and functional before listing.</li>
                <li><span className="font-bold">Check Material Factors:</span> Items with higher "Material Factors" earn more Green Points!</li>
                <li><span className="font-bold">Reduce CO₂:</span> Opt for campus meetups to avoid shipping emissions.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Events Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--green-color)] inline-block relative">
            Upcoming Campus Events
            <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[var(--green-color)] rounded-full"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UpcomingEvent.map((event) => (
            <UpcomingEventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      </section>

      {/* MODAL RENDER LOGIC */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      )}

    </div>
  );
}