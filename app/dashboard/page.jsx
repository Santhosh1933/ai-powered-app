"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { chatSession } from "../utils/GeminiAiModal";
import { useUser } from "@clerk/nextjs";
import { LoaderCircle } from "lucide-react";
import InterviewCard from "./_components/InterviewCard";
import InterviewCardSkeleton from "./_components/InterviewCardSkeleton";

function DashBoard() {
  const [openDialog, setOpenDialog] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviews, setInterviews] = useState([]);

  async function getInterviews() {
    try {
      setInterviewLoading(true);
      const res = await fetch(`/api/questions?userId=${isLoaded && user.id}`, {
        method: "GET",
      });
      const result = await res.json();
      setInterviews(result);
    } catch (err) {
    } finally {
      setInterviewLoading(false);
    }
  }

  useEffect(() => {
    if (isLoaded) {
      getInterviews();
    }
  }, [isLoaded]);

  async function handleCreateInterview(e) {
    let questionCount = 10;
    e.preventDefault();
    const InputPrompt = `I will provide you with a job title, job description/tech stack, years of experience, and difficulty level. Based on this information, generate ${questionCount} mock interview questions in Array format and create it more creative avoid similar questions. Ensure the Array output contains exactly ${questionCount} questions, and include no additional information. {
    "jobTitle": ${e.target[0].value},
    "jobDescription": ${e.target[1].value},
    "yearsOfExperience": ${e.target[2].value},
    "difficultyLevel": ${e.target[4].value}
    }`;
    console.log({
      title: e.target[0].value,
      jobDescription: e.target[1].value,
      yearOfExperience: e.target[2].value,
      level: e.target[4].value,
    });
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(InputPrompt);
      const mockResult = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      if (mockResult) {
        const response = await fetch("/api/create-questions", {
          method: "POST",
          body: JSON.stringify({
            id: isLoaded && user.id,
            questions: mockResult,
            title: e.target[0].value,
            jobDescription: e.target[1].value,
            yearOfExperience: e.target[2].value,
            level: e.target[4].value,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          getInterviews();
        } else {
          console.log("Error: ", response.statusText);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-primary text-2xl sm:text-4xl font-medium">
        DashBoard
      </h1>
      <div className="grid grid-cols-1 py-10 gap-4 min-[450px]:grid-cols-2 md:grid-cols-3">
        <div
          onClick={() => {
            setOpenDialog(true);
          }}
          className="bg-secondary cursor-pointer hover:scale-105 hover:shadow-sm border hover:border-primary duration-300 ease-in-out h-40 rounded-md w-full justify-center items-center  flex"
        >
          + Add Mock Interview
        </div>
        {interviewLoading ? (
          <>
            <InterviewCardSkeleton />
            <InterviewCardSkeleton />
            <InterviewCardSkeleton />
          </>
        ) : (
          interviews?.map((interview) => (
            <InterviewCard interview={interview} key={interview._id} />
          ))
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Let's Generate AI Mock Interview 🤖</DialogTitle>
            <DialogDescription>
              Fill The below Details to create the proper mock interview
              Questions
            </DialogDescription>
            <form
              onSubmit={handleCreateInterview}
              className="grid grid-cols-1 gap-4 pt-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="jobRole">Job Role</label>
                <Input
                  id="jobRole"
                  placeholder="Ex. Full Stack Developer"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="des">Job Description / Tech Stack </label>
                <Input
                  id="des"
                  placeholder="Ex. React.js , Node.Js , AWS"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="yoe">Job Role</label>
                <Input
                  id="yoe"
                  type="number"
                  max={"20"}
                  min={"0"}
                  placeholder="Ex. 2"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="level">Questions Level</label>
                <Select required>
                  <SelectTrigger className="w-full" id="level">
                    <SelectValue placeholder="Ex. Beginner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter className={"flex gap-4"}>
                <Button
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                  variant="ghost"
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading ? (
                    <div className="flex items-center gap-1">
                      <LoaderCircle className="animate-spin" /> Generating
                      Questions
                    </div>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DashBoard;
