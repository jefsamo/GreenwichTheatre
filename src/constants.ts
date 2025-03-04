import { CartType, Seat, UserType } from "./types";

// export const BASE_URL = "https://localhost:7251/api";
export const BASE_URL =
  "https://greenwichcommunitytheatre20250304222028-bwf3d0bgg2c9bca3.canadacentral-01.azurewebsites.net/api";

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

export const calculateYear = (age: number): Date => {
  return new Date(new Date().setFullYear(new Date().getFullYear() - age));
};

export const filterSeat = (seats: Seat[] = [], seatLetter: "A" | "B" | "C") => {
  return seats
    ?.filter((seat: Seat) => seat.seatNumber.includes(seatLetter))
    .sort(
      (a, b) =>
        extractSeatNumber(a.seatNumber) - extractSeatNumber(b.seatNumber)
    );
};

export const extractSeatNumber = (seat: string): number => {
  return parseInt(seat.replace(/\D/g, ""), 10);
};
