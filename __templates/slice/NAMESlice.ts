import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NAMEState {}

const initialState: NAMEState = {};

export const NAMESlice = createSlice({
  name: 'NAME',
  initialState,
  reducers: {
    //ACTION:(state)=>{/*modify state*/}
  },
});

//export const SELECTOR = state => state.NAME.XXX;
export const {
  /* actions */
} = NAMESlice.actions;
export default NAMESlice.reducer;
