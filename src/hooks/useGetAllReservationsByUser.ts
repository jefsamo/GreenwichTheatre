import { useQuery } from "@tanstack/react-query";
import { getAllReservationsByUser } from "../services/apiReservations";

import { getCurrentUser } from "../constants";

export const useGetAllReservationsByUser = () => {
  const user = getCurrentUser();
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations-user"],
    queryFn: () => getAllReservationsByUser(user?.token),
  });

  return { isLoading, reservations, error };
};
