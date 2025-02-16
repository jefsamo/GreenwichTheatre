import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Register.module.css";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Have an account?{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            Login
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="First Name" placeholder="John" required />
        <TextInput label="Last Name" placeholder="Doe" required />
        <TextInput label="Phone Number" placeholder="0700000000" required />
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </Container>
  );
}
