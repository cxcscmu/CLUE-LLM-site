// This file pairs the chatlog and chat-message components together, and provides the information they require to function. useChat() is defined here to allow them to share information properly.

"use client";
import { FC } from "react";
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
    ...(initialMessages && { initialMessages: initialMessages }),
    onFinish: async (message) => {
      const hist = getHistory();

      let conv: Message[] = [];
      let id: number = 0;
      if (initialMessages && !hist[logLabel].length) {
        conv = [...initialMessages];
        id = initialMessages.length;
      }

      conv = [
        ...conv,
        ...hist[logLabel],
        {
          id: (hist[logLabel].length + id).toString(),
          role: "user",
          content: input,
        },
        {
          id: (hist[logLabel].length + id + 1).toString(),
          role: "assistant",
          content: message.content,
        },
      ];

      const newHist: conversation = {
        ...hist,
        ...(logLabel === "session" && {
          session: conv,
          sessionModel: LLM,
          sessionStart: hist.sessionStart ? hist.sessionStart : new Date(),
          sessionEnd: new Date(),
        }),
        ...(logLabel === "interview" && {
          interview: conv,
          interviewModel: LLM,
          interviewStart: hist.interviewStart
            ? hist.interviewStart
            : new Date(),
          interviewEnd: new Date(),
        }),
      };

      setHistory(newHist);

      await fetch("/api/store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newHist: newHist }),
      });
    },
  });

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
