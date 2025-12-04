// Inside app/page.tsx

// 🛑 DELETE: import { fetchFeaturedItems, fetchGlobalStats, getUserIdFromSession } from '@/lib/data';

import Link from 'next/link';
// Placeholder components (must be created in components/home/)
const FeaturedItems = ({ items }: any) => <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map((item: any) => <div key={item.id} className="bg-white p-4 rounded shadow">Item: {item.title}</div>)}</div>;
const QuickStats = ({ stats }: any) => <div className="grid grid-cols-3 gap-6 text-center">{Object.keys(stats).map((key) => <div key={key} className="bg-white p-4 rounded shadow"><p className="text-xl font-bold">{stats[key]}</p><p className="text-sm">{key}</p></div>)}</div>;

// --- HARDCODED PROTOTYPE DATA ---
const MOCK_FEATURED_ITEMS = [
    { id: 'f1', title: 'Calculus Textbook' },
    { id: 'f2', title: 'Almost New Sneakers' },
    { id: 'f3', title: 'Desk Lamp (USB powered)' },
];
const MOCK_GLOBAL_STATS = { 'Total Users': 452, 'Total Swaps': 1258, 'CO2 Saved': '387.5kg' };

export default function HomePage() {
    
    // Auth status is hardcoded for routing simplicity
    const isLoggedIn = false; // Set to true to see "Welcome Back"

    return (
        <div className="min-h-screen bg-gray-50 pt-16"> 
            
            <div className="bg-green-700 text-white py-16 mb-8 text-center" style={{ backgroundImage: 'url(/images/home-hero.jpg)', backgroundSize: 'cover' }}>
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl font-extrabold mb-3">
                        {isLoggedIn ? `Welcome Back, User!` : 'EcoSwap: Sustainable University Exchange'}
                    </h1>
                    <Link href="/explore" className="inline-block px-8 py-3 bg-white text-green-700 font-bold rounded-full text-lg hover:bg-gray-100 transition shadow-lg">
                        Start Browsing Now
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16">
                
                <QuickStats stats={MOCK_GLOBAL_STATS} />

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-between items-center">
                        Featured Swaps & Donations
                        <Link href="/community" className="text-base text-green-700 hover:underline">Go to Community &rarr;</Link>
                    </h2>
                    
                    <FeaturedItems items={MOCK_FEATURED_ITEMS} />
                </section>
                
                <section className="text-center bg-white p-10 rounded-xl shadow-lg border border-green-100">
                    <h3 className="text-2xl font-semibold mb-3">Check Out Our Community Stories</h3>
                    <Link href="/community" className="inline-block px-8 py-3 bg-green-700 text-white font-bold rounded-md text-lg hover:bg-green-600 transition shadow-md">
                        Visit Community Page
                    </Link>
                </section>
                
            </div>
        </div>
    );
}