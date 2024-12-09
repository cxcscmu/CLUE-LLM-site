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
