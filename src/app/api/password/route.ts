import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();

  const { attempt } = await req.json();

  const correctPassword = process.env.ACCESS_PASSWORD;

  const result = attempt === correctPassword;

  if (result) {
    cookieStore.set({
      name: "chatLocked?",
      value: "unlocked",
      maxAge: 600,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });
  } else {
    cookieStore.delete("chatLocked?");
  }

  return NextResponse.json({ isCorrect: result });
}

export async function GET() {
  const cookieStore = cookies();

  const chatLocked = cookieStore.has("chatLocked?");

  return NextResponse.json({ unlocked: chatLocked });
}
