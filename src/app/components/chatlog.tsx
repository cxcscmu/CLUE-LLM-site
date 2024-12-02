"use client";
import { FC, useEffect, useRef } from "react";
import { Message } from "@/app/interfaces/message";
import clsx from "clsx";

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
        className="
            px-4 w-full outline-none border rounded-lg max-w-5xl max-h-96 shadow-inner overflow-auto
            bg-zinc-200 border-zinc-300
            dark:bg-zinc-600 dark:border-zinc-700"
      >
        {chatLog.map((item, index) => (
          <div
            className={clsx(
              "my-2 px-5 py-2 w-10/12 outline-none border border-zinc-100 rounded-lg shadow-md bg-white",
              {
                "ml-auto": index % 2 === 1,
              },
            )}
            key={index}
          >
            <b>{item.role.toUpperCase()}</b>
            {item.content.split("\n").map((line, i) => (
              <p key={index + "_" + i}> {line} </p>
            ))}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
    );
  }
};
