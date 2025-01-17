// This file implements the half of the conversation module that displays the chat history to the user, inheriting the required variable to do so from <conversation>

"use client";
import { FC, useEffect, useRef } from "react";
import clsx from "clsx";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export const Chatlog: FC<{
  chatLog: Message[];
}> = ({ chatLog }) => {
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  if (chatLog.length) {
    return (
      <div
        className={`
        fixed top-16 w-full md:w-2/3 pr-7 pb-10 ${process.env.NODE_ENV === "development" ? "bottom-[calc(12.5rem)]" : "bottom-[calc(10rem)]"} outline-none rounded-lg overflow-y-auto
        bg-white
        dark:bg-zinc-900 dark:border-zinc-700`}
      >
        {chatLog.map(
          (item, index) =>
            item.content &&
            typeof item.content === "string" && (
              <div key={index}>
                <div className="flex flex-row">
                  {item.role !== "user" && (
                    <div className="h-10 mt-3 mr-2">
                      <Image
                        width={32}
                        height={32}
                        src="/images/cmu-scotty.png"
                        className="dark:hidden"
                        alt="Scotty Logo"
                      />
                      <Image
                        width={32}
                        height={32}
                        src="/images/cmu-scotty-dark.png"
                        className="hidden dark:block"
                        alt="Scotty Logo"
                      />
                    </div>
                  )}
                  <div
                    className={clsx(
                      "my-2 px-5 py-2 w-fit max-w-[75%] outline-none border border-zinc-100 rounded-xl bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800 text-black dark:text-zinc-100",
                      {
                        "ml-auto text-right": item.role === "user",
                      },
                    )}
                  >
                    <ReactMarkdown>{item.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ),
        )}
        <div ref={chatEndRef}></div>
      </div>
    );
  }
};
