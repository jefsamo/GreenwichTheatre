import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { markReservationAsPaid } from "../services/apiReservations";
import { MarkAsPaidType } from "../types";

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
    onError: (err) => {
      console.log("Error", err);
      toast.error("Something went wrong! Try again later.");
    },
  });

  return { markAsPaid, isPending, isSuccess };
};
