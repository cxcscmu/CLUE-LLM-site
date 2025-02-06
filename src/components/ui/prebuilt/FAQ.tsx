import { FC } from "react";
import Popup from "reactjs-popup";

import { FunctionButton } from "@ui";
import { ArrowBigRight, ArrowBigRightDash } from "lucide-react";

export const FAQ: FC<{}> = () => {
  const toggle = (
    <div className="fixed top-5 right-5">
      <FunctionButton labeled={false}>FAQ</FunctionButton>
    </div>
  );

  return (
    <Popup
      trigger={toggle}
      modal
      overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white dark:bg-zinc-800 w-[50vw] h-[65vh] object-center opacity-95 rounded-lg p-5 shadow-lg overflow-scroll">
        <div className="relative flex flex-col gap-2 px-5 py-3 text-black dark:text-zinc-100 ">
          {/* <Logo /> */}
          <strong className="text-3xl">Instructions</strong>
          <p className="mt-3">
            CLUE - which stands for Chatbot-Led User Experience interviews - is
            a research project being conducted at CMU. For this project, we ask
            that participants engage with a chatbot for 10-15 minutes, then
            participate in a follow-up survey about the initial conversation.
          </p>
          <p>
            To begin, {"you'll"} first need to login using your Mechanical Turk
            Worker ID and the unique one-time password provided as part of the
            task. Once you do so, press enter or the{" "}
            <ArrowBigRight className="inline" /> button, then wait a moment to
            be automatically redirected to the initial chat.
          </p>
          <p>
            In the initial chat page, you will send the first message. If your
            task gave you a specific topic to chat about, please talk to the bot
            about that - otherwise, choose your own topic. The chat page will
            have a timer at the bottom of your chat, counting 10 minutes - after
            this time is over, you can end the conversation by clicking the{" "}
            <ArrowBigRightDash className="inline" /> button. If you {"don't"}{" "}
            end the conversation early, it will automatically redirect you to
            the next page after 15 minutes.
          </p>
          <p>
            In the final page of the project, you will speak with a virtual
            interviewer for 10-15 minutes. Here, the interviewer will send the
            first message, and should be leading the conversation. Once again,
            there is a timer counting 10 minutes - after the interviewer says
            that the interview is concluded, you can hit the{" "}
            <ArrowBigRightDash className="inline" /> button to conclude the
            interview. If you are told that the interview is over before the
            button is available, wait until it is.
          </p>
          <p>
            <strong>
              PLEASE DO NOT CLOSE THE WINDOW UNTIL THE CHAT HAS BEEN ENDED
              BY CLICKING THE BUTTON.
            </strong>
          </p>
        </div>
      </div>
    </Popup>
  );
};
