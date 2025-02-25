import { Center, Loader, Text } from "@mantine/core";
import { PlayCard } from "../../components/PlayCard/PlayCard";
import { useGetPlays } from "../../hooks/useGetPlays";
import "./Home.css";

const Home = () => {
  const { plays = [], isLoading, error } = useGetPlays();
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
          {plays?.map((play: any, i: number) => {
            return <PlayCard key={i} play={play} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
