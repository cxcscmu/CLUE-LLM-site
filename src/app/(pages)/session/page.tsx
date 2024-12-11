"use client";
import { Footer } from "@/components/(ui)/footer";
import { Logo } from "@/components/(ui)/logo";
import { Conversation } from "@/components/(logic)/conversation";
import React, { useState } from "react";
import { implementedModels } from "@/utils/models-list";
import { Protected } from "@/components/(logic)/protected";
import { Selector } from "@/_legacy/components/(logic)/selector";

export default function Home() {
  const [LLM, setLLM] = useState(implementedModels[0].value);

  const redirect = {
    reportText: "Your chat session has expired.",
    nextPage: "/interview",
    nextPageText: "Please continue to the interview page.",
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
            placeholder="Chat with me!"
            logLabel="session"
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
