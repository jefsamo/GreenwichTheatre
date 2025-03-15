import { Button, Flex, Space, Text } from "@mantine/core";

import { TicketProps } from "../../types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TicketPDF } from "./TicketPDF";

const TicketDetails = ({ ticket, play }: TicketProps) => {
  return (
    <div>
      <Text>
        Name: {ticket.firstName} {ticket.lastName}
      </Text>
      <Text>Play: {play?.title}</Text>
      <Text>
        Date:{" "}
        {play?.timeOfPlay
          ? `${new Date(play.timeOfPlay).toDateString()} ${new Date(
              play.timeOfPlay
            ).toLocaleTimeString()}`
          : "N/A"}
      </Text>
      <Space h="md" />
      {/* <Flex justify="flex-end">
        <Button>Generate Ticket</Button>
      </Flex> */}
      <PDFDownloadLink
        document={<TicketPDF ticket={ticket} play={play} />}
        fileName={`Ticket_${ticket.firstName}_${ticket.lastName}.pdf`}
        style={{ textDecoration: "none" }}
      >
        {({ loading }) => (
          <Flex justify="flex-end">
            <Button>{loading ? "Generating..." : "Download Ticket"}</Button>
          </Flex>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default TicketDetails;
