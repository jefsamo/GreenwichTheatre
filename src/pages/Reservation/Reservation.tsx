import { Button, Center, Grid, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMemo, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useCartContext } from "../../context/cartContext";
import { calculateYear, getCurrentUser } from "../../constants";
import { ReservationType } from "../../types";
import { useReservation } from "../../hooks/useReservation";

const Reservation = () => {
  const { cart, clearCart } = useCartContext();
  const { isPending, reservation } = useReservation();
  const sections = [
    { name: "Area A", rows: 2, seatsPerRow: 6 },
    { name: "Area B", rows: 3, seatsPerRow: 8 },
    { name: "Area C", rows: 2, seatsPerRow: 10 },
  ];

  const totalPrices = useMemo(
    () => cart.reduce((acc, cur) => acc + cur.totalPrice, 0),
    [cart]
  );

  const maxAgeForChild = 11;
  const maxAgeForAdult = 60;

  // const startAgeForOAP = 61;
  const leastDateForChild = calculateYear(maxAgeForChild);
  const minDateForAdult = calculateYear(maxAgeForAdult);
  const maxDateForAdult = calculateYear(maxAgeForChild);
  const leastDateForOAP = calculateYear(maxAgeForAdult);

  const [values, setValues] = useState<{ [key: string]: string | Date | null }>(
    {}
  );

  const handleChange = (key: string, newValue: string | Date | null) => {
    setValues((prev) => {
      if (prev[key] === newValue) return prev; // Prevent unnecessary state updates
      return { ...prev, [key]: newValue };
    });
  };
  const user = getCurrentUser();

  const formatDate = (date: unknown): string | null => {
    if (!date) return null;
    if (date instanceof Date) return date.toISOString().split("T")[0];
    if (typeof date === "string") return date;
    return null;
  };

  const token = user.token;

  const handleReservation = () => {
    const requestData: ReservationType = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tickets: cart
        .map((cartItem, index) => {
          const generateTickets = (
            category: "adult" | "child" | "oap",
            count: number,
            seatId: string
          ) => {
            return Array.from({ length: count }, (_, i) => ({
              playId: cartItem.play.id,
              seatId,
              firstName: values[`${index}-${category}-${i}-firstName`] || "",
              lastName: values[`${index}-${category}-${i}-lastName`] || "",
              dateOfBirth:
                formatDate(values[`${index}-${category}-${i}-dob`]) || "",
            }));
          };

          return [
            ...generateTickets(
              "adult",
              cartItem.totalAdult,
              "252a4c14-429d-4526-9638-ff0586b53727"
            ),
            ...generateTickets(
              "child",
              cartItem.totalChildren,
              "abd840bc-9b47-48fb-96ec-19455c0ff85d"
            ),
            ...generateTickets(
              "oap",
              cartItem.totalOldAgePensioner,
              "d87963ec-d4e7-4945-81e8-81a54e86baee"
            ),
          ];
        })
        .flat(), // Flatten the array after mapping
      totalPrice: totalPrices,
    };

    reservation({ reservation: requestData, token });
  };

  return (
    <div className="container">
      <Grid gutter="md">
        <Grid.Col span={6} px="20px">
          <Text size="lg" fw="bolder">
            Personal Details
          </Text>
          {Array.from({ length: cart?.length }).map((_, index) => (
            <div key={index}>
              <Text size="lg" fw="500" c="violet">
                {cart[index]?.play?.title}
              </Text>
              {/* Adult */}
              {Array.from({ length: cart[index].totalAdult }).map(
                (_, adultIndex) => {
                  const firstNameKey = `${index}-adult-${adultIndex}-firstName`;
                  const lastNameKey = `${index}-adult-${adultIndex}-lastName`;
                  const dobKey = `${index}-adult-${adultIndex}-dob`;

                  return (
                    <div key={adultIndex}>
                      <Text size="md" fw="500">
                        Adult {adultIndex + 1}
                      </Text>
                      <TextInput
                        label="First Name"
                        placeholder="First Name"
                        value={(values[firstNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(firstNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        value={(values[lastNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(lastNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <DateInput
                        value={
                          values[dobKey] instanceof Date ? values[dobKey] : null
                        }
                        onChange={(date) => handleChange(dobKey, date)}
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        minDate={minDateForAdult}
                        maxDate={maxDateForAdult}
                      />
                      <Space h="md" />
                    </div>
                  );
                }
              )}
              {/* Child */}
              {Array.from({ length: cart[index].totalChildren }).map(
                (_, childIndex) => {
                  const firstNameKey = `${index}-child-${childIndex}-firstName`;
                  const lastNameKey = `${index}-child-${childIndex}-lastName`;
                  const dobKey = `${index}-child-${childIndex}-dob`;

                  return (
                    <div key={childIndex}>
                      <Text size="md" fw="500">
                        Child {childIndex + 1}
                      </Text>
                      <TextInput
                        label="First Name"
                        placeholder="First Name"
                        value={(values[firstNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(firstNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        value={(values[lastNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(lastNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <DateInput
                        value={
                          values[dobKey] instanceof Date ? values[dobKey] : null
                        }
                        onChange={(date) => handleChange(dobKey, date)}
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        minDate={leastDateForChild}
                      />
                      <Space h="md" />
                    </div>
                  );
                }
              )}
              {/* OAP */}
              {Array.from({ length: cart[index].totalOldAgePensioner }).map(
                (_, oapIndex) => {
                  const firstNameKey = `${index}-oap-${oapIndex}-firstName`;
                  const lastNameKey = `${index}-oap-${oapIndex}-lastName`;
                  const dobKey = `${index}-oap-${oapIndex}-dob`;

                  return (
                    <div key={oapIndex}>
                      <Text size="md" fw="500">
                        OAP {oapIndex + 1}
                      </Text>
                      <TextInput
                        label="First Name"
                        placeholder="First Name"
                        value={(values[firstNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(firstNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        value={(values[lastNameKey] as string) || ""}
                        onChange={(e) =>
                          handleChange(lastNameKey, e.target.value)
                        }
                      />
                      <Space h="md" />
                      <DateInput
                        value={
                          values[dobKey] instanceof Date ? values[dobKey] : null
                        }
                        onChange={(date) => handleChange(dobKey, date)}
                        label="Date of Birth"
                        placeholder="Date of Birth"
                        maxDate={leastDateForOAP}
                      />
                      <Space h="md" />
                    </div>
                  );
                }
              )}
            </div>
          ))}
        </Grid.Col>

        <Grid.Col span={6} px="20px">
          {/* Stage Area */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <Text
              size="xl"
              fw="bolder"
              style={{
                background: "black",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              🎤 STAGE
            </Text>
          </div>

          {sections.map((section) => (
            <div key={section.name}>
              <Text size="lg" fw="500">
                {section.name}
              </Text>
              <Space h="md" />

              {/* Seat Grid */}
              <div
                style={{
                  display: "grid",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {[...Array(section.rows)].map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {[...Array(section.seatsPerRow)].map((_, seatIndex) => (
                      <div
                        key={seatIndex}
                        style={{
                          width: "40px",
                          height: "40px",
                          background: "#ddd",
                          textAlign: "center",
                          lineHeight: "40px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        {rowIndex * section.seatsPerRow + seatIndex + 1}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <Space h="lg" />
            </div>
          ))}
        </Grid.Col>
      </Grid>
      {cart && cart.length > 0 && (
        <Text size="lg" ml="xs">
          Total price: {totalPrices.toFixed(2)}
        </Text>
      )}
      <Center>
        <Button
          rightSection={<IconArrowRight size={14} />}
          loading={isPending}
          onClick={() => {
            handleReservation();
          }}
        >
          Make reservation
        </Button>

        <Button
          ml="md"
          onClick={() => {
            clearCart();
          }}
        >
          Clear cart
        </Button>
      </Center>
    </div>
  );
};

export default Reservation;
