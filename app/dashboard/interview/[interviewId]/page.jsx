"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function page() {
  const params = useParams()
  console.log(params?.interviewId)
  return (
    <div>
      
    </div>
  )
}

export default page