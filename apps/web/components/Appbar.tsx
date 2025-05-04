import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'
import { Button } from './ui/button'
export function Appbar(){
    return(
        < div className='flex justify-between p-4 border-4'>
        <div className='text-xl'>
            Photo AI
        </div>
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
    )
}