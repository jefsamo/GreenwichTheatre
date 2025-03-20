import {
  Badge,
  Center,
  Group,
  Loader,
  Modal,
  Table,
  Text,
} from "@mantine/core";
import { useGetAllReservationsByUser } from "../../hooks/useGetAllReservationsByUser";
import { ReservationType, Ticket } from "../../types";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { getAllTicketsByReservationId } from "../../services/apiReservations";
import { getCurrentUser } from "../../constants";
import { useEffect, useState } from "react";
import TicketDetails from "../../components/TicketDetails/TicketDetails";
import { useGetPlayOther } from "../../hooks/useGetPlayOther";
// import { useGetAllTicketsByUser } from "../../hooks/useGetAllTicketsByUser";

export default function MyReservations() {
  const user = getCurrentUser();
  const { reservations, isLoading, error } = useGetAllReservationsByUser();

  const [opened, { open, close }] = useDisclosure(false);
  const [reservationId, setReservationId] = useState("");
  const [playId, setPlayId] = useState("");

  const { play } = useGetPlayOther(playId);

  const {
    isLoading: isLoadingTickets,
    data: tickets,
    // error: ticketError,
  } = useQuery({
    queryKey: [`tickets-user/${reservationId}`],
    queryFn: () => getAllTicketsByReservationId(user?.token, reservationId),
  });

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      setPlayId(tickets[0].playId);
    }
  }, [tickets]);
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
          {/* {tickets?.length} */}
          --
        </Text>
      </Table.Td>
      <Table.Td>
        {reservation.createdAt
          ? new Date(reservation.createdAt).toLocaleDateString("en-GB")
          : "N/A"}
      </Table.Td>
      <Table.Td>
        {reservation.hasPaid ? (
          <>
            <Badge color="green" variant="light">
              Paid
            </Badge>

            {reservation.hasPaid && (
              <Badge
                color="violet"
                variant="gradient"
                onClick={() => {
                  open();
                  setReservationId(reservation.id!);
                  setPlayId(tickets?.[0].playId);
                }}
                style={{ cursor: "pointer" }}
              >
                View
              </Badge>
            )}
          </>
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
      <Modal opened={opened} onClose={close} title="Ticket Details">
        {/* Modal content */}
        {isLoadingTickets && <Loader />}
        {!isLoadingTickets && (
          <>
            <Text fz="xs" c="dimmed">
              Number of tickets: {tickets?.length}
            </Text>
            {tickets?.map((ticket: Ticket, index: number) => (
              <TicketDetails key={index} ticket={ticket} play={play} />
            ))}
          </>
        )}
      </Modal>
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
          <Table.Tbody>
            {reservations.length > 0 ? (
              rows
            ) : (
              <Text c="dimmed">You have no reservations</Text>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
