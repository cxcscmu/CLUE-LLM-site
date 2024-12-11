"use client";
import { Footer } from "@/components/(ui)/footer";
import { Logo } from "@/components/(ui)/logo";
import { Conversation } from "@/components/(logic)/conversation";
import React, { useState } from "react";
import { Selector } from "@/_legacy/components/(logic)/selector";
// import { useChat } from "ai/react";
import { implementedModels } from "@/utils/models-list";
import { Protected } from "@/components/(logic)/protected";

export default function Home() {
  const [LLM, setLLM] = useState(implementedModels[0].value);

  const systemPrompt = `You are a user experience (UX) researcher. You are going to design a UX interview and conduct the interview with a user. The product for the UX interview is a ChatBot. The user in this interview has just had a conversation with the ChatBot prior to this interview. The goal of the interview is to understand the user’s experience using the ChatBot, if the ChatBot successfully met their needs or solved their problems, and gather feedback on how to improve the ChatBot. Your interview flow and follow-up questions should be tailored to the user’s specific experiences and perspectives regarding using the ChatBot.
 
<Instructions>
You will receive the chat history between the user and the ChatBot.
Your interview language should be friendly, concise, and professional. Incorporate the following tones: curious, welcoming, conversational, empowering, and objective.
Do not mention any names. Do not make any judgments about the ChatBot, the user, or the user’s experience. Do not explain your reasoning.
Only respond in English and respond to English.
Total interview time should be 10-15 minutes. Total number of questions should range from 5 to 10.
 
To do this task, you should:
1.      Review the Chat History. The chat history will contain “content” which is the content of the conversation, and “role” which will be either “user” or “assistant” (chatbot).
2.      Start the interview with the user. First, greet the user in one sentence and thank them for their participation.
3.      Interview the user, one question at a time. Wait for the user to respond before asking another question.
4.      Based on the user’s response to the question, ask follow-up questions to understand the how/why behind the user’s experience, behavior, and rationale. Ask no more than two follow-up questions based on each question. Move on to the next interview question once you’ve gathered sufficient information on the previous question.
5.      Make sure you cover the following areas in your interview: understand the user’s experience using the ChatBot, if the ChatBot correctly understood the user’s question or request, if the ChatBot successfully met their needs or solved their problems, if the ChatBot provided coherent, factual, and relevant information, what the user’s overall satisfaction was with the interaction, and gather feedback on how to improve the ChatBot
6.      After you’ve gathered sufficient information about the user’s experience, thank the user for their participation again and end the interview.`;

  const redirect = {
    reportText: "Your interview session has expired. You may now close the page.",
    nextPage: "/",
    nextPageText: "",
    // TODO: write a function that will save the chatlogs.
  };

  return (
    <Protected redirect={redirect} cookieName="interviewUnlocked">
      <div
        className="
          absolute inset-0 min-h-[500px] flex items-center justify-center
          bg-zinc-100
          dark:bg-zinc-900"
      >
        {/* keeps the contents justified in the center of the screen */}
        <div className="relative flex flex-col gap-2 px-4">
          {/* stacks the contents on top of each other*/}
          <Logo />
          {/* Icon, title, and 'alpha' label. See components/logo */}
          <Selector LLM={LLM} setLLM={setLLM} />
          {/* Lets you pick the LLM to use, only if the chatLog is empty. See components/selector */}
          <Conversation
            LLM={LLM}
            placeholder="Respond here."
            system={systemPrompt}
            logLabel="interview"
            initialMessages={[{
              id: "0",
              role: "assistant",
              content: "Hello! I'm here to interview you about your experience with the chatbot you just spoke to."
            }]}
          />
          {/* Contains the chatlog and message-sending components. See components/conversation */}
          {/* <div className="flex flex-row items-center justify-end">
            <div className="dark:text-zinc-500 mr-3" hidden = {messages.length < 5}>Test</div>
            <button className="
              w-auto py-1 px-2 border overflow-hidden relative rounded-xl
              bg-black border-black text-white
              dark:bg-white border-white dark:text-black
              hover:enabled:scale-105 active:enabled:scale-95
              disabled:bg-zinc-500 disabled:text-zinc-300  disabled:border-zinc-500
              disabled:dark:text-zinc-800"
              disabled = {messages.length < 5}
            >
                Submit
            </button>
                  </div> */}
          <Footer />
          {/* Adds a disclaimer to the bottom of the screen. See components/footer */}
        </div>
      </div>
    </Protected>
  );
}
