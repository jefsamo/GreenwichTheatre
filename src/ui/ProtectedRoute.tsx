import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../constants";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  //   const currentUser = JSON.parse(localStorage.getItem("user")!);
  const currentUser = getCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [navigate, currentUser]);

  return children;
};

export default ProtectedRoute;
