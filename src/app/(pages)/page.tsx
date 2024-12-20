// This is the initial landing page, and implements the login bar that allows you to get access to the other pages.

"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Label, Logo, SubmitButton, TextInput } from "@ui";
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
    const response = await fetch("api/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attempt: password }),
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
        `The password you entered, ${password}, is incorrect. Please try again.`,
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
        <div
          className="text-center
            text-zinc-500
            dark:text-zinc-400"
        >
          <i>{status}</i>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
        >
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
              disabledPlaceholder=""
            />
            <SubmitButton disabled={!Boolean(workerID)}/>
          </Label>
        </form>
      </div>
    </div>
  );
}
