import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { Button } from './ui/button'
import { ModeToggle } from './toggle'
export function Appbar(){
    return(
        < div className='flex justify-between p-4 border-4'>
        <div className='text-xl'>
            Photo AI
        </div>
        <div className='flex gap-5 items-center'>
        <div>< ModeToggle /></div>
            <div>
            <SignedOut>
            <Button variant={"ghost"}>
              <SignInButton />
            </Button>
            <Button variant={"ghost"}>
              <SignUpButton />
            </Button>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            </div>
        </div>
        </div>
    )
}