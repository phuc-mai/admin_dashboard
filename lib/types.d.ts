type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: [ProductType];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  price: number;
  cost: number;
  sizes: [string];
  colors: [string];
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderType = {
  _id: string;
  customerClerkId: string;
  shippingAddress: {
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  products: [
    {
      product: ProductType;
      color: string;
      size: string;
      quantity: number;
    }
  ];
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type OrderItemColumnType = {
  _id: string;
  title: string;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};
