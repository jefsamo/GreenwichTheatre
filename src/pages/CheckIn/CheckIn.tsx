import { Button, Space, Text, TextInput } from "@mantine/core";
import { useCheckIn } from "../../hooks/useCheckIn";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../constants";

const CheckIn = () => {
  const [ticketCode, setTicketCode] = useState("");
  const user = getCurrentUser();

  const { checkIn, isPending, isSuccess } = useCheckIn();

  const handleCheckIn = () => {
    checkIn({ ticketCode, token: user?.token });
  };

  useEffect(() => {
    if (isSuccess) {
      setTicketCode("");
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <Text
        size="md"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        Check-in Customer
      </Text>
      <TextInput
        label="Ticket Code"
        placeholder="Enter ticket code starting with GCT_"
        w="40%"
        required
        value={ticketCode}
        onChange={(e) => setTicketCode(e.currentTarget.value)}
      />

      <Space h="md" />
      <Button
        loading={isPending}
        onClick={handleCheckIn}
        disabled={!ticketCode}
      >
        Checkin
      </Button>
    </div>
  );
};

export default CheckIn;
