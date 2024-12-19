"use client";
import Footer from '@/landing-page/footer'
import MainNavbar from "@/components/MainNavbar";
import COMING_SOON from "../../../public/images/svgs/coming-soon.svg";
import Image from 'next/image';
import React from 'react'
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';

function ComingSoon() {
  const { data: session, status } = useSession();
  
  return (
    <div className=''>
        {status === "authenticated" ? <Navbar welcomeText="" showNavItems={true} showRight={true} /> : <MainNavbar/>}
        <div className='flex justify-center items-center bg-[#f3f4f6] py-10'>
            <Image src={COMING_SOON} alt='comingSoon' className='h-auto w-[400px]' height={100} width={100} />
        </div>
        <Footer/>
    </div>
  )
}

export default ComingSoon