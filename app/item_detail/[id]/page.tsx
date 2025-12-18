'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sprout, Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import Hero from '../../components/hero';
import ProductCard from '../../components/productCards';
import { createClient } from '@/lib/supabase';
import CompleteButton from '../../components/CompleteButton';

// --- Types ---
interface Item {
    id: number | string;
    title: string;
    images: string[];
    category: ('Donate' | 'Swap')[];
    condition: string;
    co2Saved: string;
    description: string;
    owner_id: string;
    status?: string;
    weight?: number;
    itemCategory?: string;
    owner: {
        name: string;
        joined: string;
        avatar: string;
    };
}

// CO2 multiplier helper function
const getCO2Multiplier = (category: string): number => {
    if (category?.toLowerCase().includes('clothing')) return 3.0;
    if (category?.toLowerCase().includes('books')) return 1.5;
    if (category?.toLowerCase().includes('electronics')) return 7.5;
    if (category?.toLowerCase().includes('home goods')) return 6.0;
    if (category?.toLowerCase().includes('stationery')) return 3.5;
    return 2.0; // Default for 'Others'
};

// --- Helper Components ---
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="mr-2">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const Gallery = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    if (!images || images.length === 0) {
        return <div className="self-center bg-gray-200 h-[500px] w-full rounded-2xl flex items-center justify-center text-gray-400">No Images</div>;
    }

    return (
        <div className="self-center flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 border-2 rounded-lg overflow-hidden transition-all duration-200
             ${idx === currentIndex ? 'border-(--green-color) opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}
            `}
                    >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover bg-[#F0EEED]" />
                    </button>
                ))}
            </div>

            <div className="flex-1 bg-[#F0EEED] rounded-2xl overflow-hidden relative group aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
                <img
                    src={images[currentIndex]}
                    alt="Main Item"
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                />
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    aria-label='Previous'
                >
                    <ArrowLeft size={20} className="text-gray-700" />
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    aria-label='Next'
                >
                    <ArrowRight size={20} className="text-gray-700" />
                </button>
            </div>
        </div>
    );
};

// --- Main Page Component ---
export default function ItemDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);
    const supabase = createClient();

    useEffect(() => {
        // Fetch current authenticated user
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUser({ id: user.id });
            }
        };
        fetchUser();

        const fetchData = async () => {
            if (!id) return;
            setLoading(true);

            // Fetch Item Data
            const { data: itemData, error: itemError } = await supabase
                .from('items')
                .select('*, item_images(url)')
                .eq('id', id)
                .single();

            if (itemError) {
                console.error('Error fetching item:', itemError);
                setLoading(false);
                return;
            }

            if (itemData) {
                const rawImages = itemData.item_images || [];
                const processedImages = rawImages.map((imgObj: any) => {
                    const imgStr = imgObj.url;
                    if (imgStr.startsWith('http')) return imgStr;
                    const { data: publicUrlData } = supabase.storage.from('item-images').getPublicUrl(imgStr);
                    return publicUrlData.publicUrl;
                });

                // Fetch Owner Details
                let ownerData = {
                    name: "Supabase User",
                    joined: "Joined 2024",
                    avatar: "/assets/mock_datas/mock_profile.png"
                };

                if (itemData.user_id) {
                    const { data: userData } = await supabase
                        .from('users')
                        .select('full_name, created_at, avatar_url')
                        .eq('id', itemData.user_id)
                        .single();

                    if (userData) {
                        ownerData = {
                            name: userData.full_name || "Supabase User",
                            joined: userData.created_at ? `Joined ${new Date(userData.created_at).getFullYear()}` : "Joined 2024",
                            avatar: userData.avatar_url || "/assets/mock_datas/mock_profile.png"
                        };
                    }
                }

                // Calculate CO2 saved dynamically
                const weight = Number(itemData.weight) || 0;
                const co2Multiplier = getCO2Multiplier(itemData.category || '');
                const co2Saved = (weight * co2Multiplier).toFixed(1);

                // Construct Item Object
                const newItem: Item = {
                    id: itemData.id,
                    title: itemData.title,
                    images: processedImages,
                    category: [itemData.type.charAt(0).toUpperCase() + itemData.type.slice(1)],
                    condition: itemData.condition === 'Liked New' ? 'Like New' : itemData.condition,
                    co2Saved: `${co2Saved}kg CO₂`,
                    description: itemData.description,
                    owner_id: itemData.user_id,
                    status: itemData.status,
                    weight: weight,
                    itemCategory: itemData.category,
                    owner: ownerData
                };

                setItem(newItem);
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!item) return <div className="min-h-screen flex items-center justify-center">Item not found</div>;

    // Check if current user is the owner
    const isOwner = currentUser?.id === item.owner_id;
    const isCompleted = item.status === 'completed';

    return (
        <div className="min-h-screen flex flex-col">
            <Hero title="Item Details" subtitle="Everything you need to know about this item." />

            <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 w-full grow">
                <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-gray-600 hover:text-(--green-color)">
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <Gallery images={item.images} />

                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-xl md:text-2xl font-bold text-(--black-color) tracking-tight">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-1.5 bg-[#08520942] text-(--green-color) px-3 py-1.5 rounded-full font-bold text-sm">
                                <Sprout size={16} className="fill-current" />
                                <span>saves {item.co2Saved}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-6 border-b-2 border-gray-200 pb-6">
                            <div>
                                <h3 className="text-[#00000099] text-lg mb-3">Category:</h3>
                                <div className="flex gap-3">
                                    {item.category.map(cat => (
                                        <span key={cat} className={`px-6 py-2 border rounded-full font-medium shadow-sm ${cat === 'Donate' ? 'bg-white border-gray-200 text-(--green-color)' : 'bg-(--green-color) border-(--green-color) text-white'}`}>
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[#00000099] text-lg mb-3">Condition:</h3>
                                <div className="flex items-center">
                                    <span className="text-2xl font-regular text-(--black-color)">{item.condition}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pb-6 mb-6 border-b-2 border-gray-200">
                            <h3 className="text-[#00000099] text-lg mb-2">Description:</h3>
                            <p className="text-(--black-color) leading-relaxed text-md">
                                {item.description}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-[#00000099] text-lg mb-4">Owner:</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.owner.avatar}
                                    alt={item.owner.name}
                                    className="w-24 h-24 rounded-full border-2 border-white shadow-sm"
                                />
                                <div>
                                    <h4 className="font-regular text-xl text-[#00000099]">
                                        {item.owner.name}
                                    </h4>
                                    <p className="text-[#00000099] text-sm">{item.owner.joined}</p>
                                </div>
                            </div>
                        </div>

                        {/* === BUTTON SECTION (Mocked to always show) === */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <button className="flex-1 bg-(--green-color) text-white font-bold py-1 rounded-full shadow-lg hover:opacity-90 transition-all flex items-center justify-center text-md">
                                <WhatsAppIcon />
                                Contact via Whatsapp
                            </button>
                            <button className="flex-1 bg-white border border-gray-200 text-(--green-color) font-bold py-1 rounded-full shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center text-md">
                                <Mail className="mr-2" size={20} />
                                Email Owner
                            </button>
                        </div>
                        {/* Complete Button - only show if user is logged in and not the owner */}
                        {currentUser && !isOwner && !isCompleted && (
                            <CompleteButton
                                itemId={item.id}
                                donorId={item.owner_id}
                                receiverId={currentUser.id}
                            />
                        )}
                        {/* =========================================== */}

                    </div>
                </div>
            </section>
        </div>
    );
}