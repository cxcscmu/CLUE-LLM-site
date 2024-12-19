// This file implements a simple text input, along with an option to display or not display a text submit button.

"use client";

import { FC } from "react";

export const TextInput: FC<{
    id: string;
    value: string;
    onChange: React.ChangeEventHandler;
    placeholder?: string;
}> = ({ id, value, onChange, placeholder }) => {
    
    return <input 
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus
      className="px-2 pr-6 w-full rounded-md flex-1 outline-none bg-white"
    />
}