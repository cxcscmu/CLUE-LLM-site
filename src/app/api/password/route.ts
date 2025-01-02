// This file implements the API calls for checking a password and the cookies it sets:
// The POST request to check that the password matches the environment variable and to set cookies to confirm;
// The PUT request to skip you through cookie-protected pages;
// The GET request to check that the 'logged in' cookies exist.

import { passwordProtectionStatus } from "@interfaces";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function setCookie(
  cookieName: string,
  cookieTime: number,
  cookieValue: string,
) {
  const cookieStore = cookies();
  cookieStore.set({
    name: cookieName,
    value: cookieValue,
    maxAge: cookieTime,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
}

export async function POST(req: Request) {
  const { attempt, cookieName, cookieTime } = await req.json();

  const correctPassword = process.env.ACCESS_PASSWORD;
  const result = attempt === correctPassword; // || process.env.NODE_ENV === "development";

  if (result) {
    // Set the specified cookie for the given time.
    await setCookie(cookieName, cookieTime, "true");
  } else {
    // An unsuccessful password deletes that cookie, just in case.
    const cookieStore = cookies();
    cookieStore.delete(cookieName);
  }

  // Returns true if the log-in was successful.
  return NextResponse.json({ isCorrect: result });
}

export async function PUT(req: Request) {
  const { cookieName, cookieOperation, cookieTime, cookieValue } =
    await req.json();

  switch (cookieOperation) {
    case "set":
      await setCookie(cookieName, cookieTime, cookieValue);
      break;
    case "delete":
      const cookieStore = cookies();
      cookieStore.delete(cookieName);
      break;
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = cookies();

  const chatUnlocked = cookieStore.has("chatUnlocked");
  const interviewUnlocked = cookieStore.has("interviewUnlocked");

  return NextResponse.json({
    chatUnlocked: chatUnlocked,
    interviewUnlocked: interviewUnlocked,
  } as passwordProtectionStatus);
}
