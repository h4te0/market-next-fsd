'use client';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel';

export const MainSlider = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false })]}>
      <div className="group">
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, i) => (
            <CarouselItem key={i}>
              <div className="h-[400px] rounded-lg bg-gradient-to-br from-primary via-primary via-40% to-yellow-500 w-full text-white font-bold text-2xl flex items-center justify-center cursor-pointer select-none">
                Реклама №{i + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
        <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      </div>
    </Carousel>
  );
};
