import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeReview as writeReviewApi } from "../services/apiReviews";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Review } from "../types";
import { AxiosError } from "axios";

export const useReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { playId } = useParams();

  const {
    mutate: writeReview,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({
      review,
      token,
    }: {
      review: Review;
      token: string;
    }) => {
      return await writeReviewApi(review, token);
    },
    onSuccess: () => {
      toast.success("Review made successfully");
      queryClient.invalidateQueries({ queryKey: [`reviews/${playId}`] });

      navigate("/", { replace: true });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      console.log("Error", err);

      if (err.message.includes("Network Error")) {
        toast.error("Unable to connect to server!");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  return { writeReview, error, isPending };
};
