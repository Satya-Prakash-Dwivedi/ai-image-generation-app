"use client"
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Button } from './ui/button'  
import { useRouter } from 'next/navigation'
export function Hero(){
    const router = useRouter();
    return <div className='flex justify-center'>
        <div className='max-w-6xl'>
            <h1 className='text-8xl p-2 text-center pb-4'>Generate Images for yourself and your family</h1>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                    <CarouselItem className='basis-1/4'> <img className='w-max-[400px]' src="https://photo.100xdevs.com/_next/image?url=https%3A%2F%2Fr2-us-west.photoai.com%2F1738861046-1175c64ebe0ecfe10b857e205b3b4a1e-3.png&w=3840&q=75" alt="" /> </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className='flex justify-center'>
                <SignedIn>
                    <Button onClick={() => {
                        router.push("/dashboard")
                    }} className='mt-4 px-16 py-6" size={"lg"} variant={"secondary"} '>Dashboard</Button>
                </SignedIn>
                <SignedOut>
                    <Button onClick={() => {
                        <SignInButton />
                    }} className='mt-4 px-16 py-6' size={"lg"} variant={"secondary"} > 

                    </Button>
                </SignedOut>
            </div>
        </div>
    </div>
}