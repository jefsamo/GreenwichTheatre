import { useMutation } from "@tanstack/react-query";
import { makeReservation as reservationApi } from "../services/apiReservations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ReservationType } from "../types";
import { useCartContext } from "../context/cartContext";
import { AxiosError } from "axios";

export const useReservation = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartContext();

  const {
    mutate: reservation,
    error,
    isPending,
  } = useMutation({
    mutationFn: async ({
      reservation,
      token,
    }: {
      reservation: ReservationType;
      token: string;
    }) => {
      return await reservationApi(reservation, token);
    },
    onSuccess: () => {
      toast.success("Reservation made successfully");
      clearCart();
      navigate("/", { replace: true });
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

  return { reservation, error, isPending };
};
