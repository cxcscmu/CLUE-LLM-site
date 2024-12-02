"use client";
import { FC, useState } from "react";
import { Forward } from "lucide-react";
// import { callModel } from "@/app/utils/call-model";
import { implementedModels } from "@/app/utils/call-model";
import { Message } from "@/app/interfaces/message";

export const ChatMessage: FC<{
  placeholder: string;
  LLM: string;
  setLLM: Function;
  chatLog: Message[];
  setChatLog: Function;
}> = ({ placeholder, LLM, setLLM, chatLog, setChatLog }) => {
  const [message, setMessage] = useState("");
  const [returnMessage, setReturnMessage] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (message) {
            // callModel(LLM, chatLog, message, returnMessage, setReturnMessage)

            setChatLog([
              ...chatLog,
              {
                role: "user",
                content: message,
              },
              {
                role: "assistant",
                content: returnMessage,
              },
            ]);

            setMessage("");
          }
        }}
      >
        <label
          className="relative bg-white flex items-center justify-center border py-2 px-2 rounded-lg gap-2 my-4 focus-within:border-zinc-300 shadow-md" //Styles the searchbar
          htmlFor="search-bar"
        >
          <input
            id="chat-bar"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoFocus
            placeholder={placeholder}
            className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
          />
          {/* bar to input your message */}
          <button
            type="submit"
            className="w-auto py-1 px-2 bg-zinc-950 border-black text-zinc-100 fill-white active:enabled:scale-95 hover:enabled:scale-105 border overflow-hidden relative rounded-xl disabled:opacity-70 shadow-md"
            disabled={
              message.length == 0 ||
              (chatLog.length > 0 &&
                chatLog[chatLog.length - 1].content ==
                  "Waiting for response...")
            }
            onClick={() => {
              // callModel(LLM, chatLog, setChatLog, message, setReturnMessage);
            }}
          >
            <Forward size={16} />
            {/* Button to submit your message */}
          </button>
        </label>
      </form>
    </div>
  );
};
