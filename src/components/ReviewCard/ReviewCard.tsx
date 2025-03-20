import { Avatar, Group, Rating, Text } from "@mantine/core";
import { ReviewCardProp } from "../../types";
import { useGetUser } from "../../hooks/useGetUser";

export const ReviewCard = ({ review }: ReviewCardProp) => {
  const { comment, rating, userId, createdAt } = review;
  const { user: userDetails } = useGetUser(userId);
  return (
    <div>
      <Group>
        <Avatar
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text size="sm">
            {userDetails?.firstName} {userDetails?.lastName}
          </Text>
          <Text size="xs" c="dimmed">
            {/* 10 minutes ago */}
            {createdAt &&
              new Date(createdAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
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
