"use client";
import { getSearchUrl } from "@/app/_legacy/utils/get-search-url";
import { ArrowRight } from "lucide-react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

export const Search: FC<{
  // 3 arguemnts which must be strings
  defK: string; // K helps determine how random the LLMs generations are, iirc
  apiKey: string; // apiKey is necessary to access an LLM
  defSnippet: string;
}> = ({ defK, apiKey, defSnippet }) => {
  const [value, setValue] = useState(""); // useState makes arrays that can have their values changed/accessed later.
  const [k, setK] = useState(defK);
  const [snippet, setSnippet] = useState(defSnippet);
  const router = useRouter(); // Lets the searchbar navigate you to a new page.
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); //doesn't do anything if the searchbar is blank
        if (value) {
          setValue("");
          router.push(
            //gets a url from get-search-url and navigates there.
            getSearchUrl(
              encodeURIComponent(value),
              nanoid(),
              encodeURIComponent(k),
              encodeURIComponent(apiKey),
              encodeURIComponent(snippet),
            ),
          );
        }
      }}
    >
      <div className="flex flex-row items-center justify-end space-x-2 py-5">
        {" "}
        {/* Keeps the Snippet selection in a single row */}
        <div className="flex-grow"></div>
        <p>Snippet type:</p>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        >
          {" "}
          {/* choose between one of several options */}
          <option value="first">First 128 Tokens</option>
          <option value="sliding">Sliding Window</option>
        </select>
      </div>
      <label
        className="relative bg-white flex items-center justify-center border ring-8 ring-zinc-300/20 py-2 px-2 rounded-lg gap-2 focus-within:border-zinc-300" //Styles the searchbar
        htmlFor="search-bar"
      >
        <input
          id="search-bar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          placeholder="Search for anything ..."
          className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
        />{" "}
        {/* The searchbar itself */}
        <div className="border border-black rounded-md flex flex-row">
          <p className="pl-2">k:</p>
          <input
            value={k}
            type="number"
            onChange={(e) => setK(e.target.value)}
            autoFocus
            style={{ width: "60px" }}
            placeholder="# results"
            className="px-2 pr-2 rounded-md relative border-black flex-1 outline-none bg-white"
          />
          {/* The K selector */}
        </div>
        <button
          type="submit"
          className="w-auto py-1 px-2 bg-black border-black text-white fill-white active:scale-95 border overflow-hidden relative rounded-xl"
        >
          <ArrowRight size={16} />
          {/* Button to submit your message */}
        </button>
      </label>
    </form>
  );
};
