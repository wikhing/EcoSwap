import React, { Suspense } from 'react';
import ExplorePageContent from './content';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ExplorePageContent />
    </Suspense>
  );
}
