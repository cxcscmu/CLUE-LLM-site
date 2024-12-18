import { Message } from "ai";

export interface historyBlock {
  workerID?: string;
  logLabel: "session" | "interview";
  initial?: Message[];
  sent: string;
  recieved: string;
  LLM: string;
}

export interface conversation extends JSON {
  workerID: string;
  sessionModel: string;
  session: Message[];
  sessionStart?: Date;
  sessionEnd?: Date;
  interviewModel: string;
  interview: Message[];
  interviewStart?: Date;
  interviewEnd?: Date;
}

export type conversationProperty =
  | "workerID"
  | "sessionModel"
  | "session"
  | "sessionStart"
  | "sessionEnd"
  | "interviewModel"
  | "interview"
  | "interviewStart"
  | "interviewEnd";

export type conversationType = string | Message[] | Date;

type convUpdateString = {
  property: "workerID" | "sessionModel" | "interviewModel";
  value: string;
};
type convUpdateMessage = {
  property: "session" | "interview";
  value: Message[];
};
type convUpdateDate = {
  property: "sessionStart" | "sessionEnd" | "interviewStart" | "interviewEnd";
  value: Date;
};
export type convUpdate = convUpdateString | convUpdateMessage | convUpdateDate;
