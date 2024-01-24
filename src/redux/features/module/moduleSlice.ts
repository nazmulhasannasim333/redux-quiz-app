import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TModuleInitialState } from "../../../types/module.types";

const initialState: TModuleInitialState = {
  moduleId: "",
  title: "",
  newModule: "",
};

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    setModule: (
      state,
      action: PayloadAction<Omit<TModuleInitialState, "newModule">>
    ) => {
      state.title = action.payload.title;
      state.moduleId = action.payload.moduleId;
    },
    setNewModule: (
      state,
      action: PayloadAction<TModuleInitialState["newModule"]>
    ) => {
      state.newModule = action.payload;
    },
    clearModuleTitle: (state) => {
      state.title = initialState.title;
    },
  },
});

export const { setModule, setNewModule, clearModuleTitle } =
  moduleSlice.actions;

export default moduleSlice.reducer;
