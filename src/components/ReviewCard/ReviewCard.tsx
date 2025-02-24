import { Avatar, Group, Rating, Text } from "@mantine/core";
import { ReviewCardProp } from "../../types";

export const ReviewCard = ({ review }: ReviewCardProp) => {
  const { comment, rating } = review;
  return (
    <div>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text size="sm">Jacob Warnhalter</Text>
          <Text size="xs" c="dimmed">
            10 minutes ago
          </Text>

          <Rating defaultValue={rating} value={rating} />
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {comment}
      </Text>
    </div>
  );
};
