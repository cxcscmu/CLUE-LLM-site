// This page implements - under a <Protected> component - the chat that will interview the user about their previous conversation.

"use client";
import React, { useState } from "react";

import { redirector } from "@interfaces";
import { Conversation, Protected, Selector } from "@logic";
import { Footer, Subtitle, Logo, FAQ, Centered } from "@ui";
import {
  getHistory,
  interviewModels,
  startMessage,
  systemPrompt,
} from "@utils";

// This function is called when the button to end the interview early is pushed.
async function endInterview() {
  // api/password/PUT deletes a cookie, locking an unlocked page.
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

// This function is called by <protected> when the page is locked after having been accessible.
async function neonCaller() {
  // After fetching a copy of the chat history, it submits it to the NEON database.
  const hist = getHistory();
  const response = await fetch("api/neon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hist: hist }),
  });
  // It submits the response to the logs in case of errors.
  const { message } = await response.json();
  console.log(message);
}

export default function Home() {
  const [LLM, setLLM] = useState(interviewModels[0].value);

  // The <protected> component takes this as an argument to display that text after the cookie expires. The function gets run a single time after it expires.
  const redirect: redirector = {
    reportText:
      "Your interview session has expired. You may now close the page.",
    nextPage: "/",
    nextPageText: "",
    func: neonCaller, // Defined above.
  };

  return (
    <Protected redirect={redirect} cookieName="interviewUnlocked">
      <Centered>
        <div className="relative flex flex-col gap-2 px-4">
          {/* stacks the contents on top of each other*/}
          <Logo />
          {/* Icon, title, and 'alpha' label. See components/logo */}
          <Subtitle>Be interviewed about the previous conversation.</Subtitle>
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
      </Centered>
    </Protected>
  );
}
