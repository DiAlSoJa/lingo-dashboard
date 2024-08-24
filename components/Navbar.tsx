import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarImage } from './ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ModeToggle } from './ModeToggle';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import Sidebar from './Sidebar';
import { SignOutButton } from '@clerk/nextjs';
import { auth, } from '@clerk/nextjs/server';

const Navbar = () => {

  return (
    <div className="bg-sky-700 dark:bg-sky-900 text-white py-2 px-4 flex justify-between items-center fixed top-0 left-0 w-full h-[60px] z-[99999]">
        <Link href='/'>
                <span className='text-xl'>Sanivers</span>
        </Link>

        <div className="flex items-center">
            
            <ModeToggle></ModeToggle>

            <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none'>
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="admin" /> */}
                        <div className='bg-slate-800 h-full w-full flex items-center justify-center text-xl '>D</div>
                        {/* <AvatarFallback className='text-black'>Admin</AvatarFallback> */}
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <SignOutButton>

                            <Link href="/auth">Logout</Link>
                        </SignOutButton>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            
            <Sheet>
                <SheetTrigger>
                    <Menu className='mx-3 md:hidden'/>
                </SheetTrigger>
                <SheetContent side={'left'} className='p-0 '>
                    <Sidebar/>
                </SheetContent>
            </Sheet>

            

        </div>
    </div>
  );
};

export default Navbar;