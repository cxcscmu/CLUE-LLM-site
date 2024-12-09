"use client";
import { FC } from "react";
import { Chatlog } from "@/app/components/chatlog";
import { useChat } from "ai/react";
import { Forward } from "lucide-react";

export const Conversation: FC<{
  LLM: string;
  placeholder: string;
}> = ({ LLM, placeholder }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <Chatlog chatLog={messages} />

      <div>
        <form
          onSubmit={(event) =>
            handleSubmit(event, {
              body: {
                model: LLM,
              },
            })
          }
          autoComplete="off"
        >
          <label
            className="relative bg-white flex items-center justify-center border py-2 px-2 rounded-lg gap-2 my-4 focus-within:border-zinc-300 shadow-md" //Styles the searchbar
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
  );
};
