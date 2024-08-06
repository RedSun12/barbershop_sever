import { createSlice } from '@reduxjs/toolkit';
import { Entries, Entry } from '../types/statesTypes';
import { fetchBusket, addToBusket, removeFromBusket, buyOrder } from './thunkActions';
import { act } from 'react';

type InitialState = {
  entries: Entries;
  isLoading: boolean;
};

const initialState: InitialState = {
  entries: [],
  isLoading: false
};

const busketSlice = createSlice({
  name: 'busket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusket.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(fetchBusket.fulfilled, (state, action) => {
        state.entries = action.payload
        state.isLoading = false
      })
      .addCase(addToBusket.fulfilled, (state, action) => {
        // state.entries = [...state.entries, action.payload];
        // console.log(state.items)
        state.entries.push(action.payload);
      })
      .addCase(removeFromBusket.fulfilled, (state, action) => {
        // state.entries = state.entries.map((el) => el.id === action.payload.id ? action.payload : el);
        state.entries = state.entries.filter((item) => item.id !== action.payload);
      })
      .addCase(buyOrder.fulfilled, (state, action) => {
        // console.log('OCHENK&&&&&', action)
        state.entries = [];
        // state.entries = state.entries.map((el) => el.id === action.payload.id ? action.payload : el);
        // state.entries = state.entries.filter((item) => item.id !== action.payload);
      });
  },
});

export default busketSlice.reducer;
