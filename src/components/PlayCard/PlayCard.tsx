import { Badge, Card, Image, Text } from "@mantine/core";
import classes from "./PlayCard.module.css";
import { Link } from "react-router-dom";
import { PlayCardProp } from "../../types";
import { truncateWords } from "../../constants";

export function PlayCard({ play }: PlayCardProp) {
  const { id, description, availableSeats } = play;

  const isSoldOut = availableSeats === 0;

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link to={`play/${id}`}>
          <Image src={`${play.imageUrl}`} height={180} />
        </Link>
      </Card.Section>

      {isSoldOut && (
        <Badge
          className={classes.rating}
          variant="gradient"
          gradient={{ from: "yellow", to: "red" }}
        >
          Sold out
        </Badge>
      )}

      <Text className={classes.title} fw={500} component="a">
        {play.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {truncateWords(description, 30)}
      </Text>
    </Card>
  );
}
