import { IconLogout, IconShoppingBag } from "@tabler/icons-react";
import { Badge, Box, Button, Group, Input } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../constants";
import { useCartContext } from "../../context/cartContext";

export function Header() {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const { cart } = useCartContext();

  return (
    <Box pb={50}>
      <header className={classes.header}>
        <div className="container">
          <Group justify="space-between" h="100%">
            <Link to="/">
              <MantineLogo size={30} />
            </Link>

            <Input placeholder="Search play..." w={"40%"} />

            <Group visibleFrom="sm">
              {!user && (
                <>
                  <Link to="/login">
                    <Button variant="default">Log in</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Sign up</Button>
                  </Link>
                </>
              )}
              {user && user.role !== "Operator" && (
                <Link to="/reservations">
                  <Button variant="default">Reservations</Button>
                </Link>
              )}
              {user && user.role === "Operator" && (
                <>
                  <Link to="/reservations">
                    <Button variant="default">Reservations</Button>
                  </Link>
                  <Link to="/check-in">
                    <Button variant="default">Check-in</Button>
                  </Link>
                </>
              )}
              {user && (
                <Button
                  variant="default"
                  size="xs"
                  onClick={(event) => {
                    event.preventDefault();
                    localStorage.removeItem("user");
                    navigate("/", { replace: true });
                  }}
                >
                  <IconLogout />
                </Button>
              )}
              <Link
                to="/cart"
                style={{ position: "relative", display: "inline-block" }}
              >
                <Button
                  variant="default"
                  color="blue"
                  style={{ position: "relative" }}
                >
                  <IconShoppingBag size={20} />
                  {
                    <Badge
                      color="transparent"
                      size="lg"
                      radius="xl"
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "1px",
                        color: "#000",
                        // zIndex: -1,
                      }}
                    >
                      {cart.length}
                    </Badge>
                  }
                </Button>
              </Link>
            </Group>
          </Group>
        </div>
      </header>
    </Box>
  );
}
