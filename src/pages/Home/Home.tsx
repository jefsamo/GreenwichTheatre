import { Center, Loader, Text } from "@mantine/core";
import { PlayCard } from "../../components/PlayCard/PlayCard";
// import { useGetPlays } from "../../hooks/useGetPlays";
import "./Home.css";
// import { usePlayContext } from "../../context/playContext";
import { useGetPlays } from "../../hooks/useGetPlays";

const Home = () => {
  const { plays = [], isLoading, error } = useGetPlays();
  // let filtredPlays = [];

  // const { plays = [], isLoading, error } = usePlayContext();
  // console.log(plays);
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
