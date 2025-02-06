// This page implements - under a <Protected> component - the chat that the user will initially have with the chatbot.

"use client";
import React from "react";

import { redirector } from "@interfaces";
import { Conversation, Protected } from "@logic";
import { Footer, Logo, FAQ, Centered, Stacked } from "@ui";
import { getHistory, sessionModels } from "@utils";

// This function is called by <Protected> when the page is locked after having been accessible.
// It's set up for going to the interview page.
async function toNextPage() {
  // It sets the interviewUnlocked cookie to make the interview page accessible.
  await fetch("api/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cookieName: "interviewUnlocked",
      cookieOperation: "set",
      cookieTime: 900,
      cookieValue: Date.now().toString(),
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

async function endChat() {
  // It deletes the interviewUnlocked cookie, making the page inaccessible.
  const response = await fetch("api/password", {
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

  // The following redirector is set up to end the page.
  // const redirect: redirector = {
  //   reportText: `Your interview session has expired. Paste your unique password \n 
  //     lovely269listless034macaque \n into Qualtrics. You may now close the page.`,
  //   nextPage: "/",
  //   nextPageText: "",
  //   func: neonCaller, // Defined above.
  // };

  // The following redirector is set up for sending the user to an interview page.
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
            skipAccessTime={600}
            skipMessage="You may now end the conversation early, if you wish."
            skipFunction={toNextPage}
            skipCookieName="chatUnlocked"
            modelsList={sessionModels}
          />
          <Footer />
          <FAQ />
        </Stacked>
        <Logo />
      </Centered>
    </Protected>
  );
}
