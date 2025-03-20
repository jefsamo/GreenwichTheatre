import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

export const useGetUser = (id: string = "") => {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => getUser(id),
  });

  return { isLoading, user, error };
};
