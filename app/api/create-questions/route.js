import { connectToDB } from "@/app/utils/database";
import Questions from "@/models/questions";

// /api/create-questions
export const POST = async (req) => {
  const { id, questions, level, yearOfExperience, jobDescription, title } =
    await req.json();
  console.log(id, questions, level, yearOfExperience, jobDescription, title);

  try {
    await connectToDB();
    const resQuestions = new Questions({
      userId: id,
      questions: JSON.parse(questions),
      level,
      yearOfExperience,
      jobDescription,
      title,
    });

    await resQuestions.save();
    return new Response(JSON.stringify(resQuestions), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create new Questions", {
      status: 500,
    });
  }
};
