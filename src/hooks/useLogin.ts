import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { LoginType, UserType } from "../types";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }: LoginType) => {
      const user = await loginApi({ email, password });
      const expirationTime = Date.now() + 10 * 60 * 1000;
      localStorage.setItem("user", JSON.stringify({ ...user, expirationTime }));
      return user;
    },
    onSuccess: (user: unknown) => {
      queryClient.setQueryData(["user"], user as UserType);
      toast.success("Login successful");
      navigate("/", { replace: true });
      setTimeout(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        if (
          storedUser.expirationTime &&
          Date.now() >= storedUser.expirationTime
        ) {
          localStorage.removeItem("user");
          window.location.reload();
          toast.dismiss("Session expired. Please log in again.");
        }
      }, 10 * 60 * 1000);
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

  return { login, isPending, error };
};
