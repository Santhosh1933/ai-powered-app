import { connectToDB } from "@/app/utils/database";
import User from "@/models/user";

// /api/create-user
export const POST = async (req) => {
  const { userId } = await req.json();

  try {
    await connectToDB();
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return new Response(JSON.stringify(existingUser), {
        status: 200,
      });
    }

    const newUser = new User({
      userId,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to create new User", {
      status: 500,
    });
  }
};
