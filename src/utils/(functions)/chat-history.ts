"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { conversation, conversationProperty, convUpdate } from "@/interfaces";

interface State {
  conv: conversation;
}

interface Action {
  setConv: (newConv: conversation) => void;
}

export const useStore = create(
  persist<State & Action>(
    (set) => ({
      conv: JSON.parse(
        JSON.stringify({
          workerID: "",
          sessionModel: "",
          session: [],
          interviewModel: "",
          interview: [],
        }),
      ) as conversation,
      setConv: (newConv: conversation) => set(() => ({ conv: newConv })),
    }),
    { name: "conversation-store" },
  ),
);

export const getHistory = (): conversation => {
  const { conv } = useStore.getState();
  return conv;
};

export const setHistory = (newHist: conversation): void => {
  useStore.setState({ conv: newHist });
};

export const updateHistory = (updates: convUpdate[]) => {
  try {
    const { conv } = useStore.getState();
    let newConv = { ...conv };
    newConv.interview = [...conv.interview];
    newConv.session = [...conv.session];

    updates.forEach((update) => {
      let property = update.property as conversationProperty;
      newConv[property] = update.value as any;
    });

    setHistory(newConv);
  } catch (e) {
    console.log(e);
  }
};
