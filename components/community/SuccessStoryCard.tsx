import Link from 'next/link';
import Image from 'next/image';

// Assuming simplified hardcoded structure
interface Story {
    id: string;
    author: string;
    department: string;
    snippet: string;
    imageUrl: string;
}

export default function SuccessStoryCard({ story }: { story: Story }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            
            {/* Story Image */}
            <div className="w-full h-40 relative">
                <Image
                    src={story.imageUrl} // No need for fallback, assuming hardcoded path is correct
                    alt={`Story by ${story.author}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    className="transition duration-300 hover:scale-105"
                />
            </div>
            
            <div className="p-5 space-y-3">
                <p className="text-sm font-semibold text-gray-800">{story.author}, <span className="text-green-700">{story.department}</span></p>
                <p className="text-sm text-gray-600 line-clamp-3">{story.snippet}</p>
                
                {/* Link is to a dummy page since content is hardcoded */}
                <Link href={`/community/stories/${story.id}`} className="inline-block text-sm text-green-700 font-medium hover:underline">
                    Read full story &rarr;
                </Link>
            </div>
        </div>
    );
}