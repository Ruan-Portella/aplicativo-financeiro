"use client";

import { useUser } from '@clerk/nextjs';
import React from 'react'

export default function WelcomeMsg() {
  const {user, isLoaded} = useUser();

  return (
    <div className='space-y-2 mb-4'>
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>
        Welcome Back{isLoaded ? `, ${user?.fullName} 👋` : ' '}
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fb]">
        This is your Financial Dashboard
      </p>
    </div>
  )
}
