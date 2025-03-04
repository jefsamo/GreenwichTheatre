import { Button, Center, Grid, Space, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMemo, useState } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { useCartContext } from "../../context/cartContext";
import { calculateYear, filterSeat, getCurrentUser } from "../../constants";
import { ReservationType, Seat, Ticket } from "../../types";
import { useReservation } from "../../hooks/useReservation";
import { useGetSeats } from "../../hooks/useGetSeats";
import toast from "react-hot-toast";
import { useGetTickets } from "../../hooks/useGetTickets";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const { cart, clearCart } = useCartContext();
  const navigate = useNavigate();

  const playId = cart?.[0]?.play?.id;
  const { isPending, reservation } = useReservation();
  const { tickets } = useGetTickets();

  const bookedSeats = tickets
    ?.filter((ticket: Ticket) => ticket.playId === playId)
    ?.map((ticket: Ticket) => ticket.seatId);

  const bookedSeatIds = new Set(bookedSeats);
  const { seats } = useGetSeats();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  //#region totalSeatPrice
  const totalSeatPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }, [selectedSeats]);
  //#endregion

  const totalSeat =
    cart &&
    cart?.[0]?.totalAdult +
      cart?.[0]?.totalChildren +
      cart?.[0]?.totalOldAgePensioner;

  const seatsA = filterSeat(seats, "A");
  const seatsB = filterSeat(seats, "B");
  const seatsC = filterSeat(seats, "C");

  const sections = [
    {
      name: "Area A",
      rows: 2,
      seatsPerRow: 6,
      length: seatsA?.length,
      seats: seatsA as Seat[],
    },
    {
      name: "Area B",
      rows: 3,
      seatsPerRow: 8,
      length: seatsB?.length,
      seats: seatsB as Seat[],
    },
    {
      name: "Area C",
      rows: 2,
      seatsPerRow: 10,
      length: seatsC?.length,
      seats: seatsC as Seat[],
    },
  ];

  const totalPrices = useMemo(
    () => cart.reduce((acc, cur) => acc + cur.totalPrice, 0),
    [cart]
  );

  const totalPriceAndSeat = totalPrices + totalSeatPrice;

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
      if (prev[key] === newValue) return prev;
      return { ...prev, [key]: newValue };
    });
  };
  //#region formatDate
  const formatDate = (date: unknown): string | null => {
    if (!date) return null;
    if (date instanceof Date) return date.toISOString().split("T")[0];
    if (typeof date === "string") return date;
    return null;
  };
  //#endregion
  const user = getCurrentUser();
  const token = user?.token;

  //#region handleSeatSelection
  const handleSeatSelection = (seat: Seat) => {
    setSelectedSeats((prev) => {
      if (prev.some((s) => s.seatNumber === seat.seatNumber)) {
        // Deselect seat
        return prev.filter((s) => s.seatNumber !== seat.seatNumber);
      }
      if (prev.length < totalSeat) {
        return [...prev, seat];
      }
      return prev;
    });
  };
  //#endregion

  //#region HandleReservation
  const handleReservation = () => {
    if (selectedSeats.length < totalSeat) {
      toast.error(
        `Please select ${totalSeat - selectedSeats.length} more seat(s).`
      );
      return;
    }

    const requestData: ReservationType = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      tickets: cart
        ?.map((cartItem, index) => {
          const generateTickets = (
            category: "adult" | "child" | "oap",
            count: number
          ) => {
            return Array.from({ length: count }, (_, i) => ({
              playId: cartItem.play.id,
              seatId: selectedSeats[i].id,
              firstName: values[`${index}-${category}-${i}-firstName`] || "",
              lastName: values[`${index}-${category}-${i}-lastName`] || "",
              dateOfBirth:
                formatDate(values[`${index}-${category}-${i}-dob`]) || "",
            }));
          };

          return [
            ...generateTickets("adult", cartItem.totalAdult),
            ...generateTickets("child", cartItem.totalChildren),
            ...generateTickets("oap", cartItem.totalOldAgePensioner),
          ];
        })
        .flat(),
      totalPrice: totalPriceAndSeat,
    };

    reservation({ reservation: requestData, token });
  };
  //#endregion

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
                {[
                  ...Array(
                    Math.ceil(section.seats.length / section.seatsPerRow)
                  ),
                ].map((_, rowIndex) => (
                  <div
                    key={rowIndex}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {section.seats
                      .slice(
                        rowIndex * section.seatsPerRow,
                        (rowIndex + 1) * section.seatsPerRow
                      )
                      .map((seat, _) => (
                        <div
                          key={seat.seatNumber}
                          onClick={() => handleSeatSelection(seat)}
                          style={{
                            width: "40px",
                            height: "40px",
                            background: bookedSeatIds.has(seat.id)
                              ? "#aaa"
                              : selectedSeats.some(
                                  (s) => s.seatNumber === seat.seatNumber
                                )
                              ? "#4CAF50"
                              : "#ddd", //

                            textAlign: "center",
                            lineHeight: "40px",
                            borderRadius: "5px",
                            cursor: bookedSeatIds.has(seat.id)
                              ? "not-allowed"
                              : "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          {seat.seatNumber}
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
          Total ticket price + Total Seat price: {totalPriceAndSeat}
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
            navigate("/");
          }}
        >
          Clear cart
        </Button>
      </Center>
    </div>
  );
};

export default Reservation;
