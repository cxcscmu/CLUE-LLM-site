// This is the initial landing page, and implements the login bar that allows you to get access to the other pages.

"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Centered,
  FAQ,
  Label,
  Logo,
  Stacked,
  SubmitButton,
  Subtitle,
  TextInput,
} from "@ui";
import { setHistory } from "@utils";

export default function Home() {
  const [password, setPassword] = useState("");
  const [workerID, setWorkerID] = useState("");
  const [status, setStatus] = useState(
    "Please enter your Worker ID and the password you were provided.",
  );
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Checking your password...");
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
    <Centered>
      <Stacked>
        <Subtitle>Getting Started</Subtitle>
        <p className="text-center dark:text-zinc-100">{status}</p>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <div className="bg-zinc-100 dark:bg-zinc-800 px-5 pt-7 pb-5 mt-2 rounded-lg">
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
          </div>
        </form>
      </Stacked>
      <Logo />
      <FAQ />
    </Centered>
  );
}
