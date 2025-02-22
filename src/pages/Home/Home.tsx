import { Center, Loader } from "@mantine/core";
import { PlayCard } from "../../components/PlayCard/PlayCard";
import { useGetPlays } from "../../hooks/useGetPlays";
import "./Home.css";

const Home = () => {
  const { plays = [], isLoading } = useGetPlays();
  if (isLoading) {
    return (
      <Center h="100dvh">
        <Loader />
      </Center>
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
