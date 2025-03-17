import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { RegisterType } from "../types";
import { AxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: register, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
      lastName,
      confirmPassword,
      phoneNumber,
      firstName,
    }: RegisterType) => {
      const newUser = await registerApi({
        email,
        password,
        lastName,
        confirmPassword,
        phoneNumber,
        firstName,
      });
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    },
    onSuccess: (user: unknown) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Registration successful");
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

  return { register, isPending };
};
