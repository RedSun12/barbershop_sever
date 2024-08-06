export type User = {
  id: number;
  username: string;
  usersurname: string;
  email: string;
  isAdmin: Boolean;
  avatar: string;
};

export type Entry = {
  id: number;
  title: string;
  image: string;
  manufacturer: string;
  composition: string;
  hairType: string;
  size: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Busket = {
  idUser: number;
  idProduct: number;
}

export type Entries = Entry[]
