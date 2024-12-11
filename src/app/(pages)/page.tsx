"use client";
import React from "react";
import { Logo } from "@/components/(ui)/logo";
import { useState } from "react";
import { Forward } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(
    "Please enter the password you were provided.",
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
    let { isCorrect } = await response.json();

    // let response = (password === "cmu_lti_clue")
    if (isCorrect) {
      router.push("/session");
    } else {
      setStatus(`The password ${password} is incorrect. Please try again.`);
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
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            autoComplete="off"
            // onSubmit={(e) => setPassword("Test")}
          >
            <label
              className="relative bg-white flex items-center justify-center border py-2 px-2 rounded-lg gap-2 my-4 focus-within:border-zinc-300 shadow-md min-w-96" //Styles the searchbar
              htmlFor="search-bar"
            >
              <input
                id="chat-bar"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="Enter the provided password..."
                className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
              />
              {/* bar to input your message */}
              <button
                type="submit"
                className="w-auto py-1 px-2 bg-zinc-950 border-black text-zinc-100 fill-white active:enabled:scale-95 hover:enabled:scale-105 border overflow-hidden relative rounded-xl disabled:opacity-70 shadow-md"
              >
                <Forward size={16} />
                {/* Button to submit your message */}
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
