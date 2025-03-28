// This file implements a wrapper that requires a specific cookie to be available in order to be accessible, and displays a return-to-login page if not. It can take an optional redirect object that changes what the return-to page displays as and directs you to.

"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

import { Loader, Logo } from "@ui";
import { passwordProtectionCookie, redirector } from "@interfaces";
import { useRouter } from "next/navigation";
import { cookieStatus } from "@utils";
// Adding to the pages that are protected needs to be done in the password router. These imports make it possible for this component to be generic, by guaranteeing that the cookieName is one of the keys of passwordProtectionStatus.

export const Protected: FC<{
  children: ReactNode;
  redirect?: redirector;
  cookieName: passwordProtectionCookie;
}> = ({ children, redirect, cookieName }) => {
  const [accessible, setAccessible] = useState<Boolean | undefined>(undefined);
  const router = useRouter();

  const [reportText, setReportText] = useState(
    "You have not provided a password.",
  );
  const [nextPage, setNextPage] = useState("/");
  const [nextPageText, setNextPageText] = useState(
    "Please return to the sign-in page.",
  );

  const [redirectCall, setRedirectCall] = useState(false);

  useEffect(() => {
    const fetchLockedStatus = async () => {
      const cookie = await cookieStatus(cookieName);
      setAccessible(Boolean(cookie));

      // This makes sure that the redirect gets changed if you have the password (while not changing it if you don't.)
      if (accessible && redirect) {
        setReportText(redirect.reportText);
        setNextPage(redirect.nextPage);
        setNextPageText(redirect.nextPageText);
        setRedirectCall(true);
      } else if (redirectCall && redirect) {
        if (redirect.func) {
          setRedirectCall(false);
          await redirect.func();
        }
        if (redirect.autopush) {
          router.push(redirect.nextPage);
        }
      }
    };

    // fetchLockedStatus();
    const intervalID = setInterval(() => {
      fetchLockedStatus();
    }, 1000);

    return () => clearInterval(intervalID);
  });

  if (accessible === undefined) {
    return <Loader displayText="Loading..." />;
  } else if (accessible) {
    return <div> {children} </div>;
  } else
    return (
      <div
        className="
        absolute inset-0 min-h-[500px] flex items-center justify-center
        bg-zinc-100
        dark:bg-zinc-900"
      >
        <Logo />
        <div className="relative flex flex-col gap-2 px-4">
          <div
            className="text-center
            text-zinc-500
            dark:text-zinc-400"
          >
            <ReactMarkdown>{reportText}</ReactMarkdown>
            <br />
            <Link href={nextPage} className="underline">
              {nextPageText}
            </Link>
          </div>
        </div>
      </div>
    );
};
