import { Card, Image, Text } from "@mantine/core";
import { CartType } from "../../types";
import { truncateWords } from "../../constants";

type CartCardProps = {
  cart: CartType;
};
const CartCard = ({ cart }: CartCardProps) => {
  console.log(cart);
  const { play } = cart;
  const { imageUrl, title, description } = play;
  return (
    <div>
      <Card
        shadow="sm"
        padding="xl"
        component="a"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
      >
        <Card.Section>
          <Image src={imageUrl} h={160} alt="No way!" />
        </Card.Section>

        <Text fw={500} size="lg" mt="md">
          {title}
        </Text>

        <Text mt="xs" c="dimmed" size="sm">
          {truncateWords(description, 20)}
        </Text>
      </Card>
    </div>
  );
};

export default CartCard;
