// This file pairs the chatlog and chat-message components together, and provides the information they require to function. useChat() is defined here to allow them to share information properly.

"use client";
import { FC, useEffect } from "react";
import { Message, useChat } from "ai/react";

import { Chatlog, ChatMessage } from "@logic";
import { getHistory, setHistory } from "@/utils";
import { conversation } from "@/interfaces";

export const Conversation: FC<{
  LLM: string;
  placeholder?: string;
  system?: string;
  logLabel: "session" | "interview";
  initialMessages?: Message[];
}> = ({
  LLM,
  placeholder = "Type here...",
  system,
  logLabel,
  initialMessages,
}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    ...(initialMessages && { initialMessages: initialMessages })
  });

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

      await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newHist: newHist }),
      });
    }

  updateHist();
  }, [messages])

  let modelVars = {
    model: LLM,
    ...(system && { system: system }),
  };

  return (
    <div>
      <Chatlog chatLog={messages} />

      <ChatMessage
        handleSubmit={handleSubmit}
        modelVars={modelVars}
        input={input}
        handleInputChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};
