export interface redirector {
  reportText: string;
  nextPage: string;
  nextPageText: string;
  func?: Function;
  autopush?: Boolean;
}

export interface passwordProtectionStatus {
  chatUnlocked: boolean;
  interviewUnlocked: boolean;
}

export type passwordProtectionCookie = "chatUnlocked" | "interviewUnlocked";

type cookieOperation = "set" | "delete";

export interface cookieCommand {
  cookieName: string;
  cookieOperation: cookieOperation;
  cookieTime?: number;
  cookieValue?: string;
}
