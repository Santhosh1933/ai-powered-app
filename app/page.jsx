"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleButtonClick}>Dashboard</Button>
    </div>
  );
}

export default Home;
