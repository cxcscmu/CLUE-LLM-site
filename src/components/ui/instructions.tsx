import { ReactNode, FC } from "react";

export const Instructions: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="text-center font-medium text-l text-zinc-600 relative text-nowrap dark:text-zinc-400">
      {children}
    </div>
  );
};
