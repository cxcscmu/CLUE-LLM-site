// This file implements the half of the conversation module that takes the user's input, inheriting the required functions and variables to do so from <conversation>

"use client";
import React, { FC } from "react";
import { Forward } from "lucide-react";

export const ChatMessage: FC<{
  handleSubmit: Function;
  modelVars: {
    model: string;
    system?: string;
  };
  input: string;
  handleInputChange: React.ChangeEventHandler;
  placeholder: string;
}> = ({ handleSubmit, modelVars, input, handleInputChange, placeholder }) => {
  return (
    <div>
      <form
        onSubmit={(event) =>
          handleSubmit(event, {
            body: modelVars,
          })
        }
        autoComplete="off"
      >
        <label
          className="relative bg-white flex items-center justify-center border py-2 px-2 rounded-lg gap-2 my-4 focus-within:border-zinc-300 shadow-md"
          htmlFor="search-bar"
        >
          <input
            id="chat-bar"
            value={input}
            onChange={handleInputChange}
            autoFocus
            placeholder={placeholder}
            className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
          />
          <button
            type="submit"
            className="w-auto py-1 px-2 bg-zinc-950 border-black text-zinc-100 fill-white active:enabled:scale-95 hover:enabled:scale-105 border overflow-hidden relative rounded-xl disabled:opacity-70 shadow-md"
          >
            <Forward size={16} />
          </button>
        </label>
      </form>
    </div>
  );
};
