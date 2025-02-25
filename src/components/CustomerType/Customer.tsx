import { ActionIcon, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import classes from "./CustomerType.module.css";
import { CustomerTypeProp } from "../../types";

type CustomerProp = {
  customer: CustomerTypeProp;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};
const Customer = ({ customer, setValue }: CustomerProp) => {
  const theme = useMantineTheme();
  const { type, value } = customer;
  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Text>{type}</Text>
      <ActionIcon
        className={classes.action}
        onClick={() => {
          if (value > 0) {
            setValue((val) => val - 1);
          }
        }}
      >
        <IconMinus size={16} color={theme.colors.dark[6]} />
      </ActionIcon>
      <Text>{value}</Text>
      <ActionIcon
        className={classes.action}
        onClick={() => {
          setValue((val) => val + 1);
        }}
      >
        <IconPlus size={16} color={theme.colors.dark[6]} />
      </ActionIcon>
    </Flex>
  );
};

export default Customer;
