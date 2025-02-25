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
};

export type InitialStateType = {
  cart: CartType[];
  addToCart: (singleItem: CartType) => void;
  clearCart: () => void;
  totalAmount: number;
  showAddToCart: boolean;
  setShowAddToCart: React.Dispatch<React.SetStateAction<boolean>>;
  // showCart: () => void;
};
