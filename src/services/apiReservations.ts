import axios from "axios";
import { MarkAsPaidType, ReservationType } from "../types";
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

export const getAllReservations = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/reservation/reservations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getAllReservationsByUser = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/reservation/reservations-user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const getAllTicketsByReservationId = async (
  token: string,
  reservationId: string
) => {
  const res = await axios.get(
    `${BASE_URL}/reservation/tickets-user/${reservationId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};

export const markReservationAsPaid = async ({
  token,
  reservationId,
  hasPaid,
}: MarkAsPaidType) => {
  const res = await axios.post(
    `${BASE_URL}/reservation/${reservationId}/update`,
    { hasPaid },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data?.data || res.data;
};
