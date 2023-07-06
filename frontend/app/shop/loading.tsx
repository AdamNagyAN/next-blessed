import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
  return (
    <div className="container">
      <h2 className="text-center py-8 my-8">Shop</h2>
      <div className="grid grid-cols-1 grid-rows-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div>
      <div className="aspect-[3/4] relative">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="text-center flex flex-col items-center">
        <Skeleton className="h-4 w-32 rounded-lg my-2" />
        <Skeleton className="h-4 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export default Loading;
