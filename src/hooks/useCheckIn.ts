import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { checkInCustomer } from "../services/apiReservations";
import { CheckInType } from "../types";
import { AxiosError } from "axios";

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
    onError: (err: AxiosError<{ message: string }>) => {
      console.log("Error", err);

      if (err.message.includes("Network Error")) {
        toast.error("Unable to connect to server!");
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  return { checkIn, isPending, isSuccess };
};
