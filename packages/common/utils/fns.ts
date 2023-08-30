import { APP_URL } from "../constants/app";
import { addHours } from "date-fns";

export const isObjectId = (id: string): boolean => {
  // Regular expression that checks for 24 hex characters
  const checkForHexRegExp = /^[0-9a-fA-F]{24}$/;

  return id.length === 24 && checkForHexRegExp.test(id);
};

export const formatApiUrl = (url: string): string => APP_URL + url;

export const getCurrentDate = () => {
  const date = addHours(new Date(), 0);
  return date;
};
