import LoadingSkeleton from '@/components/LoadingSkeleton';
import React, { Suspense } from 'react'

export default function uploadMusic() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div>uploadMusic</div>
    </Suspense>
  );
}
