// This file implements the API calls for storing and retrieving a chat history:
// The POST request that updates the chat history;
// The GET request that retrieves it.

import { Message } from "ai";
import { NextResponse } from "next/server";

let chatHistory: {
    session : Message[];
    interview : Message[];
    startTime? : Date;
    endTime? : Date;
    // UID : string;
} = { session: [], interview: [] }

export async function PUT(req: Request) {
    try {
        const block: historyBlock = await req.json();
        if (block.initial && !chatHistory[block.logLabel].length) {
            chatHistory[block.logLabel] = [...block.initial];
        }

        chatHistory[block.logLabel] = [
            ...chatHistory[block.logLabel],
            {
                id: chatHistory[block.logLabel].length.toString(),
                role: "user",
                content: block.sent,
            },
            {
                id: (chatHistory[block.logLabel].length + 1).toString(),
                role: "assistant",
                content: block.recieved
            }
        ];

        if (!chatHistory.startTime) {
            chatHistory.startTime = new Date();
        }
        chatHistory.endTime = new Date();
        console.log(chatHistory[block.logLabel])

        return NextResponse.json({ 
            success: true,
            message: 'Resource updated successfully'
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            message: "Failed to update history."},
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({history: chatHistory.session})
}

interface historyBlock {
    logLabel : "session" | "interview";
    initial? : Message[];
    sent : string;
    recieved : string;
}