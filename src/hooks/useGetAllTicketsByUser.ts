import { useQuery } from "@tanstack/react-query";
import { getAllTicketsByReservationId } from "../services/apiReservations";

import { getCurrentUser } from "../constants";

export const useGetAllTicketsByUser = () => {
  const user = getCurrentUser();
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets-user"],
    queryFn: () => getAllTicketsByReservationId(user?.token, ""),
  });

  return { isLoading, tickets, error };
};
