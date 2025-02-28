import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "../services/apiReservations";
import { getCurrentUser } from "../constants";

export const useGetTickets = () => {
  const user = getCurrentUser();
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getAllTickets(user?.token),
  });

  return { isLoading, tickets, error };
};
