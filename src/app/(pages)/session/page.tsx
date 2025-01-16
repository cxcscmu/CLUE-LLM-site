// This page implements - under a <Protected> component - the chat that the user will initially have with the chatbot.

"use client";
import React from "react";

import { redirector } from "@interfaces";
import { Conversation, Protected } from "@logic";
import { Footer, Logo, FAQ, Centered, Stacked } from "@ui";

// This function is called by <Protected> when the page is locked after having been accessible.
async function toNextPage() {
  // It sets the interviewUnlocked cookie to make the interview page accessible.
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
  // Then it deletes the chatUnlocked cookie, making this page inaccessible.
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
}

export default function Home() {
  // The <protected> component takes this as an argument to display that text after the cookie expires. The function gets run a single time after it expires, then it automatically navigates to nextPage.
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
        <Stacked>
          <Conversation
            placeholder="Chat with me!"
            logLabel="session"
            skipAccessTime={10}
            skipMessage="You may now end the conversation early, if you wish."
            skipFunction={toNextPage}
          />
          <Footer />
          <FAQ />
        </Stacked>
        <Logo />
      </Centered>
    </Protected>
  );
}
