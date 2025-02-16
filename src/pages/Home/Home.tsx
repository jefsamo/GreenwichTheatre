import { Space } from "@mantine/core";
import { Header } from "./Header";
import { PlayCard } from "../../components/PlayCard/PlayCard";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <Space w="md" />
      <div className="container">
        <div className="card">
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
