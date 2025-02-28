import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Rating,
  Skeleton,
  Space,
  Text,
  Textarea,
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
import { getCurrentUser } from "../../constants";
import { useReview } from "../../hooks/useReview";

const Play = () => {
  const navigate = useNavigate();
  const { playId } = useParams();
  const { play, isLoading, error } = useGetPlay();
  const { writeReview, isPending } = useReview();
  const { reviews, isLoading: isReviewsLoading } = useGetReviewsByPlayId();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [adult, setAdult] = useState(0);
  const [children, setChildren] = useState(0);
  const [oldAgePensioner, setOldAgePensioner] = useState(0);
  const { showAddToCart, setShowAddToCart, addToCart, cart } = useCartContext();

  const title = play?.title;
  const user = getCurrentUser();

  const isOperator = user?.role === "Operator";

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

  if (error) {
    return (
      <div className="container">
        <Text fz="lg" c="red" lineClamp={4}>
          Can't connect to server right now!
        </Text>
      </div>
    );
  }
  // 25% for oap and chidlren discount = 0.25
  const twentyFivePercentDiscount = 0.25;
  const { description, mainImageUrl, price, timeOfPlay } = play as PlayCardType;
  const adultPrice = price;
  const childrenAndOapPrice = price - price * twentyFivePercentDiscount;

  const totalPrice =
    adult * adultPrice +
    children * childrenAndOapPrice +
    oldAgePensioner * childrenAndOapPrice;

  const scheduledEvent = new Date(timeOfPlay);
  const eventDay = scheduledEvent.getDay();

  const oneHourMilliseconds = 60 * 60 * 1000;
  const currentTime = new Date();
  const oneHourBeforeEvent = new Date(
    scheduledEvent.getTime() - oneHourMilliseconds
  );

  const tenPercentDiscount = 0.1;
  const isLessThanOneHourBeforeEvent =
    currentTime >= oneHourBeforeEvent && currentTime < scheduledEvent;

  // Checks if play is starting in an hour time for 10% discount
  const calculateTotalPriceAfterTimeDiscount = !isLessThanOneHourBeforeEvent
    ? totalPrice
    : totalPrice - totalPrice * tenPercentDiscount;

  // Checks if play is within Monday - Thursday to get 10% discount
  const isMondayToThursday = eventDay >= 1 && eventDay <= 4;
  const eventMondayThursdayPrice = isMondayToThursday
    ? calculateTotalPriceAfterTimeDiscount -
      calculateTotalPriceAfterTimeDiscount * tenPercentDiscount
    : calculateTotalPriceAfterTimeDiscount;

  const review: Review = {
    comment,
    rating,
    playId,
  };

  const handleReview = () => {
    writeReview({ review, token: user.token });
  };

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

          {!isOperator && (
            <>
              <Text size="lg" fw={700}>
                Write Review
              </Text>
              <Rating defaultValue={1} value={rating} onChange={setRating} />

              <Space h="md" />
              <Textarea
                placeholder="Write a review..."
                value={comment}
                onChange={(event) => setComment(event.currentTarget.value)}
              />
              <Space h="md" />
              <Button
                variant="light"
                loading={isPending}
                onClick={() => {
                  handleReview();
                }}
              >
                Submit
              </Button>
            </>
          )}
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="lg" fw={700}>
            {title}
          </Text>
          <Space h="md" />
          <Text size="md">{description}</Text>
          <Text size="md">Price: {price}</Text>
          <Text size="md">
            OAPs & Children Price: {childrenAndOapPrice.toFixed(2)}
          </Text>
          <Text size="md">
            Total price: {eventMondayThursdayPrice.toFixed(2)}
          </Text>
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
                    totalPrice: eventMondayThursdayPrice,
                  });
                }}
                disabled={
                  cart.length === 1 ||
                  (!playExistInCart && !(adult || children || oldAgePensioner))
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
