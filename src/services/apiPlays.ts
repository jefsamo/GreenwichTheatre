import axios from "axios";
import { BASE_URL } from "../constants";

export const getAllPlays = async () => {
  const res = await axios.get(`${BASE_URL}/play`);

  return res?.data?.data;
};
