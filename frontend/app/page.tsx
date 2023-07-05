import Image from 'next/image';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 grid-rows-none lg:grid-cols-3 lg:grid-rows-2 gap-8 max-w-screen-xl w-full min-h-[700px] uppercase">
          <Card className="row-span-2 lg:col-span-2" image="/assets/hero2.jpg">
            <h1 className="font-bold text-3xl w-1/2 text-black">
              The inspiration behing our backpack
            </h1>
            <Button variant="outline">Buy now</Button>
          </Card>
          <Card className="relative" image="/assets/hero1.jpg" />
          <Card className="relative" image="/assets/hero3.jpg" />
        </div>
      </main>
      <section>
        <div className="container">
          <h2 className="text-center">Featured products</h2>
        </div>
      </section>
    </>
  );
}

type CardProps = React.ButtonHTMLAttributes<HTMLDivElement> & { image: string };
function Card({ children, className, image }: CardProps) {
  return (
    <div className={cn('relative text-2xl', className)}>
      <div className="z-10 absolute h-full flex flex-col justify-center items-start w-full px-4 gap-4">
        {children}
      </div>
      <Image
        className="h-full w-full object-cover rounded-xl absolute top-0 left-0 z-0"
        src={image}
        alt="Hero"
        width={700}
        height={700}
      />
    </div>
  );
}
