import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewCard({ interview }) {
  console.log(interview);
  const router = useRouter();
  return (
    <div className="bg-secondary cursor-pointer p-4  grid gap-2 hover:shadow-sm border hover:border-primary duration-300 ease-in-out h-40 rounded-md w-full ">
      <h1 className="text-xl text-primary font-semibold">{interview.title}</h1>
      <p>{interview?.dateOfCreation}</p>
      <div className="flex items-center gap-4 w-full">
        <Button variant="destructive" className="w-full">
          Review
        </Button>
        <Button onClick={()=>{
          router.push(`/dashboard/interview/${interview._id}`)
        }} className="w-full">Take Test</Button>
      </div>
    </div>
  );
}

export default InterviewCard;
