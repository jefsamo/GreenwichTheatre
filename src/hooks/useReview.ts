import { useMutation, useQueryClient } from "@tanstack/react-query";
import { writeReview as writeReviewApi } from "../services/apiReviews";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Review } from "../types";

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
    onError: (err) => {
      console.log("Error", err);
      toast.error("Something went wrong");
    },
  });

  return { writeReview, error, isPending };
};
