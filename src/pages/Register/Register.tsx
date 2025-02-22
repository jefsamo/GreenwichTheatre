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
import { useForm } from "@mantine/form";
import { RegisterType } from "../../types";
import { useRegister } from "../../hooks/useRegister";

export function Register() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) =>
        /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/.test(value)
          ? null
          : "Please enter a valid UK phone number.",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match.",
    },
  });
  const { register, isPending } = useRegister();

  const handleRegister = (values: RegisterType) => {
    register(values);
  };

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
        <form onSubmit={form.onSubmit(handleRegister)}>
          <TextInput
            label="First Name"
            placeholder="John"
            required
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Last Name"
            placeholder="Doe"
            required
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <TextInput
            label="Phone Number"
            placeholder="0700000000"
            required
            key={form.key("phoneNumber")}
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Your password"
            required
            mt="md"
            key={form.key("confirmPassword")}
            {...form.getInputProps("confirmPassword")}
          />

          <Button fullWidth mt="xl" type="submit" loading={isPending}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
