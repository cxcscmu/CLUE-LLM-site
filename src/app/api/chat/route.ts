"use server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model } = await req.json();
  let result;

  switch (model) {
    case "gpt-4o":
    case "gpt-4o-mini":
      result = streamText({
        model: openai(model),
        messages,
      });
      break;
    default:
      result = streamText({
        model: openai(model),
        messages,
      });
      break;
  }

  return result.toDataStreamResponse();
}

// import { OpenAI } from 'openai';

// const clientOpenAI = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     // dangerouslyAllowBrowser: true,
// });

// export async function POST (req: Request) { //, chatLog: any, setChatLog: Function)  {
//     const chatLog = JSON.parse(req.body);
//     let returnMessage;

//     try {
//         const response = await clientOpenAI.chat.completions.create({
//             messages: chatLog,
//             model: 'gpt-4o'
//         })

//         if (response) {
//             returnMessage = response.choices[0].message.content
//         } else {
//             returnMessage = "An error occured."
//         }
//     } catch (error) {
//         console.error(error);
//         returnMessage = "An error occured."
//     }

//     return Response.json(returnMessage)
// }
