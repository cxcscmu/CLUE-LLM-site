import { Loader2 } from "lucide-react";
import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div
      className="
        absolute inset-0 min-h-[500px] flex items-center justify-center
        bg-zinc-100
        dark:bg-zinc-900"
    >
      <div className="relative flex flex-col gap-2 px-4 text-zinc-800 dark:text-zinc-300">
        <Loader2 className="self-center animate-spin" />
        Checking password...
      </div>
    </div>
  );
};
