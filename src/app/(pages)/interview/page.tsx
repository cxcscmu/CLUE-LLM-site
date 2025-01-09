// This page implements - under a <protected> component - the chat that will interview the user about their previous conversation.

"use client";
import React, { useState } from "react";

import { redirector } from "@interfaces";
import { Conversation, Protected, Selector } from "@logic";
import { Footer, Subtitle, Logo, FAQ } from "@ui";
import {
  getHistory,
  interviewModels,
  startMessage,
  systemPrompt,
} from "@utils";

async function endInterview() {
  const response = await fetch("api/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookieName: "interviewUnlocked",
      cookieOperation: "delete",
    }),
  });
}

async function neonCaller() {
  // neon's POST submits a set of chatlogs to a neon database.
  const hist = getHistory();
  const response = await fetch("api/neon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hist: hist }),
  });
  const { message } = await response.json();
  console.log(message);
}

export default function Home() {
  const [LLM, setLLM] = useState(interviewModels[0].value);

  // URItoHist();

  // The <protected> component takes this as an argument to display that text after the cookie expires. The function gets run a single time after it expires.
  const redirect: redirector = {
    reportText:
      "Your interview session has expired. You may now close the page.",
    nextPage: "/",
    nextPageText: "",
    func: neonCaller,
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
          <Subtitle>
            Be interviewed about the previous conversation.
          </Subtitle>
          <Selector
            label="Select Model:"
            values={interviewModels}
            target={LLM}
            setFunc={setLLM}
          />
          {/* Lets you pick the LLM to use, if in a dev environment, and otherwise sets it randomly. See components/selector */}
          <Conversation
            LLM={LLM}
            placeholder="Respond here."
            system={systemPrompt}
            logLabel="interview"
            initialMessages={startMessage}
            skipAccessTime={600}
            skipMessage="You may now end the interview, if it's complete."
            skipFunction={endInterview}
          />
          {/* Contains the chatlog and message-sending components. See components/conversation */}
          <Footer />
          {/* Adds a disclaimer to the bottom of the screen. See components/footer */}
          <FAQ />
        </div>
      </div>
    </Protected>
  );
}
