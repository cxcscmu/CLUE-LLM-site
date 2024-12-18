export interface redirector {
  reportText: string;
  nextPage: string;
  nextPageText: string;
  func?: Function;
  autopush?: Boolean;
}

export interface protectedPages {
  chatUnlocked: boolean;
  interviewUnlocked: boolean;
}

export type protectedPage = "chatUnlocked" | "interviewUnlocked";
