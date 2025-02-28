import axios from "axios";
import { ReservationType } from "../types";
import { BASE_URL } from "../constants";

export const makeReservation = async (
  reservation: ReservationType,
  token: string
) => {
  const res = await axios.post(`${BASE_URL}/reservation`, reservation, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getAllTickets = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/reservation/tickets`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
