'use client'
import Image from 'next/image'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useEffect } from 'react'

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      470 Project!
    </main>
  )
}
