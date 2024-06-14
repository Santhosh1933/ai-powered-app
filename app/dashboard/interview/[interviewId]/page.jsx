"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { CustomUserHook } from "../../_states/userHook";
import { Button } from "@/components/ui/button";

function TestPage() {
  const params = useParams();

  console.log(params?.interviewId)

  const [userHook, setUserHook] = useRecoilState(CustomUserHook);
  const questions = [
    "Imagine you're building a microservice that handles user authentication. How would you design the database schema to ensure security and efficiency?",
    "Describe a situation where you encountered a performance bottleneck in a Spring Boot application. How did you identify and resolve the issue?",
    "Explain the concept of RESTful APIs and provide an example of how you'd design an endpoint to fetch user data.",
    "You're tasked with implementing a new feature that requires handling asynchronous tasks in a Spring Boot application. What tools or approaches would you consider?",
    "How would you approach writing unit tests for a Java class that interacts with a REST API?",
    "Describe the benefits and drawbacks of using a microservices architecture compared to a monolithic architecture.",
    "You're asked to refactor a legacy Spring Boot application to improve code readability and maintainability. What principles and strategies would you apply?",
    "Explain the differences between a GET and POST request in RESTful APIs and provide examples of when each would be used.",
    "Describe a scenario where you had to debug a complex issue in a Java application. What tools and techniques did you utilize?",
    "Imagine you're designing a REST API for a social media platform. What considerations would you make regarding data security and user privacy?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const result = questions.map((question, index) => ({
      question,
      answer: answers[index],
    }));
    console.log(result);
  };

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <div className="border flex gap-2 flex-col rounded-sm p-4">
        <h1 className="text-lg sm:text-2xl text-primary font-medium">
          Software Engineer
        </h1>
        <p className="text-gray-600 text-sm">
          Experience with Java, Spring Boot, REST APIs, and microservices
          architecture.
        </p>
        <p>Year of Experience : 1</p>
        <p>Level : Intermediate</p>
        <p>Jun 13th 24</p>
        <div className="bg-yellow-100 p-4 rounded-md">
          <p className="text-sm text-yellow-800">
            Note : This test is created and validated by AI. Any deviation,
            contact this{" "}
            <a href="mailto:santhoshs19032003@gmail.com">
              santhoshs19032003@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="sm:col-span-2">
        <div>
          <p>{questions[currentQuestionIndex]}</p>
          <textarea
            value={answers[currentQuestionIndex]}
            onChange={handleAnswerChange}
            className="w-full h-32 p-2 border rounded-md outline-none my-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            variant="ghost"
            className="w-full"
          >
            Back
          </Button>
          {currentQuestionIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-success w-full">Submit</Button>
          ) : (
            <Button onClick={handleNext} className="w-full">Next</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TestPage;
