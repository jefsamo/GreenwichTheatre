export type PlayCardType = {
  id: string;
  imageUrl: string;
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
