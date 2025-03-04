import { IconPencil, IconTrash } from "@tabler/icons-react";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Center,
  Group,
  Loader,
  Table,
  Text,
} from "@mantine/core";
import { useReservations } from "../../hooks/useReservations";

// const data = [
//   {
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
//     name: "Robert Wolfkisser",
//     paymentStatus: "Paid",
//     email: "rob_wolf@gmail.com",
//     phone: "+44 (452) 886 09 12",
//   },
//   {
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
//     name: "Jill Jailbreaker",
//     paymentStatus: "Paid",
//     email: "jj@breaker.com",
//     phone: "+44 (934) 777 12 76",
//   },
//   {
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
//     name: "Henry Silkeater",
//     paymentStatus: "Not paid",
//     email: "henry@silkeater.io",
//     phone: "+44 (901) 384 88 34",
//   },
//   {
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
//     name: "Bill Horsefighter",
//     paymentStatus: "Not paid",
//     email: "bhorsefighter@gmail.com",
//     phone: "+44 (667) 341 45 22",
//   },
//   {
//     avatar:
//       "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
//     name: "Jeremy Footviewer",
//     paymentStatus: "Manager",
//     email: "jeremy@foot.dev",
//     phone: "+44 (881) 245 65 65",
//   },
// ];

// const jobColors: Record<string, string> = {
//   engineer: "blue",
//   paid: "cyan",
//   "not paid": "pink",
// };

export function Reservations() {
  const { reservations, isLoading, error } = useReservations();
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
  const rows = reservations.map((item: any) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item.firstName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{"07354003284"}</Text>
      </Table.Td>
      <Table.Td>
        <Badge
          //   color={jobColors[item.paymentStatus.toLowerCase()]}
          variant="light"
        >
          {item.hasPaid}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="container">
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Employee</Table.Th>
              <Table.Th>Job title</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Payment Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
