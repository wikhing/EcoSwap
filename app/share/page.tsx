'use client';
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Ban, Leaf, Recycle, List, HeartHandshake, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import Hero from '../components/hero';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const Share: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();

  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [type, setType] = useState<'donate' | 'swap'>('donate');
  const [itemCategory, setItemCategory] = useState('');
  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState('');
  const [description, setDescription] = useState('');
  const [pickupMethod, setPickupMethod] = useState<'pickup' | 'dropoff'>('pickup');
  const [campusLocation, setCampusLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = ["Clothing", "Books", "Electronics", "Home Goods", "Stationery", "Others"];

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

    // Validation
    if (!title.trim()) {
      setError('Please enter an item title');
      return;
    }
    if (!itemCategory) {
      setError('Please select a category');
      return;
    }
    if (!condition) {
      setError('Please select item condition');
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
        setError('You must be logged in to share an item');
        setIsSubmitting(false);
        return;
      }

      // 1. Insert item into items table
      const { data: item, error: itemError } = await supabase
        .from('items')
        .insert({
          user_id: user.id,
          title: title.trim(),
          type: type,
          category: itemCategory,
          condition: condition,
          description: description.trim(),
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
      alert('Item shared successfully!');
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

      <Hero title='Share Your Item' subtitle='Give what you don&apos;t need, help someone who does.' />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

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
                    // Using index as key is acceptable here for simple lists, 
                    // but using preview URL is safer for re-ordering
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

              {/* Item Title */}
              <div className="flex items-center gap-4">
                <label className="font-bold text-lg min-w-24">Item Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex-1 bg-transparent border-b border-gray-400 focus:border-(--green-color) outline-none py-1 transition-colors"
                  aria-label="Item Title"
                />
              </div>

              {/* Type */}
              <div className="flex items-center gap-4">
                <label className="font-bold text-lg min-w-24">Type:</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setType('donate')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${type === 'donate'
                        ? 'bg-(--green-color) border-2 border-white text-white'
                        : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => setType('swap')}
                    className={`px-6 py-1.5 rounded-full font-medium transition ${type === 'swap'
                        ? 'bg-(--green-color) border-2 border-white text-white'
                        : 'bg-white text-(--green-color) border-white hover:border-(--green-color) border-2'
                      }`}
                    type="button"
                  >
                    Swap
                  </button>
                </div>
              </div>

              {/* Category Selection */}
              <div className="flex items-start gap-4">
                <label className="font-bold text-lg min-w-24 mt-2">Category:</label>
                <div className="flex-1">
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

              {/* Condition */}
              <div className="flex items-start gap-4">
                <label className="font-bold text-lg min-w-24 mt-1">Condition:</label>
                <div className="space-y-3">
                  {['Like New', 'Good', 'Used'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        value={option}
                        checked={condition === option}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-5 h-5 text-(--green-color) focus:ring-(--green-color)"
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Multi-line Description */}
              <div className="flex items-start gap-4">
                <label className="font-bold text-lg min-w-24 mt-2">Description:</label>
                <div className="flex-1 relative">
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

              {/* Pickup / Drop-off */}
              <div className="flex items-start gap-4 pt-4">
                <label className="font-bold text-lg min-w-24 block mb-2">Pickup / Drop-off:</label>
              </div>
              <div className="flex gap-12 ml-34 -mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={pickupMethod === 'pickup'}
                    onChange={() => setPickupMethod('pickup')}
                    className="w-5 h-5 text-(--green-color) focus:ring-(--green-color)"
                  />
                  <span className="text-lg">Pickup</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="dropoff"
                    checked={pickupMethod === 'dropoff'}
                    onChange={() => setPickupMethod('dropoff')}
                    className="w-5 h-5 text-(--green-color) focus:ring-(--green-color)"
                  />
                  <span className="text-lg">Drop-off</span>
                </label>
              </div>

              {/* Campus Location */}
              <div className="flex items-center gap-4 pt-6">
                <label className="font-bold text-lg whitespace-nowrap">Campus Location:</label>
                <input
                  type="text"
                  value={campusLocation}
                  onChange={(e) => setCampusLocation(e.target.value)}
                  className="flex-1 bg-transparent border-b border-gray-400 focus:border-(--green-color) outline-none py-1 transition-colors"
                  aria-label='Campus Location'
                />
              </div>

              {/* Submit Button */}
              <div className="pt-12 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-(--green-color) text-white hover:bg-white hover:text-(--green-color) border-2 border-(--green-color) text-2xl font-bold py-2 px-12 rounded-full shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : (type === 'donate' ? 'Submit Donation' : 'Submit Swap')}
                </button>
              </div>

            </div>
          </div>

          {/* Right Side: Sticky Guidelines */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-10 space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">

              {/* Donation Guidelines */}
              <section>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  Donation Guidelines
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Clean items only</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-(--black-color) text-white p-1 rounded">
                      <AlertTriangle size={20} />
                    </div>
                    <span className="text-lg font-medium text-(--black-color)">No broken electronics</span>
                  </li>
                </ul>
              </section>

              {/* What NOT to Donate */}
              <section>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  What NOT to Donate?
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Clock className="text-yellow-600" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Expired items</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Ban className="text-gray-700" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Damaged beyond repair</span>
                  </li>
                </ul>
              </section>

              {/* Impact of Donating */}
              <section>
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  Impact of Donating
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Leaf className="text-(--green-color) fill-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Saves CO₂</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Recycle className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Reduces waste</span>
                  </li>
                </ul>
              </section>

              <div className="pt-6"></div>
              <div className="bg-white rounded-3xl">
                <h3 className="text-2xl font-bold text-(--black-color) mb-4 border-b-2 border-gray-300 inline-block pb-1">
                  How Swapping Works
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <List className="text-(--green-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">List your item</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <HeartHandshake className="text-(--black-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Match with others</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="text-(--black-color)" size={28} />
                    <span className="text-lg font-medium text-(--black-color)">Agree & meet safely</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;