import { FC, ReactNode } from "react"

export const Stacked: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative flex flex-col gap-2 px-4">
      { children }
    </div>
  )
}