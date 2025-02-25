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
import { IconArrowRight, IconShoppingBagCheck } from "@tabler/icons-react";
import { useGetPlay } from "../../hooks/useGetPlay";
import { useEffect, useState } from "react";
import { useGetReviewsByPlayId } from "../../hooks/useGetReviewsByPlayId";
import { PlayCardType, Review } from "../../types";
import { useCartContext } from "../../context/cartContext";
import Customer from "../../components/CustomerType/Customer";

const Play = () => {
  const { playId } = useParams();
  const { play, isLoading } = useGetPlay();
  const { reviews, isLoading: isReviewsLoading } = useGetReviewsByPlayId();
  const navigate = useNavigate();
  const title = play?.title;
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [oldAgePensioner, setOldAgePensioner] = useState(0);
  const {
    showAddToCart,
    setShowAddToCart,
    addToCart,
    cart,
    // adult,
    // setAdult,
    // childrens,
    // setChildrens,
    // oldAgePensioner,
    // setOldAgePensioner,
  } = useCartContext();

  const customerType = [
    { type: "Adult", value: adult, setValue: setAdult },
    { type: "Children", value: children, setValue: setChildren },
    { type: "OAP", value: oldAgePensioner, setValue: setOldAgePensioner },
  ];

  const playExistInCart = cart.some((c) => c.play.id === play?.id);

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
            <Button
              size="md"
              onClick={() => {
                setShowAddToCart((showCart) => !showCart);
              }}
            >
              Buy Ticket
            </Button>
          </Group>
          {showAddToCart && (
            <>
              {customerType.map((customer, i) => {
                return (
                  <Customer
                    key={i}
                    customer={customer}
                    setValue={customer.setValue}
                  />
                );
              })}
              <Button
                variant="light"
                rightSection={<IconShoppingBagCheck size={14} />}
                onClick={() => {
                  addToCart({
                    totalAdult: adult,
                    totalChildren: children,
                    totalOldAgePensioner: oldAgePensioner,
                    play,
                  });
                }}
                disabled={
                  !playExistInCart
                    ? !(adult || children || oldAgePensioner)
                    : false
                }
              >
                Add to cart
              </Button>
              <Space h="md" />
              <Button
                variant="light"
                rightSection={<IconArrowRight size={14} />}
                onClick={() => {
                  navigate("/reservation");
                }}
              >
                Proceed
              </Button>
            </>
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Play;
