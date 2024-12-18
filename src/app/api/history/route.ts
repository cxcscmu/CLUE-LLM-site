// This file implements the API calls for storing and retrieving a chat history:
// The POST request that updates the chat history;
// The GET request that retrieves it.

import { NextResponse } from "next/server";

import { conversation } from "@/interfaces";

let chatHistory: conversation = JSON.parse(
  JSON.stringify({
    workerID: "",
    sessionModel: "",
    session: [],
    interviewModel: "",
    interview: [],
  }),
);

async function getHistory() {
  return chatHistory;
}

async function setHistory(newHist: conversation) {
  chatHistory = newHist;
  // console.log(chatHistory)
  return;
}

export async function PUT(req: Request) {
  try {
    const { newHist } = await req.json();
    setHistory(newHist);

    return NextResponse.json({
      success: true,
      message: "Resource updated successfully",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update history.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  const hist = await getHistory();
  return NextResponse.json({ history: hist });
}
