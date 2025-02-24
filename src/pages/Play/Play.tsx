import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Skeleton,
  Space,
  Text,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import CustomerType from "../../components/CustomerType/CustomerType";
import { IconArrowRight } from "@tabler/icons-react";
import { useGetPlay } from "../../hooks/useGetPlay";
import { useEffect } from "react";
import { useGetReviewsByPlayId } from "../../hooks/useGetReviewsByPlayId";
import { PlayCardType, Review } from "../../types";

const Play = () => {
  const { playId } = useParams();
  const { play, isLoading } = useGetPlay();
  const { reviews, isLoading: isReviewsLoading } = useGetReviewsByPlayId();
  const navigate = useNavigate();
  const title = play?.title;

  useEffect(() => {
    if (title) {
      document.title = `Play | ${title}`;
    }
  }, [title]);

  if (isLoading) {
    return (
      <Center h="100dvh">
        <Loader />
      </Center>
    );
  }
  const { description, mainImageUrl } = play as PlayCardType;

  return (
    <div className="container">
      <Grid gutter="xl">
        <Grid.Col span={6}>
          <Image radius="md" src={mainImageUrl} />
          {playId}
          <Space h="lg" />
          <Text size="lg" fw={700}>
            Reviews
          </Text>
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review: Review, i: number) => {
              return (
                <>
                  <Space h="lg" />
                  <ReviewCard key={i} review={review} />
                  <Space h="lg" />
                  <Divider />
                </>
              );
            })}

          {isReviewsLoading && (
            <>
              <Skeleton height={50} circle mb="xl" />
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} width="70%" radius="xl" />
            </>
          )}

          {reviews && reviews?.length === 0 && (
            <Text size="md">No reviews for this play</Text>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="lg" fw={700}>
            {title}
          </Text>
          <Space h="md" />
          <Text size="md">{description}</Text>
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
