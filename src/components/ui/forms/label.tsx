//This file is a simple label collection for its children.

"use client";
import { ReactNode, FC } from "react";

export const Label: FC<{
  children: ReactNode;
  label: string;
}> = ({ children }) => {
  return (
    <label
      className="relative bg-white flex items-center justify-center border py-2 px-2 rounded-lg gap-2 my-4 focus-within:border-zinc-300 shadow-md min-w-96"
      htmlFor="chat-bar"
    >
      {children}
    </label>
  );
};
