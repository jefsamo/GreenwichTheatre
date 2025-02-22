import { useQuery } from "@tanstack/react-query";
import { getPlay } from "../services/apiPlays";
import { useParams } from "react-router-dom";

export const useGetPlay = () => {
  const { playId } = useParams();

  const { isLoading, data: play } = useQuery({
    queryKey: [`play/${playId}`],
    queryFn: () => getPlay(playId!),
  });

  return { isLoading, play };
};
