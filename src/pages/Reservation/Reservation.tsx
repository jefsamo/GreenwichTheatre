import { Button, Center, Grid, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useCartContext } from "../../context/cartContext";
import { calculateYear } from "../../constants";

const Reservation = () => {
  const { cart, clearCart } = useCartContext();
  const sections = [
    { name: "Area A", rows: 2, seatsPerRow: 6 },
    { name: "Area B", rows: 3, seatsPerRow: 8 },
    { name: "Area C", rows: 2, seatsPerRow: 10 },
  ];

  const maxAgeForChild = 12;
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
                Play {index + 1}
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
      <Center>
        <Button rightSection={<IconArrowRight size={14} />}>
          Make payment
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
