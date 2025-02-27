import axios from "axios";
import { BASE_URL } from "../constants";
import { Review } from "../types";

export const writeReview = async (
  { comment, rating, playId }: Review,
  token: string
) => {
  const res = await axios.post(
    `${BASE_URL}/review`,
    { comment, rating, playId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.data;
};

export const getReviewsByPlayId = async (playId: string) => {
  const res = await axios.get(`${BASE_URL}/review/${playId}/reviews`);

  return res?.data?.data;
};
