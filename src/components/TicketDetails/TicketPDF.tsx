import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { TicketProps } from "../../types";

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
});

export const TicketPDF = ({ ticket, play }: TicketProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>
          Name: {ticket.firstName} {ticket.lastName}
        </Text>
        <Text>Play: {play?.title}</Text>
        <Text>Ticket code: {ticket?.ticketCode}</Text>
        <Text>
          Date:{" "}
          {play?.timeOfPlay
            ? new Date(play.timeOfPlay).toLocaleString()
            : "N/A"}
        </Text>
      </View>
    </Page>
  </Document>
);
