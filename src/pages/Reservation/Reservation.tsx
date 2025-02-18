import { Button, Center, Grid, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import classes from "./Reservation.module.css";
import { IconArrowRight } from "@tabler/icons-react";

const Reservation = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <div className="container">
      <Grid gutter="md">
        <Grid.Col span={6} px="20px">
          <Text size="lg" fw="bolder">
            Personal Details
          </Text>
          <Text size="md" fw="500">
            Adult 1
          </Text>
          <TextInput label="First Name" placeholder="First Name" />
          <Space h="md" />
          <TextInput label="Last Name" placeholder="Last Name" />
          <Space h="md" />
          <DateInput
            value={value}
            onChange={setValue}
            label="Date of Birth"
            placeholder="Date of Birth"
          />{" "}
          <Space h="md" />
          <Text size="md" fw="500">
            Adult 2
          </Text>
          <TextInput label="First Name" placeholder="First Name" />
          <Space h="md" />
          <TextInput label="Last Name" placeholder="Last Name" />
          <Space h="md" />
          <DateInput
            value={value}
            onChange={setValue}
            label="Date of Birth"
            placeholder="Date of Birth"
          />{" "}
        </Grid.Col>
        <Grid.Col span={6} px="20px">
          <Text size="lg" fw="bolder">
            Choose Seat
          </Text>
          <Space h="md" />
          <Text size="md" fw="bold">
            Area A
          </Text>
          <Space h="md" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>1</div>
            <div className={classes.seat}>2</div>
            <div className={classes.seat}>3</div>
            <div className={classes.seat}>4</div>
          </div>
          <Space h="xs" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>5</div>
            <div className={classes.seat}>6</div>
            <div className={classes.seat}>7</div>
            <div className={classes.seat}>8</div>
          </div>
          <Space h="md" />
          <Text size="md" fw="bold">
            Area B
          </Text>
          <Space h="md" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>1</div>
            <div className={classes.seat}>2</div>
            <div className={classes.seat}>3</div>
            <div className={classes.seat}>4</div>
          </div>
          <Space h="xs" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>5</div>
            <div className={classes.seat}>6</div>
            <div className={classes.seat}>7</div>
            <div className={classes.seat}>8</div>
          </div>
          <Space h="md" />
          <Text size="md" fw="bold">
            Area C
          </Text>
          <Space h="md" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>1</div>
            <div className={classes.seat}>2</div>
            <div className={classes.seat}>3</div>
            <div className={classes.seat}>4</div>
          </div>
          <Space h="xs" />
          <div className={classes.seatGrid}>
            <div className={classes.seat}>5</div>
            <div className={classes.seat}>6</div>
            <div className={classes.seat}>7</div>
            <div className={classes.seat}>8</div>
          </div>
          <Space h="md" />
        </Grid.Col>
      </Grid>
      <Center>
        <Button rightSection={<IconArrowRight size={14} />}>
          Make payment
        </Button>
      </Center>
    </div>
  );
};

export default Reservation;
