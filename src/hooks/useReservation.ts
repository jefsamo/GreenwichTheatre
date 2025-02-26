import { useMutation } from "@tanstack/react-query";
import { makeReservation as reservationApi } from "../services/apiReservations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ReservationType } from "../types";
import { useCartContext } from "../context/cartContext";

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
    onError: (err) => {
      console.log("Error", err);
      toast.error("Something went wrong");
    },
  });

  return { reservation, error, isPending };
};
