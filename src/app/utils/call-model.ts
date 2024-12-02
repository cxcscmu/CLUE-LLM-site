import { OpenAI } from "openai";
import { Message } from "@/app/interfaces/message";
import { LLM } from "@/app/interfaces/llm";

// const clientOpenAI = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

async function chatOpenAI(chatLog: any, setChatLog: Function) {
  let returnMessage;
  // try {
  //     await fetch('/api/openai', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({chatLog})
  //     })
  // } catch (error) {
  //     console.error(error);
  //     returnMessage = "An error occured."
  // }

  // const response = await clientOpenAI.chat.completions.create({
  //   messages: chatLog,
  //   model: "gpt-4o",
  // });

  // if (response) {
  //   returnMessage = response.choices[0].message.content;
  // } else {
  //   returnMessage = "An error occured.";
  // }

  // setChatLog([
  //   ...chatLog,
  //   {
  //     role: "assistant",
  //     content: returnMessage,
  //   },
  // ]);
}

export function callModel(
  LLM: string,
  chatLog: Message[],
  setChatLog: Function,
  message: string,
  setReturnMessage: Function,
) {
  const history = [
    ...chatLog,
    {
      role: "user",
      content: message,
    },
  ];

  switch (LLM) {
    case "gpt-4o":
      setReturnMessage("Waiting for response...");
      chatOpenAI(history, setChatLog);
      // try {
      //     fetch('/api/openai', {
      //         method: 'POST',
      //         headers: {
      //             'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({history, setChatLog})
      //     })
      // } catch (error) {
      //     console.error(error);
      //     setChatLog(
      //         [
      //             ...history,
      //             {
      //                 "role": "error",
      //                 "content": "An error occured while trying to connect to the model."
      //             }
      //         ]
      //     )
      // }
      break;
    default:
      setReturnMessage(`${LLM} has not yet been implemented.`);
    // setChatLog(
    //     [
    //         ...chatLog,
    //         {
    //             "role": "user",
    //             "content": message
    //         },
    //         {
    //             "role": "assistant",
    //             "content": returnMessage
    //         }
    //     ]
    // )
  }
}

export const implementedModels: LLM[] = [
  {
    value: "gpt-4o",
    label: "OpenAI: ChatGPT",
  },
  {
    value: "gpt-4o-mini",
    label: "OpenAI: ChatGPT Mini",
  },
];
