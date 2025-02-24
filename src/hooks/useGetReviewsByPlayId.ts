import { useQuery } from "@tanstack/react-query";
import { getReviewsByPlayId } from "../services/apiPlays";
import { useParams } from "react-router-dom";

export const useGetReviewsByPlayId = () => {
  const { playId } = useParams();

  const { isLoading, data: reviews } = useQuery({
    queryKey: [`reviews/${playId}`],
    queryFn: () => getReviewsByPlayId(playId!),
  });

  return { isLoading, reviews };
};
