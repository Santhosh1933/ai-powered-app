import { connectToDB } from "@/app/utils/database";
import Questions from "@/models/questions";

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response("User ID not provided", {
        status: 400,
      });
    }

    await connectToDB();
    const questions = await Questions.find({ userId });

    return new Response(JSON.stringify(questions), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response("Failed to fetch questions", {
      status: 500,
    });
  }
};
