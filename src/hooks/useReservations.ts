import { useQuery } from "@tanstack/react-query";
import { getAllReservations } from "../services/apiReservations";

import { getCurrentUser } from "../constants";

export const useReservations = () => {
  const user = getCurrentUser();
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getAllReservations(user?.token),
  });

  return { isLoading, reservations, error };
};
