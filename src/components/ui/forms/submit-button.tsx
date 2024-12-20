// This file implements a simple submit button to go with text fields.

import { FC } from "react"
import { Forward } from "lucide-react"

export const SubmitButton: FC<{
  disabled?: boolean
}> = ({ disabled=false }) => {
  return (
    <button
      type="submit"
      className="w-auto py-1 px-2 bg-zinc-950 border-black text-zinc-100 fill-white active:enabled:scale-95 hover:enabled:scale-105 border overflow-hidden relative rounded-xl disabled:opacity-70 shadow-md
      disabled:opacity-50"
      disabled={disabled}
    >
      <Forward size={16} />
    </button>
  )
}