'use client'
import Image from 'next/image'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Home() {

  type ResponseData = {
    message: string
  }
   

  const val = fetch('http://localhost:3000/api/')

  useEffect(() => {
    val.then((response) => {
      console.log(response)
    })
  }
  )
  
  return (
    <div>
      <h1>Welcome to our 470 Project </h1>
    <Link href = "/signup">SignUp</Link>
    <br></br>
    <Link href = "/login">Login</Link>
    </div>
  )
}
