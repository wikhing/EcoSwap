// app/events/[id]/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EventDetailsPage() {
  const params = useParams();
  
  // State to manage the UI view (Form vs Success)
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock Data
  const eventDetails = {
    title: "End of Semester Swap Meet",
    date: "15 October 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Dewan Tunku Canselor (DTC) Foyer",
    description: "Don't let your old textbooks and clothes go to waste! Join us for the biggest swap meet of the semester. Bring at least 3 items to get a free EcoSwap tote bag.",
    agenda: [
      { time: "10:00 AM", activity: "Registration & Item Drop-off" },
      { time: "11:00 AM", activity: "Swapping Opens (Early Bird Access)" },
      { time: "02:00 PM", activity: "Zero Waste Talk by Guest Speaker" },
      { time: "04:00 PM", activity: "Event Ends" }
    ]
  };

  const handleRegister = () => {
    setIsLoading(true);
    // Simulate a network request (1.5 seconds)
    setTimeout(() => {
        setIsLoading(false);
        setIsRegistered(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-20">
      
      {/* Header / Nav Mockup */}
      <div className="bg-white shadow-sm py-4 px-8 mb-8">
        <Link href="/community" className="text-gray-500 hover:text-[var(--green-color)] flex items-center gap-2 text-sm font-bold">
          &larr; Back to Community
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Banner */}
        <div className="bg-[var(--green-color)] rounded-t-2xl h-48 flex items-center justify-center relative overflow-hidden">
            {/* Fallback color if var is missing */}
            <div className="absolute inset-0 bg-green-600 opacity-90 z-0"></div> 
            <h1 className="text-4xl font-bold text-white text-center px-4 z-10 relative">{eventDetails.title}</h1>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Left Col: Details */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Details</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {eventDetails.description}
              </p>

              <h3 className="font-bold text-[var(--green-color)] text-green-600 mb-4 text-lg">Agenda</h3>
              <div className="space-y-4">
                {eventDetails.agenda.map((item, i) => (
                  <div key={i} className="flex border-b border-gray-100 pb-3 last:border-0">
                    <span className="font-bold text-gray-800 w-24 shrink-0">{item.time}</span>
                    <span className="text-gray-600">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Register Box (Dynamic) */}
            <div className="md:col-span-1">
              <div className="bg-[#F1F8E9] rounded-xl p-6 border border-green-100 sticky top-8 transition-all duration-300">
                
                {/* 1. VIEW: Success Screen */}
                {isRegistered ? (
                    <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Your spot is confirmed!</h3>
                        <p className="text-sm text-gray-600 mb-6">You make an excellent choice. </p>
                        
                        <div className="bg-white rounded-lg p-3 border border-green-200 mb-4">
                            <p className="text-xs text-gray-500 uppercase font-bold">Ref ID</p>
                            <p className="font-mono text-gray-800">#ECO-{Math.floor(Math.random() * 10000)}</p>
                        </div>

                        <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 px-4 rounded-lg cursor-not-allowed">
                           Registration Confirmed
                        </button>
                    </div>
                ) : (
                    /* 2. VIEW: Registration Form/Details */
                    <>
                        <div className="mb-6 space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">📅</span>
                            <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                            <p className="font-medium text-gray-800">{eventDetails.date}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">📍</span>
                            <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                            <p className="font-medium text-gray-800">{eventDetails.location}</p>
                            </div>
                        </div>
                        </div>

                        <button 
                            className={`w-full font-bold py-3 px-4 rounded-lg shadow-md transition-all 
                                ${isLoading 
                                    ? 'bg-green-400 cursor-wait' 
                                    : 'bg-[#4CAF50] hover:bg-green-700 hover:-translate-y-0.5 active:scale-95'
                                } text-white mb-3 flex justify-center items-center`}
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Confirming...
                            </>
                        ) : "Confirm Registration"}
                        </button>
                        <p className="text-xs text-center text-gray-500">245 students already joined</p>
                    </>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}