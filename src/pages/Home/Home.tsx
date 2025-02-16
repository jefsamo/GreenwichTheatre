import { PlayCard } from "../../components/PlayCard/PlayCard";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="container">
        <div className="my-card">
          <PlayCard />
          <PlayCard />
          <PlayCard />
          <PlayCard />
          <PlayCard />
          <PlayCard />
          <PlayCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
