import { Badge, Center, Group, Loader, Table, Text } from "@mantine/core";
import { useGetAllReservationsByUser } from "../../hooks/useGetAllReservationsByUser";
import { ReservationType } from "../../types";
import { useGetAllTicketsByUser } from "../../hooks/useGetAllTicketsByUser";

export default function MyReservations() {
  const { reservations, isLoading, error } = useGetAllReservationsByUser();
  const { tickets } = useGetAllTicketsByUser();
  // console.log(reservations);
  // console.log(tickets);

  if (isLoading) {
    return (
      <Center h="90dvh">
        <Loader />
      </Center>
    );
  }
  if (error) {
    return (
      <div className="container">
        <Text fz="sm" fw={500}>
          Error fetching reservations
        </Text>
      </div>
    );
  }
  const rows = reservations?.map((reservation: ReservationType) => (
    <Table.Tr key={reservation.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              {reservation.firstName} {reservation.lastName}
            </Text>
            <Text fz="xs" c="dimmed">
              {reservation.email}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="xs" c="dimmed">
          {tickets?.length}
        </Text>
      </Table.Td>
      <Table.Td>
        {reservation.createdAt
          ? new Date(reservation.createdAt).toLocaleDateString("en-GB")
          : "N/A"}
      </Table.Td>
      <Table.Td>
        {reservation.hasPaid ? (
          <Badge color="green" variant="light">
            Paid
          </Badge>
        ) : (
          <Badge color="red" variant="light">
            Not paid
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="container">
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Details</Table.Th>
              <Table.Th>Number of tickets</Table.Th>
              <Table.Th>Reservation Date</Table.Th>
              <Table.Th>Payment Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
