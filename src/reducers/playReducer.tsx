import { InitialPlayStateType } from "../types";

type Action = {
  type: "FETCH_PLAYS" | "FILTER_PLAYS" | "SET_SEARCH_TERM" | "SET_PLAYS";
  payload?: any;
};

const playReducer = (state: InitialPlayStateType, action: Action) => {
  if (action.type === "FETCH_PLAYS") {
    return { ...state, plays: action.payload };
  }
  if (action.type === "SET_PLAYS") {
    return { ...state, plays: action.payload };
  }
  if (action.type === "FILTER_PLAYS") {
    // const { plays, searchTerm } = action.payload;
    // const filteredPlays = plays.filter((play: PlayCardType) =>
    //   play.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    return {
      ...state,
      plays: state.plays.filter((play) =>
        play.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }
  if (action.type === "SET_SEARCH_TERM") {
    return { ...state, searchTerm: action.payload };
  }
  throw new Error(`No matching ${action.type} action type`);
};
export default playReducer;
