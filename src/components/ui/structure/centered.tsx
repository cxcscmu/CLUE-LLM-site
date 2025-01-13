import { FC, ReactNode } from "react"

export const Centered: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div
      className="
        absolute inset-0 min-h-[500px] flex items-center justify-center
        bg-zinc-100
        dark:bg-zinc-900"
    >
      { children }
    </div>
  )
}