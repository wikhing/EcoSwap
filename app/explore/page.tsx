'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Menu, X, Sprout, Recycle, Filter } from 'lucide-react';
import Hero from '../components/hero';
import ProductCard from '../components/productCards';
import { createClient } from '../../lib/supabase';
import Button from '../components/button';

interface Product {
  id: number | string;
  title: string;
  images: string[];
  type: 'Donate' | 'Swap';
  category?: string;
  condition?: string;
}

interface FilterState {
  categories: string[];
  conditions: string[];
}

// const MOCK_DATABASE: Product[] = [
//   { id: 1, title: "Stanley 40 oz Quencher Mist", images: ["./assets/mock_datas/mock_data1.png"], type: "Swap", category: "Home Goods", condition: "Brand New" },
//   { id: 2, title: "JBL Portable Bluetooth Speaker", images: ["./assets/mock_datas/mock_data2.png"], type: "Donate", category: "Electronics", condition: "Like New" },
//   { id: 3, title: "2nd Hand Introduction to Parallel Programming", images: ["./assets/mock_datas/mock_data3.png"], type: "Donate", category: "Books", condition: "Lightly Used" },
//   { id: 4, title: "IKEA Desk Lamp", images: ["./assets/mock_datas/mock_data4.png"], type: "Swap", category: "Home Goods", condition: "Like New" },
//   { id: 5, title: "One Life Graphic T-shirt", images: ["./assets/mock_datas/mock_data5.png"], type: "Swap", category: "Clothing", condition: "Like New" },
//   { id: 6, title: "Wireless Mechanic Keyboard", images: ["./assets/mock_datas/mock_data6.png"], type: "Swap", category: "Electronics", condition: "Like New" },
//   { id: 7, title: "2nd Hand North Carolina Hoodie", images: ["./assets/mock_datas/mock_data7.png"], type: "Donate", category: "Clothing", condition: "Lightly Used" },
//   { id: 8, title: "IKEA Frakta Bag", images: ["./assets/mock_datas/mock_data8.png"], type: "Donate", category: "Others", condition: "Lightly Used" },
//   { id: 9, title: "Stanley 40 oz Quencher Mist", images: ["./assets/mock_datas/mock_data9.png"], type: "Swap", category: "Others", condition: "Like New" },
//   { id: 10, title: "Past Year Paper with Answer Organic Chemistry II", images: ["./assets/mock_datas/mock_data10.png"], type: "Donate", category: "Books", condition: "Lightly Used" },
//   { id: 11, title: "YONEX ACB TR Badminton Feather Shuttlecock (White)", images: ["./assets/mock_datas/mock_data11.png"], type: "Swap", category: "Others", condition: "Like New" },
//   { id: 12, title: "Tote Bag Oura Matcha", images: ["./assets/mock_datas/mock_data12.png"], type: "Donate", category: "Clothing", condition: "Lightly Used" },
//   { id: 13, title: "Rainbow Sticky Note Cube", images: ["./assets/mock_datas/mock_data13.png"], type: "Donate", category: "Stationery", condition: "Like New" },
//   { id: 14, title: "Wireless Bluetooth Headphones", images: ["./assets/mock_datas/mock_data14.png"], type: "Swap", category: "Electronics", condition: "Heavily Used" },
//   { id: 15, title: "2nd Hand Muji Desk Organiser", images: ["./assets/mock_datas/mock_data15.png"], type: "Donate", category: "Home goods", condition: "Like New" },
//   { id: 16, title: "2nd Hand Baseball Cap", images: ["./assets/mock_datas/mock_data16.png"], type: "Swap", category: "Clothing", condition: "Brand New" },
//   // ... Duplicate data to demonstrate "Load More" functionality
//   { id: 17, title: "Stanley 40 oz Quencher Mist", images: ["./assets/mock_datas/mock_data1.png"], type: "Swap", category: "Electronics", condition: "Like New" },
//   { id: 18, title: "JBL Portable Bluetooth Speaker", images: ["./assets/mock_datas/mock_data2.png"], type: "Donate", category: "Home Goods", condition: "Like New" },
//   { id: 19, title: "2nd Hand Introduction to Parallel Programming", images: ["./assets/mock_datas/mock_data3.png"], type: "Donate", category: "Others", condition: "Brand New" },
//   { id: 20, title: "IKEA Desk Lamp", images: ["./assets/mock_datas/mock_data4.png"], type: "Swap", category: "Home Goods", condition: "Like New" },
// ];



// const Button = ({
//   children,
//   variant = 'primary',
//   className = '',
//   onClick,
//   active = false
// }: { children: React.ReactNode, variant?: 'primary' | 'outline' | 'filter', className?: string, onClick?: () => void, active?: boolean }) => {
//   const baseStyle = "min-w-48 font-bold text-lg transition-all duration-200 flex items-center justify-center ";

