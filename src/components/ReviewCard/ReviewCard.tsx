import { Avatar, Group, Rating, Text } from "@mantine/core";

export function ReviewCard() {
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

          <Rating defaultValue={2} />
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        This play likes to lick its palms that are sweetened by being soaked in
        honey. Teddiursa concocts its own honey by blending fruits and pollen
        collected by Beedrill. Blastoise has water spouts that protrude from its
        shell. The water spouts are very accurate.
      </Text>
    </div>
  );
}
