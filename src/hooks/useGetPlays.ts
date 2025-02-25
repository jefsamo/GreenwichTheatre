import { useQuery } from "@tanstack/react-query";
import { getAllPlays } from "../services/apiPlays";

export const useGetPlays = () => {
  const {
    isLoading,
    data: plays,
    error,
  } = useQuery({
    queryKey: ["plays"],
    queryFn: () => getAllPlays(),
  });

  return { isLoading, plays, error };
};
