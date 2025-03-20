import axios from "axios";
import { BASE_URL } from "../constants";
import { LoginType, RegisterType, Response } from "../types";

export const login = async ({
  email,
  password,
}: LoginType): Promise<Response> => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  return res.data.data;
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  confirmPassword,
  phoneNumber,
}: RegisterType): Promise<Response> => {
  const res = await axios.post(`${BASE_URL}/auth/register`, {
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
    phoneNumber,
  });

  return res.data.data;
};

export const getUser = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/auth/user/${id}`);

  return res?.data?.data;
};
