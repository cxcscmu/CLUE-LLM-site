// This is the initial landing page, and implements the login bar that allows you to get access to the other pages.

"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FAQ, Label, Logo, SubmitButton, Subtitle, TextInput } from "@ui";
import { setHistory } from "@utils";
// import { GetPasswordTest } from "@logic/legacy/getPasswordTest";

export default function Home() {
  const [password, setPassword] = useState("");
  const [workerID, setWorkerID] = useState("");
  const [status, setStatus] = useState(
    "Please enter your Worker ID and the password you were provided.",
  );
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Checking your password...")
    const response = await fetch("api/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attempt: password,
        cookieName: "chatUnlocked",
        cookieTime: 900,
        cookieValue: "true",
      }),
    });
    const { isCorrect } = await response.json();

    if (isCorrect) {
      setHistory(
        JSON.parse(
          JSON.stringify({
            workerID: workerID ? workerID : password,
            sessionModel: "",
            session: [],
            interviewModel: "",
            interview: [],
          }),
        ),
      );

      router.push(`/session`);
    } else {
      setStatus(
        `The password you entered is incorrect or has already been used. Please try again.`,
      );
      setPassword("");
    }
  };

  return (
    <div
      className="
        absolute inset-0 min-h-[500px] flex items-center justify-center
        bg-zinc-100
        dark:bg-zinc-900"
    >
      <div className="relative flex flex-col gap-2 px-4">
        <Logo />
        <Subtitle>
          <i>{status}</i>
        </Subtitle>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <Label label="login-bar">
            <TextInput
              id="login-bar"
              value={workerID}
              onChange={(e: any) => setWorkerID(e.target.value)}
              placeholder="Enter your Worker ID here..."
            />
          </Label>
          <Label label="chat-bar">
            <TextInput
              id="chat-bar"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="Enter the provided password here..."
              disabled={!Boolean(workerID)}
              disabledPlaceholder="Enter your Worker ID first."
            />
            <SubmitButton disabled={!Boolean(password)} />
          </Label>
        </form>
        {/* <GetPasswordTest /> */}
      </div>
      <FAQ />
    </div>
  );
}
