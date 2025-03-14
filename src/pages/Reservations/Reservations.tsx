import {
  Badge,
  Button,
  Center,
  Group,
  Loader,
  Table,
  Text,
} from "@mantine/core";
import { useReservations } from "../../hooks/useReservations";
import { ReservationType } from "../../types";
import { useMarkReservationAsPaid } from "../../hooks/useMarkReservationAsPaid";
import { getCurrentUser } from "../../constants";

export function Reservations() {
  const { reservations, isLoading, error } = useReservations();
  const user = getCurrentUser();
  const { markAsPaid, isPending } = useMarkReservationAsPaid();
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
          {/* {tickets?.length} */}
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
      <Table.Td>
        <Button
          loading={isPending}
          disabled={reservation.hasPaid}
          onClick={() => {
            console.log(reservation.id);
            markAsPaid({
              token: user?.token,
              hasPaid: true,
              reservationId: reservation.id,
            });
            // if (isSuccess) {
            //   window.location.reload();
            // }
          }}
        >
          {reservation.hasPaid ? "Paid" : "Update Payment"}
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="container">
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Number of tickets</Table.Th>
              <Table.Th>Reservation Date</Table.Th>
              <Table.Th>Payment Status</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
