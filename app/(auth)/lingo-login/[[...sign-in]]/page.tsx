"use client"
import { SignIn, useUser } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  useUser()
  return (
    <div className='h-screen flex items-center justify-center'>
      <SignIn/>
    </div>
  )
}

export default SignInPage