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
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-[60vh]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-[60vh]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-[60vh]">
            <div className="h-[60vh]">
              <Card className="h-[60vh]">
                <CardContent className="flex items-center justify-center h-[60vh]">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
