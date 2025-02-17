import { Grid, Space, Text, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";

const Reservation = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="container">
      <Grid gutter="md">
        <Grid.Col span={6}>
          <Text size="lg">Details</Text>
          <Text size="md">Adult 1</Text>
          <TextInput label="First Name" />
          <Space h="md" />
          <TextInput label="Last Name" />
          <Space h="md" />
          <DateTimePicker value={value} onChange={setValue} />
        </Grid.Col>
        <Grid.Col span={6}>2</Grid.Col>
      </Grid>
    </div>
  );
};

export default Reservation;
