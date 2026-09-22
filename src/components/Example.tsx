
"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Example() {
  // 1. Initialize Autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }) // Changed stopOnInteraction to false so it keeps going even after a click
  )
  
  return (
    <Carousel
      plugins={[plugin.current]}
      // 2. Added 'opts' with 'loop: true' for infinite scrolling
      opts={{
        loop: true,
      }}
      className="w-full max-w-full h-[60vh] overflow-hidden relative group" 
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-[60vh]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-[60vh]">
            <div className="h-[60vh]">
              <Card className="h-[60vh] border-none shadow-none">
                <CardContent className="flex flex-col items-center justify-center h-[60vh] bg-slate-50 text-orange-500">
                  <span className="text-6xl font-extrabold">{index + 1}</span>
                  <p className="mt-4 text-xl font-medium text-gray-700">Delicious Surprise {index + 1}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation arrows moved inside and visible on hover */}
      <CarouselPrevious className="left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CarouselNext className="right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Carousel>
  )
}