export type User = {
  id: number;
  username: string;
  email: string;
  isAdmin: Boolean;
};

export type Entry = {
  id: number;
  title: string;
  image: string;
  manufacturer: string;
  composition: string;
  hairType: string;
  size: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Entries = Entry[]
