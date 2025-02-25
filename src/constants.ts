import { CartType, UserType } from "./types";

export const BASE_URL = "https://localhost:7251/api";

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")!) as UserType;
};

export const truncateWords = (input: string, wordLimit: number): string => {
  const words = input.split(" ");

  if (words.length <= wordLimit) {
    return input;
  }

  const truncated = words.slice(0, wordLimit).join(" ") + "...";
  return truncated;
};

export const getLocalStorageCart: () => [] | CartType[] = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};
