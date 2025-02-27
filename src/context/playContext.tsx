import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { InitialPlayStateType, PlayCardType } from "../types";
import { useGetPlays } from "../hooks/useGetPlays";
import reducer from "../reducers/playReducer";

type PlayProviderProp = {
  children: ReactNode;
};

const initialState: InitialPlayStateType = {
  plays: [],
  searchTerm: "",
  setSearchTerm: () => {},
  setPlays: () => {},
  filterPlays: () => {},
  isLoading: false,
  error: new Error(""),
};

const PlayContext = createContext<InitialPlayStateType>(initialState);

export const PlayProvider = ({ children }: PlayProviderProp) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const [searchTerm, setSearchTerm] = useState("");
  const { plays: playApi, isLoading, error } = useGetPlays();
  console.log(playApi);
  const [plays, setPlays] = useState<PlayCardType[]>(playApi);

  useEffect(() => {
    if (playApi && playApi.length > 0) {
      dispatch({ type: "FETCH_PLAYS", payload: playApi });
    }
  }, [playApi]);

  const setSearchTerm = (searchTerm: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
  };

  const filterPlays = () => {
    dispatch({ type: "FILTER_PLAYS" });
  };

  return (
    <PlayContext.Provider
      value={{
        ...state,
        // searchTerm,
        setSearchTerm,
        plays,
        setPlays,
        filterPlays,
        isLoading,
        error,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = () => {
  const context = useContext(PlayContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};
