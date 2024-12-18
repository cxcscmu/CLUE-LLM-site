// This page implements - under a <protected> component - the chat that the user will initially have with the chatbot.

"use client";
import React, { useState } from "react";

import { redirector } from "@/interfaces";
import { Conversation, Protected, Selector } from "@logic";
import { Footer, Logo } from "@ui";
import { implementedModels } from "@utils";

export default function Home() {
  const [LLM, setLLM] = useState(implementedModels[0].value);

  // URItoHist

  const redirect: redirector = {
    reportText:
      "Your chat session has expired. You will automatically be directed to the interview page.",
    nextPage: "/interview",
    nextPageText: "",
    autopush: true,
  };

  return (
    <Protected redirect={redirect} cookieName="chatUnlocked">
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
          <Selector
            label="Select Model:"
            values={implementedModels}
            target={LLM}
            setFunc={setLLM}
          />
          {/* Lets you pick the LLM to use, if in a dev environment, and otherwise sets it randomly. See components/selector */}
          <Conversation
            LLM={LLM}
            placeholder="Chat with me!"
            logLabel="session"
          />
          {/* Contains the chatlog and message-sending components. See components/conversation */}
          <Footer />
          {/* Adds a disclaimer to the bottom of the screen. See components/footer */}
        </div>
      </div>
    </Protected>
  );
}
