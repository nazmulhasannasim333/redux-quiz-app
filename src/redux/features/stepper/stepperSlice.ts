import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  activeStep: number;
};

const initialState: TInitialState = {
  activeStep: 0,
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    setActiveStepper: (state, action) => {
      state.activeStep = action.payload;
    },
  },
});

export const { setActiveStepper } = stepperSlice.actions;
export default stepperSlice.reducer;
