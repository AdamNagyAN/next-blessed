import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CartProductsSkeleton = () => {
  const skeletons = Array.from(Array(4).keys());
  return (
    <>
      {skeletons.map((skeleton) => (
        <div
          key={skeleton}
          className="flex py-2 border-b justify-between items-center">
          <div className="flex">
            <Skeleton className="w-[70px] relative aspect-[4/5]" />
            <div className="flex flex-col justify-between py-1 ml-2">
              <div>
                <Skeleton className="h-3 w-32 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CartProductsSkeleton;
