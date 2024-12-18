// This file implements the local API call for chatting with a textbot and its immediate needs:
// The tool a bot needs in order to view a prior conversation;
// The POST request that determines which model is being used and makes the call to an external API.

import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { z } from "zod";

// Helps prevent the request from timing out.
export const maxDuration = 30;

const historyTool = tool({
  description:
    "Fetches a stored conversation to be used when interviewing a user.",
  parameters: z.object({}),
  execute: async ({}) => {
    try {
      // The URL for this can't be relational. The environmental variable spells out the URL so that it can be different in dev testing than in deployment.
      const apiURL = process.env.CORE_URL;

      // This Get request fetches the chat history stored from the initial conversation.
      const response = await fetch(`${apiURL}/api/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { history } = await response.json();
      const sessionHist = history.session;

      if (sessionHist) {
        return {
          success: true,
          history: JSON.stringify(sessionHist),
          // Stringifying the history is necessary for the model to understand it properly.
        };
      } else
        return {
          success: false,
          error: "No chat history was found.",
        };
    } catch (e: any) {
      console.log(e);
      return {
        success: false,
        error: `An error occurred: ${e.message}`,
      };
    }
  },
});

export async function POST(req: Request) {
  const { messages, model, system } = await req.json();
  let result;

  // If a system prompt is provided, the call is being made by the interviewer, so it should have access to the history as well as being allowed to make 2 responses at once.
  let interviewTool = {};
  let maxSteps = 1;
  if (system) {
    interviewTool = { historyTool: historyTool };
    maxSteps = 2;
  }

  // Implements switching between models
  switch (model) {
    case "gpt-4o":
    case "gpt-4o-mini":
      result = streamText({
        model: openai(model),
        messages,
        tools: interviewTool,
        system: system,
        maxSteps: maxSteps,
      });
      break;
    case "claude-3-5-haiku-20241022":
    case "claude-3-opus-20240229":
    case "claude-3-5-sonnet-20241022":
      result = streamText({
        model: anthropic(model),
        messages,
        tools: interviewTool,
        system: system,
        maxSteps: maxSteps,
      });
      console.log(result);
      break;
  }

  // TODO: Write a better error catcher including wrapping this all in a try/catch.
  if (result) {
    return result.toDataStreamResponse();
  } else console.log("No model was provided.");
}
