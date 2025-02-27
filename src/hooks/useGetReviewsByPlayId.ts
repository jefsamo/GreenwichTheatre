import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReviewsByPlayId } from "../services/apiReviews";

export const useGetReviewsByPlayId = () => {
  const { playId } = useParams();

  const { isLoading, data: reviews } = useQuery({
    queryKey: [`reviews/${playId}`],
    queryFn: () => getReviewsByPlayId(playId!),
  });

  return { isLoading, reviews };
};
