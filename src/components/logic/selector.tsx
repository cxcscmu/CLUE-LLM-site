// This is used to select a specific model for testing, or simply to set the model randomly if in the production environment.

"use client";
import { FC, useState } from "react";

import { selection } from "@interfaces";

export const Selector: FC<{
  label?: string;
  values: selection[];
  target: string;
  setFunc: Function;
}> = ({ label = "", values, target, setFunc }) => {
  const [randomized, setRandomized] = useState(false);
  const handleRandomize = () => {
    const randIndex = Math.floor(Math.random() * values.length);
    setFunc(values[randIndex].value);
  };

  if (process.env.NODE_ENV === "development") {
    return (
      <div className="flex flex-row items-center justify-end">
        {/* Keeps the label and selector in a single line. */}
        <p className="select-none text-right dark:text-zinc-100">{label}</p>
        {/* Label */}
        <select
          className="
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mx-5
            bg-zinc-600 border-black text-zinc-100
            dark:bg-zinc-100 dark:border-zinc-200 dark:text-zinc-900 dark:focus:ring-blue-500 dark:focus:border-blue-500
            disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-300
            disabled:dark:text-zinc-800"
          value={target}
          onChange={(e) => setFunc(e.target.value)}
        >
          {/* choose between one of several options */}
          {/* <option value="random">Randomly Selected Model</option> */}
          {values.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <button
          className="
            w-auto py-1 px-2 border overflow-hidden relative rounded-lg
            bg-black border-black text-white
            dark:bg-white border-white dark:text-black
            hover:enabled:scale-105 active:enabled:scale-95
            disabled:bg-zinc-500 disabled:text-zinc-300 disabled:border-zinc-500
            disabled:dark:text-zinc-800"
          onClick={handleRandomize}
        >
          Random
        </button>
      </div>
    );
  } else if (!randomized) {
    handleRandomize();
    setRandomized(true);
  }
};
