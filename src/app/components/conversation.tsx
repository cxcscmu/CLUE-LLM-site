"use client";
import { FC, useEffect, useRef } from "react";
import { Chatlog } from "@/app/components/chatlog";
// import { ChatMessage } from "@/app/components/chat-message";
import { Message } from "@/app/interfaces/message";
import { useChat } from "ai/react";
import { Forward } from "lucide-react";
import clsx from "clsx";

export const Conversation: FC<{
  LLM: string;
  setLLM: Function;
  chatLog: Message[];
  setChatLog: Function;
  placeholder: string;
}> = ({ LLM, setLLM, chatLog, setChatLog, placeholder }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  // useEffect(() => {
  //     chatEndRef.current?.scrollIntoView({behavior:"smooth"})
  // }, [messages]);

  return (
    <div>
      {/* <div className="
                px-4 w-full outline-none border rounded-lg max-w-5xl max-h-96 shadow-inner overflow-auto
                bg-zinc-200 border-zinc-300
                dark:bg-zinc-600 dark:border-zinc-700">
                {messages.map((item, index) => 
                    <div className={clsx(
                        "my-2 px-5 py-2 w-10/12 outline-none border border-zinc-100 rounded-lg shadow-md hover:shadow-lg bg-white",
                        {
                            "ml-auto": index % 2 === 1,
                        },
                        )} key={item.id}>
                        <b>{item.role.toUpperCase()}</b> 
                            {item.content.split("\n").map( (line, i) =>
                            <p key={item.id + i}> {line} </p>
                            )}
                    </div>
                )}
                <div ref={chatEndRef}></div>
            </div> */}
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
              disabled={
                input.length == 0 ||
                (chatLog.length > 0 &&
                  chatLog[chatLog.length - 1].content ==
                    "Waiting for response...")
              }
              // onClick={() => {
              //     callModel(LLM, chatLog, setChatLog, message, setReturnMessage)}
              // }
            >
              <Forward size={16} />
              {/* Button to submit your message */}
            </button>
          </label>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Chatlog chatLog={chatLog} />
  //     <ChatMessage
  //       placeholder={placeholder}
  //       chatLog={chatLog}
  //       setChatLog={setChatLog}
  //       LLM={LLM}
  //       setLLM={setLLM}
  //     />
  //   </div>
  // );
};
