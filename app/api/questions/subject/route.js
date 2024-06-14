import { connectToDB } from "@/app/utils/database";
import Questions from "@/models/questions";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const userId = url?.searchParams.get("userId");
    const questionId = url?.searchParams.get("questionId");
    return new Response(JSON.stringify({ userId, questionId }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response("Failed to fetch questions", {
      status: 500,
    });
  }
};
