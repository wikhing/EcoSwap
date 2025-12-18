'use client';

import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Props {
  itemId: number | string;
  donorId: string;
  receiverId: string;
}

export default function CompleteButton({ itemId, donorId, receiverId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleClaim = async () => {
    // 1. Safety Check
    if (donorId === receiverId) {
      alert("You cannot claim your own item!");
      return;
    }

    const confirm = window.confirm(
      "Have you physically received this item?\n\nClicking OK will mark this item as taken and award points to the owner."
    );
    if (!confirm) return;

    setLoading(true);

    try {
      // 2. Call the Secure Database Function
      const { data, error } = await supabase
        .rpc('claim_item_securely', {
          p_item_id: itemId,  // Pass as-is (UUID string)
          p_receiver_id: receiverId,
          p_donor_id: donorId
        });

      if (error) throw error;

      // 3. Handle Result
      if (data && data.success) {
        alert("Success! Transaction completed.");
        router.refresh(); // Refresh to update UI
        router.push('/explore'); // Optional: Redirect home
      } else {
        alert("Failed: " + (data?.message || "Unknown error"));
      }

    } catch (err: any) {
      console.error(err);
      alert("Error processing transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-gray-900 font-bold mb-2">Have you met and exchanged?</h3>
      <button
        onClick={handleClaim}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          "Processing..."
        ) : (
          <>
            <CheckCircle size={20} />
            Confirm Receipt & Complete Trade
          </>
        )}
      </button>
      <p className="text-xs text-center text-gray-500 mt-2">
        This will verify the exchange and award points to the owner.
      </p>
    </div>
  );
}