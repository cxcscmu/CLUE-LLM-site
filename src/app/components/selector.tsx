"use client";
import { implementedModels } from "@/app/utils/call-model";
import { FC } from "react";
import { Message } from "@/app/interfaces/message";
import { LLM } from "@/app/interfaces/llm";
import { handleClientScriptLoad } from "next/script";

export const Selector: FC<{
  LLM: string;
  setLLM: Function;
  // chatLog: Message[];
}> = ({ LLM, setLLM }) => {
  const handleRandomize = () => {
    const randIndex = Math.floor(Math.random() * implementedModels.length);
    setLLM(implementedModels[randIndex].value);
  };

  return (
    <div className="flex flex-row items-center justify-end">
      {/* Keeps the label and selector in a single line. */}
      <p className="select-none text-right dark:text-zinc-100">Select Model:</p>
      {/* Label */}
      <select
        className="
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-5
                    bg-zinc-600 border-black text-zinc-100
                    dark:bg-zinc-100 dark:border-zinc-200 dark:text-zinc-900 dark:focus:ring-blue-500 dark:focus:border-blue-500
                    disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-300
                    disabled:dark:text-zinc-800"
        // disabled={chatLog.length > 0}
        value={LLM}
        onChange={(e) => setLLM(e.target.value)}
      >
        {/* choose between one of several options */}
        {/* <option value="random">Randomly Selected Model</option> */}
        {implementedModels.map((model, index) => (
          <option key={index} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
      <button
        className="
                w-auto py-1 px-2 border overflow-hidden relative rounded-lg
                bg-black border-black text-white
                dark:bg-white border-white dark:text-black
                hover:enabled:scale-105 active:enabled:scale-95
                disabled:bg-zinc-500 disabled:text-zinc-300  disabled:border-zinc-500
                disabled:dark:text-zinc-800"
        onClick={handleRandomize}
      >
        Random
      </button>
    </div>
  );
};
