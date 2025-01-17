// This file pairs the chatlog and chat-message components together, and provides the information they require to function. useChat() is defined here to allow them to share information properly.

"use client";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { CoreMessage, Message } from "ai";
import { useChat } from "ai/react";
import { ArrowBigRightDash } from "lucide-react";
import clsx from "clsx";

import { Chatlog, ChatMessage, Selector, Timer } from "@logic";
import { displayTime, getHistory, setHistory } from "@utils";
import { conversation } from "@interfaces";
import { FunctionButton, Subtitle } from "@ui";
import { sessionModels } from "@utils";

export const Conversation: FC<{
  placeholder?: string;
  system?: string;
  logLabel: "session" | "interview";
  initialMessages?: CoreMessage[];
  skipAccessTime?: number;
  skipMessage?: string;
  skipFunction?: MouseEventHandler;
  setLLM?: (value: string) => void;
}> = ({
  placeholder = "Type here...",
  system,
  logLabel,
  initialMessages = [],
  skipAccessTime,
  skipMessage,
  skipFunction,
}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: initialMessages as Message[],
  });

  const [LLM, setLLM] = useState(sessionModels[0].value);

  useEffect(() => {
    const updateHist = async () => {
      const hist = getHistory();

      const newHist: conversation = {
        ...hist,
        ...(logLabel === "session" && {
          session: messages,
          sessionModel: LLM,
          sessionStart: hist.sessionStart ? hist.sessionStart : new Date(),
          sessionEnd: new Date(),
        }),
        ...(logLabel === "interview" && {
          interview: messages,
          interviewModel: LLM,
          interviewStart: hist.interviewStart
            ? hist.interviewStart
            : new Date(),
          interviewEnd: new Date(),
        }),
      };

      setHistory(newHist);

      // await fetch("/api/history", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ newHist: newHist }),
      // });
    };

    updateHist();
  }, [messages, LLM, logLabel]);

  const [timerDone, setTimerDone] = useState(false);

  const modelVars = {
    model: LLM,
    ...(system && { system: system }),
  };

  let skip;
  if (skipMessage && skipFunction) {
    skip = (
      <label className="flex">
        <p
          className={clsx(
            "my-auto ml-auto mr-1 text-xs text-right select-none opacity-50",
            "text-zinc-500",
            "dark:text-zinc-300",
            {
              "hover:text-zinc-700 hover:dark:text-zinc-200 opacity-100":
                Boolean(messages.length > initialMessages.length + 1),
            },
          )}
        >
          {/* {buttonMessage} */}
          <Timer
            maxTime={skipAccessTime ? skipAccessTime : 0}
            timerDone={setTimerDone}
            skipMessage={skipMessage ? skipMessage : undefined}
          ></Timer>
        </p>
        <FunctionButton
          onClick={skipFunction}
          disabled={
            process.env.NODE_ENV != "development" &&
            (Boolean(messages.length <= initialMessages.length + 1) ||
              !Boolean(timerDone))
          }
          labeled={false}
        >
          <ArrowBigRightDash size={20} />
        </FunctionButton>
      </label>
    );
  }

  return (
    <div>
      {messages.length == 0 && (
        <Subtitle>Chat with a model for 10-15 minutes</Subtitle>
      )}
      <Chatlog chatLog={messages} />

      <div
        className={`${messages.length == 0 ? "" : "fixed bottom-10 w-full pr-7 md:w-2/3"}`}
      >
        <div className="p-5 bg-zinc-100 dark:bg-zinc-800 rounded-xl mt-3 mb-2">
          {/* Lets you pick the LLM to use, if in a dev environment, and otherwise sets it randomly. */}
          <ChatMessage
            handleSubmit={handleSubmit}
            modelVars={modelVars}
            input={input}
            handleInputChange={handleInputChange}
            placeholder={placeholder}
          />

          {/* Contains the chatlog and message-sending components. */}
          <Selector
            label="Model:"
            values={sessionModels}
            target={LLM}
            setFunc={setLLM}
          />
        </div>
        {skip}
      </div>
    </div>
  );
};
