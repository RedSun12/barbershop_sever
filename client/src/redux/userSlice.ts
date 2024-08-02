import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/statesTypes';
import { editUserAvatarById, editUserNameById, editUserSurNameById, fetchAuthUser, fetchLogoutUser, fetchRefresh } from './thunkActions';

type InitialState = {
  user: User;
};

const initialState: InitialState = {
  user: {
    id: 0,
    username: '',
    usersurname: '',
    email: '',
    avatar: '',
    isAdmin: false,
  },
};

const rtkSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(fetchLogoutUser.fulfilled, (state) => {
      state.user = {
        id: 0,
        username: '',
        usersurname: '',
        avatar: '',
        email: '',
        isAdmin: false,
      };
    });

    builder.addCase(fetchRefresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(editUserNameById.fulfilled, (state, action) => {
      state.user.username = action.payload.username;
    });
    builder.addCase(editUserSurNameById.fulfilled, (state, action) => {
      state.user.usersurname = action.payload.usersurname;
    });
    builder.addCase(editUserAvatarById.fulfilled, (state, action) => {
      state.user.avatar = action.payload.avatar;
    });
  },
});

export default rtkSlice.reducer;
