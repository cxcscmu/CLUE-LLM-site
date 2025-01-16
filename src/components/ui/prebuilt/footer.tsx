import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="fixed bottom-5 text-center flex flex-col items-center text-xs text-zinc-700 gap-1 w-full pr-7 md:pr-0 md:w-2/3">
      {" "}
      {/* This sets the size of the text */}
      <div className="text-zinc-400 select-none">
        {" "}
        {/* this sets the text's color */}
        Answer generated by large language models. UI adapted from{" "}
        <a href="https://www.lepton.ai/" className="underline" target="_blank">
          Lepton
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/cxcscmu/RAGViz"
          className="underline"
          target="_blank"
        >
          RAGViz.
        </a>
      </div>
    </div>
  );
};
