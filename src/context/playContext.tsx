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
  const [state] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");
  const { plays: playApi, isLoading, error } = useGetPlays();
  const [plays, setPlays] = useState<PlayCardType[]>(playApi);

  useEffect(() => {
    if (!searchTerm) {
      setPlays(playApi);
      return;
    }

    const filteredPlays = playApi.filter((play: PlayCardType) =>
      play.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPlays(filteredPlays);
  }, [playApi, searchTerm]);

  return (
    <PlayContext.Provider
      value={{
        ...state,
        searchTerm,
        setSearchTerm,
        plays,
        setPlays,
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
