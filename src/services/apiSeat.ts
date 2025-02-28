import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllSeats = async () => {
  const res = await axios.get(`${BASE_URL}/seat`);

  return res?.data?.data;
};
