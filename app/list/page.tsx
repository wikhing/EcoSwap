'use client';
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Ban, Leaf, Recycle, List as ListIcon, HeartHandshake, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import Hero from '../components/hero';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const List: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();

  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState<typeof conditions[number]>('');
  const [itemCategory, setItemCategory] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [listType, setListType] = useState<'donate' | 'swap'>('donate');
  const [pickupMethod, setPickupMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [campusLocation, setCampusLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = ["Clothing x3.0/kg", "Books x1.5/kg", "Electronics x7.5/kg", "Home Goods x6.0/kg", "Stationery x3.5/kg", "Others"];
  const conditions = ["Brand New", "Like New", "Lightly Used", "Well Used", "Heavily Used"];

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, []);

  interface HandleFileChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

  interface HandleFileChange {
    (e: HandleFileChangeEvent): void;
  }

  const handleFileChange: HandleFileChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      // Create objects for each new file
      const newImages = files.map(file => ({
        file: file,
        preview: URL.createObjectURL(file)
      }));

      // Append new images to existing list
      setImages((prev: { file: File; preview: string }[]) => [...prev, ...newImages]);
    }
  };

  const removeImage = (indexToRemove: number) => {
    URL.revokeObjectURL(images[indexToRemove].preview);
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    setError('');

    console.log({
      title,
      condition,
      itemCategory,
      weight,
      description,
      listType,
      pickupMethod,
      campusLocation,
      images
    });

    // Validation
    if (!title.trim()) {
      setError('Please enter an item title');
      return;
    }
    if (!condition) {
      setError('Please select item condition');
      return;
    }
    if (!itemCategory) {
      setError('Please select a category');
      return;
    }
    if (!weight.trim()) {
      setError('Please enter the item weight');
      return;
    }
    if (!description.trim()) {
      setError('Please enter an item description');
      return;
    }
    if (!listType) {
      setError('Please select a listing type');
      return;
    }
    if (!pickupMethod) {
      setError('Please select a pickup/drop-off method');
      return;
    }
    if (!campusLocation.trim()) {
      setError('Please enter your campus location');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setError('You must be logged in to list an item');
        setIsSubmitting(false);
        return;
      }

      // 1. Insert item into items table
      const { data: item, error: itemError } = await supabase
        .from('items')
        .insert({
          user_id: user.id,
          title: title.trim(),
          condition: condition,
          category: itemCategory,
          weight: weight,
          description: description.trim(),
          type: listType,
          pickup_method: pickupMethod,
          campus_location: campusLocation.trim(),
          status: 'active'
        })
        .select()
        .single();

      if (itemError) {
        console.error('Item insert error:', itemError);
        setError('Failed to create item: ' + itemError.message);
        setIsSubmitting(false);
        return;
      }

      // 2. Upload images to Supabase storage and save URLs
      const imageUrls: string[] = [];

      for (const imageObj of images) {
        const file = imageObj.file;
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${item.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          continue; // Skip failed uploads but continue with others
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('item-images')
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          imageUrls.push(urlData.publicUrl);
        }
      }

      // 3. Insert image URLs into item_images table
      if (imageUrls.length > 0) {
        const imageRecords = imageUrls.map(url => ({
          item_id: item.id,
          url: url
        }));

        const { error: imagesError } = await supabase
          .from('item_images')
          .insert(imageRecords);

        if (imagesError) {
          console.error('Image records error:', imagesError);
        }
      }

      // Success - redirect to home or items page
      alert('Item listed successfully!');
      router.push('/home');

    } catch (err) {
      console.error('Submit error:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const textareaStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(transparent, transparent calc(2rem - 1px), #9ca3af calc(2rem - 1px), #9ca3af 2rem)',
    backgroundSize: '100% 2rem',
    backgroundAttachment: 'local',
    lineHeight: '2rem',
    resize: 'none',
  };

  return (
    <div className="min-h-screen pb-20">

      <Hero title='List Your Item' subtitle='Give what you don&apos;t need, help someone who does.' />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className='bg-white rounded-2xl p-8 mb-8'>
          <h2 className='text-2xl text-center text-(--green-color) font-bold mb-2'>CO₂ Savings Estimates & Methodology</h2>
          <p className='text-justify mb-2'>The CO₂ savings on this website are estimated using internationally recognised emission factor data. We calculate the avoided emissions from reusing items by applying average lifecycle emission factors (kg CO₂ per kg of material) sourced from the UK Government&apos;s Greenhouse Gas Reporting: Conversion Factors and related methodology documents. These emission factors reflect materials production, processing, and embodied emissions, and are based on publicly available datasets and life cycle assessment (LCA) principles. Actual emissions may vary by item type, production process, and geographical context. <span className='flex mt-2 place-content-center'>Reference: <a className="ml-2 text-(--green-color) hover:text-green-700 hover:underline" href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025" target="_blank" rel="noopener noreferrer">https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2025</a></span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12">

          {/* Left Side: Form */}
          <div className="lg:col-span-7 space-y-8">

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Image Upload Area */}
            <div className="w-full">
              <div
                className="w-full h-48 bg-[#B8CBB8] bg-opacity-40 rounded-xl border-2 border-[#8ba38b] hover:border-dashed hover:border-(--green-color) flex flex-col items-center justify-center cursor-pointer hover:bg-opacity-50 transition relative overflow-hidden"
              >
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                  accept="image/*"
                  aria-label='Add Image'
                />
                <div className="bg-(--green-color) text-white p-3 rounded-lg mb-3">
                  <ImageIcon size={28} />
                </div>
                <p className="text-(--black-color) font-medium">
                  + Drag & Drop or Click to Upload Images
                </p>
              </div>

              {/* Uploaded Images Preview Grid */}
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((imgObj, index) => (
                    <div key={imgObj.preview} className="relative group h-32 w-full">
                      <img
                        src={imgObj.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full rounded-lg object-cover shadow-sm border border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition z-20"
                        type="button"
                        aria-label={`Remove image ${index + 1}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-8 text-(--black-color)">

              {/* Item Name */}
              <div className="flex flex-col items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24">Item Name:</label>
                <div className='bg-white rounded-2xl px-8 pb-4 pt-2 w-full'>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 w-full bg-transparent border-b border-gray-400 focus:border-(--green-color) outline-none py-1 transition-colors"
                    aria-label="Item Title"
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="flex flex-col items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24 mt-1">Item Condition:</label>
                <div className="bg-white rounded-2xl flex flex-row space-x-3 p-2 w-full justify-center">
                  <span className='mx-auto self-center text-(--green-color) text-lg font-bold' >New</span>
                  {conditions.map((option) => (
                    <label key={option} className={`${condition === option ? 'w-40 bg-(--green-color) text-white' : 'w-4 bg-white'} px-4 py-2 h-10 border-4 border-(--green-color) hover:bg-(--green-color) rounded-full flex items-center gap-3 overflow-x-hidden overflow-y-hidden cursor-pointer transition-all duration-300`}>
                      <button
                        name="condition"
                        value={option}
                        onClick={() => setCondition(option)}
                        className="hidden"
                      />
                      <span className={`${condition === option ? 'w-full' : 'w-0'} text-center text-lg transition-all duration-300 overflow-clip`}>{option}</span>
                    </label>
                  ))}
                  <span className='mx-auto self-center text-(--green-color) text-lg font-bold' >Used</span>
                </div>
              </div>

              {/* Category Selection */}
              <div className="flex flex-col items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24 mt-2">Item Category(/kg CO₂ Saved):</label>
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setItemCategory(cat)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium border-2 transition text-center ${itemCategory === cat
                          ? 'border-(--green-color) bg-(--green-color) text-white shadow-md'
                          : 'border-white text-(--green-color) hover:border-(--green-color) bg-white'
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="flex flex-col items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24">Item Weight(kg):</label>
                <div className='bg-white rounded-2xl px-8 pb-4 pt-2 w-full'>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 w-full bg-transparent border-b border-gray-400 focus:border-(--green-color) outline-none py-1 transition-colors"
                    aria-label="Item Weight"
                  />
                </div>
              </div>

              {/* Multi-line Description */}
              <div className="flex flex-col items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24 mt-2">Item Description:</label>
                <div className="flex-1 relative bg-white rounded-2xl px-8 pb-4 pt-2 w-full">
                  {/* Single Textarea with notebook line styling */}
                  <textarea
                    rows={4}
                    style={textareaStyle}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-transparent outline-none border-none p-0 pt-1 text-lg focus:ring-0"
                    placeholder="Describe your item here..."
                  />
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24 w-50">Type of Listing:</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setListType('donate')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${listType === 'donate'
                      ? 'bg-(--green-color) border-2 border-white text-white'
                      : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => setListType('swap')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${listType === 'swap'
                      ? 'bg-(--green-color) border-2 border-white text-white'
                      : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Swap
                  </button>
                </div>
              </div>

              {/* Pickup / Drop-off */}
              <div className="flex items-center gap-2">
                <label className="self-start font-bold text-lg min-w-24 w-50">Pickup / Drop-off:</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setPickupMethod('pickup')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${pickupMethod === 'pickup'
                      ? 'bg-(--green-color) border-2 border-white text-white'
                      : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Pickup
                  </button>
                  <button
                    onClick={() => setPickupMethod('dropoff')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${pickupMethod === 'dropoff'
                      ? 'bg-(--green-color) border-2 border-white text-white'
                      : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Drop-off
                  </button>
                </div>
              </div>

              {/* Campus Location */}
              <div className="flex flex-col items-start gap-2">
                <label className="self-start font-bold text-lg whitespace-nowrap">Campus Location:</label>
                <div className='bg-white rounded-2xl px-8 pb-4 pt-2 w-full'>
                  <input
                    type="text"
                    value={campusLocation}
                    onChange={(e) => setCampusLocation(e.target.value)}
                    className="flex-1 w-full bg-transparent border-b border-gray-400 focus:border-(--green-color) outline-none py-1 transition-colors"
                    aria-label="Campus Location"
                  />
                </div>
              </div>

              <div className='bg-white rounded-2xl p-8 mb-8'>
                <h2 className='text-3xl text-center text-(--green-color) font-bold mb-2'>Safety Disclaimer</h2>
                <p className='text-justify mb-2 font-bold'>EcoSwap only provides a platform for users to list and discover items. All exchanges, meet-ups, and communications are conducted entirely at the users&apos; own discretion and risk. EcoSwap and its developers are not responsible for any disputes, losses, damages, or safety issues arising from interactions between users. Users are advised to take necessary precautions and ensure their own safety when dealing with others.</p>
              </div>

              {/* Submit Button */}
              <div className="pt-8 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-(--green-color) text-white hover:bg-white hover:text-(--green-color) border-2 border-(--green-color) text-2xl font-bold py-2 px-12 rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : (listType === 'donate' ? 'Submit Donation' : 'Submit Swap')}
                </button>
              </div>

            </div>
          </div>

          {/* Right Side: Sticky Guidelines */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-10 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

              {/* Donation Guidelines */}
              <section className='justify-self-center mr-4 mb-10'>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  Donation Guidelines
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <CheckCircle2 className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Clean items only</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-(--black-color) text-white p-1 rounded">
                      <AlertTriangle size={20} />
                    </div>
                    <span className="text-lg font-medium text-(--black-color)">No broken electronics</span>
                  </li>
                </ul>
              </section>

              {/* What NOT to Donate */}
              <section className='justify-self-center mr-4 mb-10'>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  What NOT to Donate?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <Clock className="text-yellow-600" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Expired items</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Ban className="text-gray-700" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Damaged beyond repair</span>
                  </li>
                </ul>
              </section>

              {/* Impact of Donating */}
              <section className='justify-self-center mr-4 mb-10'>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  Impact of Donating
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <Leaf className="text-(--green-color) fill-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Saves CO₂</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Recycle className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Reduces waste</span>
                  </li>
                </ul>
              </section>

              {/* How Swapping Works */}
              <section className='justify-self-center mr-4'>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  How Swapping Works
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <ListIcon className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">List your item</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <HeartHandshake className="text-(--black-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Match with others</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <ShieldCheck className="text-(--black-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Agree & meet safely</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;