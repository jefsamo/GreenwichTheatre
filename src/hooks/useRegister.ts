import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register as registerApi } from "../services/apiAuth";
import { toast } from "react-hot-toast";
import { RegisterType } from "../types";

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
    onError: (err) => {
      console.log("Error", err);
      toast.error("Something went wrong! Try again later.");
    },
  });

  return { register, isPending };
};
