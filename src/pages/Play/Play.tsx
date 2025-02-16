import { useParams } from "react-router-dom";

const Play = () => {
  const { playId } = useParams();
  return <div className="container">Details {playId}</div>;
};

export default Play;
