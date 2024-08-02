import { createSlice } from '@reduxjs/toolkit';
import { Entries, Entry } from '../types/statesTypes';
import { fetchBusket, addToBusket, removeFromBusket } from './thunkActions';
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
        // console.log('!!!!!!!!!!!!', state)
        // console.log('!!!!!!!!!!!!ascascac', action)
        // state.entries = action.payload
        // state.status = 'loading';
      })
      .addCase(fetchBusket.fulfilled, (state, action) => {
        // console.log('!!!!!!!!!!!!', state)
        console.log('!!!!!!!!!!!!asacac', action)
        // state.status = 'succeeded';
        state.entries = action.payload;
      })
      // .addCase(fetchBusket.rejected, (state, action) => {
      //   // state.status = 'failed';
      //   state.error = action.error.message;
      // })
      .addCase(addToBusket.fulfilled, (state, action) => {
        // console.log(state.items)
        // state.items.push(action.payload);
      })
      .addCase(removeFromBusket.fulfilled, (state, action) => {
        // state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default busketSlice.reducer;
