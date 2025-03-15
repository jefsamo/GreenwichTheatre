import { useQuery } from "@tanstack/react-query";
import { getPlay } from "../services/apiPlays";
import { useParams } from "react-router-dom";

export const useGetPlayOther = (id: string = "") => {
  const { playId } = useParams();
  const actualId = id ?? playId; // Use id if provided, otherwise fallback to playId

  const {
    isLoading,
    data: play,
    error,
  } = useQuery({
    queryKey: [`play-${id ?? playId}`],
    queryFn: () => getPlay(id! ?? playId),
    enabled: !!actualId, // Prevent query execution if no ID is available
  });

  return { isLoading, play, error };
};
