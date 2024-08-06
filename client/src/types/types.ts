import { User } from './statesTypes';

export type RefreshRes = {
  user: User;
  accessToken: string;
};

export type Inputs = {
    title: string;
    image: string;
    manufacturer: string;
    composition: string;
    hairType: string;
    size: string;
    price: number;
};

export type InputsAuth = {
  username?: string ;
  email: string;
  password: string;
};

export type AuthFormType = {
  title: string;
  type: 'signin' | 'signup';
};
