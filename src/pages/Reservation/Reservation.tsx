import { Button, Center, Grid, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useCartContext } from "../../context/cartContext";
import { calculateYear, getCurrentUser } from "../../constants";
import { CartType, ReservationType } from "../../types";
import { useReservation } from "../../hooks/useReservation";

const Reservation = () => {
  const { cart, clearCart } = useCartContext();
  const { isPending, reservation } = useReservation();
  const sections = [
    { name: "Area A", rows: 2, seatsPerRow: 6 },
    { name: "Area B", rows: 3, seatsPerRow: 8 },
    { name: "Area C", rows: 2, seatsPerRow: 10 },
  ];

  const totalPrices = cart.reduce((acc: number, cur: CartType) => {
    return acc + cur.totalPrice;
  }, 0);

  const maxAgeForChild = 11;
  const maxAgeForAdult = 60;

  // const startAgeForOAP = 61;
  const leastDateForChild = calculateYear(maxAgeForChild);
  const minDateForAdult = calculateYear(maxAgeForAdult);
  const maxDateForAdult = calculateYear(maxAgeForChild);
  const leastDateForOAP = calculateYear(maxAgeForAdult);

  const [values, setValues] = useState<Record<string, string | Date | null>>(
    {}
  );

  const handleChange = (key: string, newValue: string | Date | null) => {
    setValues((prev) => ({ ...prev, [key]: newValue }));
  };
  const user = getCurrentUser();

  const formatDate = (date: any) => {
    if (!date) return null; // Handle empty/null values
    // if (typeof date === "string") return date; // If already in "YYYY-MM-DD" format, return as is
    if (date instanceof Date) return date.toISOString().split("T")[0]; // Convert Date object
    return null;
  };
  const token = user.token;

  const handleReservation = () => {
    const requestData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tickets: cart.flatMap((cartItem, index) => {
        const allTickets = [];

        // Process Adults
        for (
          let adultIndex = 0;
          adultIndex < cartItem.totalAdult;
          adultIndex++
        ) {
          allTickets.push({
            playId: cartItem.play.id,
            seatId: "47613868-64af-49de-93d2-5a1e163465db", // Assuming you store seat IDs
            firstName: values[`${index}-adult-${adultIndex}-firstName`] || "",
            lastName: values[`${index}-adult-${adultIndex}-lastName`] || "",
            dateOfBirth: formatDate(values[`${index}-adult-${adultIndex}-dob`]),
          });
        }

        // Process Children
        for (
          let childIndex = 0;
          childIndex < cartItem.totalChildren;
          childIndex++
        ) {
          allTickets.push({
            playId: cartItem.play.id,
            seatId: "c55e447f-1fb2-4fdf-bd49-5376ee4d0732", // Assuming you store seat IDs
            firstName: values[`${index}-child-${childIndex}-firstName`] || "",
            lastName: values[`${index}-child-${childIndex}-lastName`] || "",
            dateOfBirth: values[`${index}-child-${childIndex}-dob`],
          });
        }

        // Process OAP (Old Age Pensioners)
        for (
          let oapIndex = 0;
          oapIndex < cartItem.totalOldAgePensioner;
          oapIndex++
        ) {
          allTickets.push({
            playId: cartItem.play.id,
            seatId: "d87963ec-d4e7-4945-81e8-81a54e86baee", // Assuming you store seat IDs
            firstName: values[`${index}-oap-${oapIndex}-firstName`] || "",
            lastName: values[`${index}-oap-${oapIndex}-lastName`] || "",
            dateOfBirth:
              formatDate(values[`${index}-oap-${oapIndex}-dob`]) || "",
          });
        }

        return allTickets;
      }),
      totalPrice: totalPrices,
    } as ReservationType;
    console.log(requestData);
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
