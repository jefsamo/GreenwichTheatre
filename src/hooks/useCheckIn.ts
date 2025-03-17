import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkInCustomer } from "../services/apiReservations";
import { CheckInType } from "../types";

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  const {
    mutate: checkIn,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ token, ticketCode }: CheckInType) => {
      return checkInCustomer({ token, ticketCode });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checkin"] });
      toast.success("Check-in successful");
    },
    onError: (err: any) => {
      console.log("Error", err);
      toast.error(`${err?.response?.data.message}`);
    },
  });

  return { checkIn, isPending, isSuccess };
};
