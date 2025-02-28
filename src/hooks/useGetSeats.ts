import { useQuery } from "@tanstack/react-query";
import { getAllSeats } from "../services/apiSeat";

export const useGetSeats = () => {
  const {
    isLoading,
    data: seats,
    error,
  } = useQuery({
    queryKey: ["seats"],
    queryFn: () => getAllSeats(),
  });

  return { isLoading, seats, error };
};
