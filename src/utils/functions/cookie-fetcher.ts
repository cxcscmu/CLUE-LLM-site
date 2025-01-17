import {
  passwordProtectionCookie,
  passwordProtectionStatus,
} from "@interfaces";

export const cookieStatus = async (cookieName: passwordProtectionCookie) => {
  const response = await fetch("api/password");
  const cookies = (await response.json()) as passwordProtectionStatus;
  const cookieValue = cookies[cookieName];

  if (cookieValue) {
    return Number(cookieValue);
  } else {
    return false;
  }
};
