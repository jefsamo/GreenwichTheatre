import { useQuery } from "@tanstack/react-query";
import { getAllPlays } from "../services/apiPlays";

export const useGetPlays = () => {
  const { isLoading, data: plays } = useQuery({
    queryKey: ["plays"],
    queryFn: () => getAllPlays(),
  });

  return { isLoading, plays };
};
