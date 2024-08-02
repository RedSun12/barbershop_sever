import { createSlice } from '@reduxjs/toolkit';
import { Entries, Entry } from '../types/statesTypes';
import { fetchAddEntry, fetchAuthUser, fetchDelEntry, fetchEditEntry, fetchEntries, fetchLogoutUser, fetchRefresh } from './thunkActions';
import { act } from 'react';

type InitialState = {
  entries: Entries;
  isLoading: boolean;
};

const initialState: InitialState = {
  entries: [],
  isLoading: false
};

const rtkSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEntries.fulfilled, (state, action) => {
      state.entries = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchEntries.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchAddEntry.fulfilled, (state, action) => {
      state.entries = [...state.entries, action.payload]
    })
    builder.addCase(fetchDelEntry.fulfilled, (state, action) => {
      console.log(action)
      state.entries = state.entries.filter((el) => el.id !== action.payload);
    })
    builder.addCase(fetchEditEntry.fulfilled, (state, action) => {
      // console.log(action)
      state.entries = state.entries.map((el) => el.id === action.payload.id ? action.payload : el);
      // action.payload = null;
    })
  },
});

export default rtkSlice.reducer;
