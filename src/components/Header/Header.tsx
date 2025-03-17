import { IconLogout, IconShoppingBag } from "@tabler/icons-react";
import { Alert, Badge, Box, Button, Group, Input } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../constants";
import { useCartContext } from "../../context/cartContext";
import { usePlayContext } from "../../context/playContext";

export function Header() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = usePlayContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

            <Input
              placeholder="Search play..."
              w={"40%"}
              value={searchTerm}
              onChange={handleSearch}
            />

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
                <Link to="/my-reservations">
                  <Button variant="default">My Reservations</Button>
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
      <Alert
        color="blue"
        variant="light"
        radius="md"
        withCloseButton
        title="Special Offer!"
        className="discount-banner"
      >
        Book your tickets from <b>Monday to Thursday</b> and enjoy a{" "}
        <b>10% discount</b>!
      </Alert>
    </Box>
  );
}
