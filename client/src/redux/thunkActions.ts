import { AsyncThunk, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { Busket, User } from '../types/statesTypes';
import { Entries, Entry } from '../types/statesTypes';
import { Inputs, InputsAuth, RefreshRes } from '../types/types';

type AsyncThunkConfig = {
  dispatch?: Dispatch;
};

type AuthResponse = {
  user: User;
  accessToken: string;
};

//! СТАРЫЕ САНКИ ДЛЯ ВИКТОРИНЫ. ОCТАВИЛ КАК ПРИМЕР. ПОТОМ УДАЛИТЬ!!!
// export const fetchThemes = createAsyncThunk<Themes[], void, AsyncThunkConfig>(
//   'themes/all',
//   async () => {
//     const response = await axiosInstance.get<Themes[]>(
//       `${import.meta.env.VITE_API}/themes`
//     );
//     return response.data;
//   });

// export const fetchQuestions = createAsyncThunk<Questions[], void, AsyncThunkConfig>(
//   'questions/all',
//   async () => {
//     const response = await axiosInstance.get<Questions[]>(
//       `${import.meta.env.VITE_API}/questions`
//     );
//     return response.data;
//   });

// export const fetchQuestion = createAsyncThunk<Questions, number, AsyncThunkConfig>(
//   'question/one',
//   async (id) => {
//     const response = await axiosInstance.get<Questions>(`${import.meta.env.VITE_API}/questions/${id}`);
//     return response.data;
//   });

//! Санки для Регистрации, Выхода и Входа. ПЕРЕД РЕЛИЗОМ УДАЛИТЬ РЕГИСТРАЦИЮ!!!

export const fetchAuthUser: AsyncThunk<
  AuthResponse,
  { inputs: InputsAuth; type: string | number },
  AsyncThunkConfig
> = createAsyncThunk('users/add', async (data) => {
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API}/auth/${data.type}`,
    data.inputs
  );
  document.cookie = `accessToken=${response.data.accessToken}`;
  
  return response.data;
});

export const fetchLogoutUser: AsyncThunk<boolean, void, AsyncThunkConfig> =
  createAsyncThunk('users/logout', async () => {
    await axiosInstance.get(`${import.meta.env.VITE_API}/auth/logout`);
    return true;
  });

  export const fetchRefresh: AsyncThunk<AuthResponse, void, AsyncThunkConfig> = 
  createAsyncThunk('users/id', async () => {
    const response = await axiosInstance.get<RefreshRes>(`api/v1/tokens/refresh`);
    setAccessToken(response.data.accessToken);
    return response.data;
  });

  //! Санки для карточек товаров

  export const fetchEntries: AsyncThunk<Entries, void, AsyncThunkConfig> =
  createAsyncThunk('entries/all', async () => {
    const response = await axiosInstance.get<Entries>(
      `${import.meta.env.VITE_API}/product`
    );
    return response.data;
  });

export const fetchAddEntry: AsyncThunk<Entry, Inputs, AsyncThunkConfig> =
  createAsyncThunk('entries/add', async (inputs: Inputs) => {
    // console.log('1111', inputs)
    console.log(import.meta.env.VITE_API)
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API}/product`,
      inputs
    );
    return response.data;
  });

export const fetchDelEntry: AsyncThunk<number, number, AsyncThunkConfig> =
  createAsyncThunk('entries/del', async (id: number) => {
    await axiosInstance.delete(`${import.meta.env.VITE_API}/product/${id}`);
    return id;
  });

  export const fetchEditEntry: AsyncThunk<Entry, { id: number; formData: Partial<Entry> }, AsyncThunkConfig> = createAsyncThunk('entries/edit', async ({ id, formData }: { id: number; formData: Partial<Entry> }) => {
        const { data } = await axiosInstance.put<Entry>(`${import.meta.env.VITE_API}/product/${id}`, formData);
        return data;
    }
  );

// ! Санки для корины

export const fetchBusket: AsyncThunk<Entries, number, AsyncThunkConfig> =
createAsyncThunk('basket/fetchBasket', async (userId: number) => {
  const response = await axiosInstance.get<Entries>(
    `${import.meta.env.VITE_API}/busket/${userId}`
  );
  console.log('resp@@@@@', response.data)
  return response.data;
});

export const addToBusket = createAsyncThunk<Busket, { idUser: number; idProduct: number }, AsyncThunkConfig>('basket/addToBasket', async ({ idUser, idProduct }: { idUser: number, idProduct: number }) => {
  console.log('ПОЛЬЗОВАТЕЛЬ АЙ ДИ!!!!', idUser, idProduct)
  const response = await axiosInstance.post(`${import.meta.env.VITE_API}/basket/newOrder`, { idUser, idProduct });
  return response.data;
});

export const removeFromBusket = createAsyncThunk<number, number, AsyncThunkConfig>('basket/removeFromBasket', async (idProduct: number) => {
  await axiosInstance.delete(`${import.meta.env.VITE_API}/basket/${idProduct}`);
  return idProduct;
});

