import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { markReservationAsPaid } from "../services/apiReservations";
import { MarkAsPaidType } from "../types";
import { AxiosError } from "axios";

export const useMarkReservationAsPaid = () => {
  const queryClient = useQueryClient();

  const {
    mutate: markAsPaid,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async ({ token, hasPaid, reservationId }: MarkAsPaidType) => {
      return markReservationAsPaid({ token, hasPaid, reservationId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Payment status updated successfully");
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

  return { markAsPaid, isPending, isSuccess };
};
