import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { LoginType, UserType } from "../types";

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
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    },
    onSuccess: (user: unknown) => {
      queryClient.setQueryData(["user"], user as UserType);
      toast.success("Login successful");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
      if (err instanceof Error && err.message.includes("Network Error")) {
        toast.error("Unable to connect to server!");
      } else {
        toast.error("Incorrect email or password");
      }
    },
  });

  return { login, isPending, error };
};
