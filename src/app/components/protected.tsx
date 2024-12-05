"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "@/app/components/logo";
import Link from "next/link";

export const Protected = ({ children }: any) => {
    const [accessible, setAccessible] = useState(false);

    useEffect(() => {
        const fetchLockedStatus = async () => {
            const response = await fetch('api/password');
            const { unlocked } = await response.json();
            setAccessible(unlocked);
        }

        fetchLockedStatus();
    }, []);
    
    if (accessible) {
        return (<div>{children}</div>)
    } else return (
        <div
        className="
                absolute inset-0 min-h-[500px] flex items-center justify-center
                bg-zinc-100
                dark:bg-zinc-900"
        >
            <div className="relative flex flex-col gap-2 px-4">
                <Logo/>
                <div className="text-center
                    text-zinc-500
                    dark:text-zinc-400"
                >
                    The password you have provided is incorrect, or your session has expired. <a href="/" className="underline">Please return to the sign-in page.</a>
                </div>
            </div>
        </div>
    )
}