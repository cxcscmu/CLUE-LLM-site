// This file pairs the chatlog and chat-message components together, and provides the information they require to function. useChat() is defined here to allow them to share information properly.

"use client";
import { FC } from "react";
import { Chatlog } from "@/components/(logic)/chatlog";
import { ChatMessage } from "@/components/(logic)/chat-message";
import { Message, useChat } from "ai/react";

export const Conversation: FC<{
  LLM: string;
  placeholder?: string;
  system?: string;
  logLabel: "session" | "interview";
  initialMessages?: Message[];
}> = ({ LLM, placeholder="Type here...", system, logLabel, initialMessages }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    ...(initialMessages) && {initialMessages: initialMessages},
    onFinish: async (message) => {
      await fetch('/api/history', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logLabel: logLabel, sent: input, recieved: message.content,
          ...(initialMessages) && {initial: initialMessages}
        })
      });
    }
  });

  let modelVars = {
    model: LLM,
    ...(system) && {system: system}
  };

  return (
    <div>
      <Chatlog chatLog={messages}/>

      <ChatMessage handleSubmit={handleSubmit} modelVars={modelVars} input={input} handleInputChange={handleInputChange} placeholder={placeholder}/>
    </div>
  );
};
