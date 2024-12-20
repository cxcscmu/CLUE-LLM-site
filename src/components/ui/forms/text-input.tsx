// This file implements a simple text input, along with an option to display or not display a text submit button.

"use client";

import { FC } from "react";

export const TextInput: FC<{
  id: string;
  value: string;
  onChange: React.ChangeEventHandler;
  placeholder?: string;
  disabled?: boolean;
  disabledPlaceholder?: string;
}> = ({
  id,
  value,
  onChange,
  placeholder = "Type here...",
  disabled = false,
  disabledPlaceholder = "",
}) => {
  return (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={disabled ? disabledPlaceholder : placeholder}
      autoFocus
      disabled={disabled}
      className="
        px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white
        disabled:opacity-50 disabled:select-none
      "
    />
  );
};