//   const variants = {
//     primary: "bg-(--green-color) text-white hover:bg-white hover:text-(--green-color) border-2 border-(--green-color) rounded-full py-2 px-6",
//     outline: "bg-white border border-(--green-color) text-(--green-color) hover:bg-green-50 rounded-full py-2 px-6",
//     filter: `rounded-full py-3 px-8 text-lg shadow-sm flex gap-2 items-center ${active ? 'bg-(--green-color) text-white' : 'bg-white text-(--green-color) hover:bg-gray-50'}`
//   };

//   return (
//     <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
//       {children}
//     </button>
//   );
// };

const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  onApply
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onApply: () => void;
}) => {
  const categories = [
    {
      category: "Clothing",
      co2: 3.0
    }, {
      category: "Books",
      co2: 1.5
    }, {
      category: "Electronics",
      co2: 75.0
    }, {
      category: "Home Goods",
      co2: 6.0
    }, {
      category: "Stationery",
      co2: 3.5
    }, {
      category: "Others"
    }];
  const conditions = ["Brand New", "Like New", "Lightly Used", "Well Used", "Heavily Used"];

  const toggleFilter = (type: 'categories' | 'conditions', value: string) => {
    setFilters(prev => {
      const list = prev[type];
      const newList = list.includes(value)
        ? list.filter(item => item !== value)
        : [...list, value];
      return { ...prev, [type]: newList };
    });
  };

  const clearAll = () => {
    setFilters({ categories: [], conditions: [] });
  };

  return (
    <div className={`fixed inset-0 z-50 flex justify-end ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`relative bg-white w-full max-w-md h-full p-8 shadow-2xl overflow-y-auto flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close filters">
            <X size={24} className="text-(--black-color)" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-(--green-color) text-2xl font-bold mb-6">Category</h3>
          <div className="space-y-4">
            {categories.map((cat) => (
              <label key={cat.category} className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded bg-gray-100 checked:bg-(--green-color) checked:border-(--green-color) transition-colors"
                    checked={filters.categories.includes(cat.category)}
                    onChange={() => toggleFilter('categories', cat.category)}
                  />
                  <svg className="absolute w-4 h-4 text-white pointer-events-none hidden peer-checked:block left-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-4 text-xl font-bold text-(--black-color) group-hover:text-(--green-color) transition-colors">{cat.category}</span>
                <div className='ml-auto justify-end'>
                  <p className="ml-4 text-lg font-medium text-(--gray-color)">{cat.co2 ? `x${cat.co2}/kg CO₂ saved` : 'No data'}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-(--green-color) text-2xl font-bold mb-6">Condition</h3>
          <div className="space-y-4">
            {conditions.map((cond) => (
              <label key={cond} className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-6 h-6 border-2 border-gray-300 rounded bg-gray-100 checked:bg-(--green-color) checked:border-(--green-color) transition-colors"
                    checked={filters.conditions.includes(cond)}
                    onChange={() => toggleFilter('conditions', cond)}
                  />
                  <svg className="absolute w-4 h-4 text-white pointer-events-none hidden peer-checked:block left-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-4 text-xl font-bold text-(--black-color) group-hover:text-(--green-color) transition-colors">{cond}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <button
            onClick={onApply}
            className="w-full bg-(--green-color) text-white text-xl font-bold py-4 rounded-full hover:bg-green-900 transition-colors"
          >
            Apply All
          </button>
          <button
            onClick={clearAll}
            className="w-full bg-white border-2 border-(--green-color) text-(--green-color) text-xl font-bold py-4 rounded-full hover:bg-green-50 transition-colors"
          >
            Clear All
          </button>
        </div>

      </div>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  const searchParams = useSearchParams();

  const [items, setItems] = useState<Product[]>([]);
  const [dbItems, setDbItems] = useState<Product[]>([]);
  const [displayedItems, setDisplayedItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') ?? '');
  const [activeTab, setActiveTab] = useState<'All' | 'Donate' | 'Swap'>('All');
  const [filters, setFilters] = useState<FilterState>({ categories: [], conditions: [] });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({ categories: [], conditions: [] });

  const supabase = createClient();

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*, item_images(url)')
        .eq('status', 'active');  // Only fetch active items (exclude completed)

      if (error) {
        console.error('Error fetching items:', error);
      } else if (data) {
        const formattedData: Product[] = data.map((item: any) => {
          // Process item_images relation
          const rawImages = item.item_images || [];
          const processedImages = rawImages.map((imgObj: any) => {
            const imgStr = imgObj.url;
            // If it's already a full URL, leave it. Otherwise get public URL.
            if (imgStr.startsWith('http')) return imgStr;

            try {
              const { data: publicUrlData } = supabase.storage
                .from('item-images')
                .getPublicUrl(imgStr);
              return publicUrlData.publicUrl;
            } catch (e) {
              return imgStr;
            }
          });

          return {
            id: item.id,
            title: item.title,
            images: processedImages,
            type: (item.type.charAt(0).toUpperCase() + item.type.slice(1)) as 'Donate' | 'Swap', // Ensure strict typing & capitalization
            category: item.category,
            condition: item.condition === 'Liked New' ? 'Like New' : item.condition, // Standardize 'Like New'
          };
        });
        setDbItems(formattedData);
      }
    };

    fetchItems();
  }, []); // Only run on mount

  // Sync search query from URL (e.g., when routed from another page)
  useEffect(() => {
    const param = searchParams.get('search') ?? '';
    setSearchQuery(param);
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    // Combine Mock Data and DB Items
    // const allItems = [...MOCK_DATABASE, ...dbItems];
    const allItems = [...dbItems];

    // Filter the entire database
    let filteredData = allItems.filter(item => {
      // Search Filter
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      // Tab Filter
      const matchesTab = activeTab === 'All' || item.type === activeTab;
      // Category Filter (if any selected)
      const matchesCategory = appliedFilters.categories.length === 0 || (item.category !== undefined && appliedFilters.categories.includes(item.category));
      // Condition Filter (if any selected)
      const matchesCondition = appliedFilters.conditions.length === 0 || (item.condition !== undefined && appliedFilters.conditions.includes(item.condition));

      return matchesSearch && matchesTab && matchesCategory && matchesCondition;
    });

    setItems(filteredData);
    setPage(1); // Reset to page 1 on new filter

    // Initial Load for Page 1
    setTimeout(() => {
      setDisplayedItems(filteredData.slice(0, itemsPerPage));
      setIsLoading(false);
    }, 500);

  }, [searchQuery, activeTab, appliedFilters, dbItems]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newBatch = items.slice(startIndex, endIndex);

    setDisplayedItems(prev => [...prev, ...newBatch]);
    setPage(nextPage);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen">

      <Hero title="Explore Items" subtitle="Find items to swap, donate, or discover" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">

        <div className='bg-white rounded-2xl p-8 mb-8'>
          <h2 className='text-3xl text-center text-(--green-color) font-bold mb-2'>Safety Disclaimer</h2>
          <p className='text-justify mb-2 font-bold'>EcoSwap only provides a platform for users to list and discover items. All exchanges, meet-ups, and communications are conducted entirely at the users&apos; own discretion and risk. EcoSwap and its developers are not responsible for any disputes, losses, damages, or safety issues arising from interactions between users. Users are advised to take necessary precautions and ensure their own safety when dealing with others.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-4 mb-8">
          <div className="relative grow bg-white rounded-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-(--light-grey-color)" size={20} />
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full py-4 pl-16 pr-6 rounded-full shadow-sm border-none focus:ring-2 focus:ring-(--green-color) text-lg text-(--black-color) placeholder-(--light-grey-color)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-white p-4 rounded-full shadow-sm hover:bg-gray-50 text-(--black-color)"
            aria-label='Menu'
          >
            <Menu className="text-(--black-color)" size={28} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Button variant="toggle" active={activeTab === 'All'} onClick={() => setActiveTab('All')}>
            All
          </Button>
          <Button variant="toggle" active={activeTab === 'Donate'} onClick={() => setActiveTab('Donate')}>
            <Sprout className={activeTab === 'Donate' ? "fill-current" : "text-(--green-color) fill-current"} size={24} />
            Donate
          </Button>
          <Button variant="toggle" active={activeTab === 'Swap'} onClick={() => setActiveTab('Swap')}>
            <Recycle className={activeTab === 'Swap' ? "fill-current" : "text-(--green-color) fill-current"} size={24} />
            Swap
          </Button>
        </div>

        {/* Product Grid */}
        {isLoading && page === 1 ? (
          <div className="text-center py-20 text-gray-500">Loading items...</div>
        ) : displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {displayedItems.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 font-bold">No items found.</p>
            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Load More Button */}
        {displayedItems.length < items.length && (
          <div className="text-center pb-12">
            <button
              onClick={handleLoadMore}
              className="text-(--black-color) text-lg font-medium border-b-2 border-(--black-color) hover:text-(--green-color) hover:border-(--green-color) transition-colors pb-1"
            >
              Load More
            </button>
          </div>
        )}

      </div>

      {/* Filter Sidebar Modal */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />
    </div>
  );
}

export default ExplorePage;