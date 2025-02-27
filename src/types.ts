export type PlayCardType = {
  id: string;
  imageUrl: string;
  mainImageUrl: string;
  description: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  title: string;
  timeOfPlay: Date;
};

export type PlayCardProp = {
  play: PlayCardType;
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  role: string;
};

export type Response = {
  succeeded: boolean;
  statusCode: number;
  errors: string[];
  message: string;
  data: UserType;
};

export type Review = {
  rating: number;
  comment: string;
  playId?: string;
};

export type CustomerTypeProp = {
  type: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export type ReviewCardProp = {
  review: Review;
};

export type CartType = {
  totalAdult: number;
  totalChildren: number;
  totalOldAgePensioner: number;
  play: PlayCardType;
  totalPrice: number;
};

export type InitialStateType = {
  cart: CartType[];
  addToCart: (singleItem: CartType) => void;
  clearCart: () => void;
  totalAmount: number;
  showAddToCart: boolean;
  setShowAddToCart: React.Dispatch<React.SetStateAction<boolean>>;
  adult: number;
  setAdult: React.Dispatch<React.SetStateAction<number>>;
  childrens: number;
  setChildrens: React.Dispatch<React.SetStateAction<number>>;
  oldAgePensioner: number;
  setOldAgePensioner: React.Dispatch<React.SetStateAction<number>>;
  // showCart: () => void;
};

export type TicketType = {
  firstName: string;
  lastName: string;
  playId: string;
  seatId: string;
  dateOfBirth: Date;
};

export type Reservation = {
  createReservationDto: ReservationType;
};

export type ReservationType = {
  firstName: string;
  lastName: string;
  email: string;
  totalPrice: number;
  tickets: TicketType[];
};
