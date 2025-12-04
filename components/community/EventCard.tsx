import Link from 'next/link';

interface Event {
    id: string;
    date: string; 
    title: string;
    description: string;
}

export default function EventCard({ event }: { event: Event }) {
    
    const isOdd = parseInt(event.date.split(' ')[0]) % 2 !== 0;
    const bgColor = isOdd ? 'bg-orange-500' : 'bg-green-600';

    return (
        <div className="flex bg-white p-5 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition duration-300">
            
            {/* Date Block */}
            <div className={`flex-shrink-0 w-16 h-16 ${bgColor} rounded-lg text-white flex flex-col items-center justify-center mr-4`}>
                <span className="text-xl font-bold leading-none">{event.date.split(' ')[0]}</span>
                <span className="text-xs">{event.date.split(' ')[1]}</span>
            </div>
            
            {/* Event Details */}
            <div className="flex-grow">
                <h4 className="text-base font-bold text-gray-800 mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                
                <Link href={`/community/events/${event.id}`} className="inline-block mt-2 text-xs py-1 px-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition">
                    Join Event
                </Link>
            </div>
        </div>
    );
}