import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Space,
  Text,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import CustomerType from "../../components/CustomerType/CustomerType";
import { IconArrowRight } from "@tabler/icons-react";
import { useGetPlay } from "../../hooks/useGetPlay";

const Play = () => {
  const { playId } = useParams();
  const { play, isLoading } = useGetPlay();

  const navigate = useNavigate();
  if (isLoading) {
    return (
      <Center h="100dvh">
        <Loader />
      </Center>
    );
  }
  console.log(play);
  const { title } = play;

  return (
    <div className="container">
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <Image
            radius="md"
            src="https://images.pexels.com/photos/30653671/pexels-photo-30653671/free-photo-of-young-man-in-retro-asian-decor-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          {playId}
          <Space h="lg" />
          <Text size="lg" fw={700}>
            Reviews
          </Text>
          <Space h="lg" />
          <ReviewCard />
          <Space h="lg" />
          <Divider />
          <Space h="lg" />
          <ReviewCard />
          <Space h="lg" />
          <Divider />
          <Space h="lg" />
          <ReviewCard />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="lg" fw={700}>
            {play ? title : ""}
          </Text>
          <Space h="md" />
          <Text size="md">
            In a world where the sun hasn’t set in over a century, a lone
            scientist, Dr. Elias Voss, discovers a terrifying truth—night is
            coming back, and with it, an ancient force long thought to be a
            myth. As society crumbles under the fear of darkness, Elias must
            team up with a rebellious journalist and a convicted hacker to
            uncover the origins of the eternal daylight before time runs out.
            But when the first sunset in a hundred years finally arrives, they
            realize the darkness is not empty. Something has been waiting. And
            it’s hungry. A gripping sci-fi thriller filled with mystery,
            suspense, and a race against time, Shadow of the Horizon will leave
            you questioning what truly lies beyond the light.
          </Text>
          <Space h="md" />
          <Group>
            <Button size="md">Buy Ticket</Button>
          </Group>
          <CustomerType />
          <CustomerType />
          <CustomerType />
          <Button
            variant="light"
            rightSection={<IconArrowRight size={14} />}
            onClick={() => {
              navigate("/reservation");
            }}
          >
            Proceed
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Play;
