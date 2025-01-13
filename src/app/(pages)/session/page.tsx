// This page implements - under a <protected> component - the chat that the user will initially have with the chatbot.

"use client";
import React, { useState } from "react";

import { redirector } from "@interfaces";
import { Conversation, Protected, Selector } from "@logic";
import { Footer, Subtitle, Logo, FAQ, Centered } from "@ui";
import { sessionModels } from "@utils";

async function toNextPage() {
  await fetch("api/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookieName: "chatUnlocked",
      cookieOperation: "delete",
    }),
  });
  await fetch("api/password", {
    method: "Put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookieName: "interviewUnlocked",
      cookieOperation: "set",
      cookieTime: 900,
      cookieValue: "true",
    }),
  });
}

export default function Home() {
  const [LLM, setLLM] = useState(sessionModels[0].value);

  const redirect: redirector = {
    reportText:
      "Your chat session has expired. You will automatically be directed to the interview page.",
    nextPage: "/interview",
    nextPageText: "",
    autopush: true,
    func: toNextPage,
  };

  return (
    <Protected redirect={redirect} cookieName="chatUnlocked">
      <Centered>
        {/* keeps the contents justified in the center of the screen */}
        <div className="relative flex flex-col gap-2 px-4">
          {/* stacks the contents on top of each other*/}
          <Logo />
          {/* Icon, title, and 'alpha' label. See components/logo */}
          <Subtitle>Chat with a model for 10-15 minutes</Subtitle>
          <Selector
            label="Select Model:"
            values={sessionModels}
            target={LLM}
            setFunc={setLLM}
          />
          {/* Lets you pick the LLM to use, if in a dev environment, and otherwise sets it randomly. See components/selector */}
          <Conversation
            LLM={LLM}
            placeholder="Chat with me!"
            logLabel="session"
            skipAccessTime={600}
            skipMessage="You may now end the conversation early, if you wish."
            skipFunction={toNextPage}
          />
          {/* Contains the chatlog and message-sending components. See components/conversation */}
          <Footer />
          {/* Adds a disclaimer to the bottom of the screen. See components/footer */}
          <FAQ />
        </div>
      </Centered>
    </Protected>
  );
}
