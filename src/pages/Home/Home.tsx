import { Center, Loader, Text } from "@mantine/core";
import { PlayCard } from "../../components/PlayCard/PlayCard";
import "./Home.css";
import { PlayCardType } from "../../types";
import { usePlayContext } from "../../context/playContext";

const Home = () => {
  const { plays = [], isLoading, error } = usePlayContext();

  if (isLoading) {
    return (
      <Center h="100dvh">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <div className="container">
        <Text fz="lg" c="red" lineClamp={4}>
          Can't connect to server right now!
        </Text>
      </div>
    );
  }
  return (
    <div>
      <div className="container">
        <div className="my-card">
          {plays?.map((play: PlayCardType) => {
            return <PlayCard key={play.id} play={play} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
