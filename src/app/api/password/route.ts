// This file implements the API calls for checking a password and the cookies it sets:
// The POST request to check that the password matches the environment variable and to set cookies to confirm;
// The GET request to check that the 'logged in' cookies exist.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { attempt } = await req.json();
  const cookieStore = cookies();

  const correctPassword = process.env.ACCESS_PASSWORD;
  const result =
    attempt === correctPassword;// || process.env.NODE_ENV === "development";

  if (result) {
    // Set two cookies - one lasting 10 minutes that lets you chat with the conversational bot, one lasting 20 minutes that lets you have an interview after you do.
    cookieStore.set({
      name: "chatUnlocked",
      value: "true",
      maxAge: 600,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });
    cookieStore.set({
      name: "interviewUnlocked",
      value: "true",
      maxAge: 1200,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });
  } else {
    // An unsuccessful password deletes those cookies, just in case.
    cookieStore.delete("chatUnlocked");
    cookieStore.delete("interviewUnlocked?");
  }

  // Returns true if the log-in was successful.
  return NextResponse.json({ isCorrect: result });
}

export async function GET() {
  const cookieStore = cookies();

  const chatUnlocked = cookieStore.has("chatUnlocked");
  const interviewUnlocked = cookieStore.has("interviewUnlocked");

  return NextResponse.json({
    chatUnlocked: chatUnlocked,
    interviewUnlocked: interviewUnlocked,
  });
}
