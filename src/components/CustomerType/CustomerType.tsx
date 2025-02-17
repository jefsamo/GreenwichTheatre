import { ActionIcon, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import classes from "./CustomerType.module.css";

const CustomerType = () => {
  const theme = useMantineTheme();
  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Text>Adult</Text>
      <ActionIcon className={classes.action}>
        <IconMinus size={16} color={theme.colors.red[6]} />
      </ActionIcon>
      <Text>1</Text>
      <ActionIcon className={classes.action}>
        <IconPlus size={16} color={theme.colors.green[6]} />
      </ActionIcon>
    </Flex>
  );
};

export default CustomerType;
