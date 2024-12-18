// This file implements a wrapper that requires a specific cookie to be available in order to be accessible, and displays a return-to-login page if not. It can take an optional redirect object that changes what the return-to page displays as and directs you to.

"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import { Loader, Logo } from "@ui";
import { protectedPage, protectedPages, redirector } from "@interfaces";
import { useRouter } from "next/navigation";
// Adding to the pages that are protected needs to be done in the password router. These imports make it possible for this component to be generic, by guaranteeing that the cookieName is one of the keys of protectedPages.

export const Protected: FC<{
  children: ReactNode;
  redirect?: redirector;
  cookieName: protectedPage;
}> = ({ children, redirect, cookieName }) => {
  const [accessible, setAccessible] = useState<Boolean | undefined>(undefined);
  const [time, setTime] = useState(new Date());
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
      const response = await fetch("api/password");
      const pages: protectedPages = await response.json();

      setAccessible(pages[cookieName]);

      // This makes sure that the redirect gets changed if you have the password (while not changing it if you don't.)
      if (accessible && redirect) {
        setReportText(redirect.reportText);
        setNextPage(redirect.nextPage);
        setNextPageText(redirect.nextPageText);
        setRedirectCall(true);
      } else if (redirectCall && redirect && redirect.func) {
        if (redirect.autopush) {
          const URI = redirect.func();
          const URL = `${redirect.nextPage}?${URI}`;
          router.push(URL);
        } else {
          setRedirectCall(false);
          await redirect.func();
        }
      } else if (redirectCall && redirect && redirect.autopush) {
        router.push(redirect.nextPage);
      }

      setInterval(() => {
        setTime(new Date());
      }, 10000);
    };

    fetchLockedStatus();
  }, [time]);

  // TODO: Implement a loading spinner for while the thing is initially fething the cookies.
  if (accessible === undefined) {
    return <Loader />;
  } else if (accessible) {
    return <div> {children}</div>;
  } else
    return (
      <div
        className="
        absolute inset-0 min-h-[500px] flex items-center justify-center
        bg-zinc-100
        dark:bg-zinc-900"
      >
        <div className="relative flex flex-col gap-2 px-4">
          <Logo />
          <div
            className="text-center
            text-zinc-500
            dark:text-zinc-400"
          >
            {reportText} <br />
            <Link href={nextPage} className="underline">
              {nextPageText}
            </Link>
          </div>
        </div>
      </div>
    );
};
