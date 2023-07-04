import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  selectedIndex: number;
  selectedTitle: string | null;
}

const initialState: IInitialState = {
  selectedIndex: 0,
  selectedTitle: null,
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    incrementSelectedIndex: (state) => {
      state.selectedIndex = state.selectedIndex + 1;
    },
    setSelectedObj: (state, action: PayloadAction<IInitialState>) => {
      state.selectedIndex = action.payload.selectedIndex;
      state.selectedTitle = action.payload.selectedTitle;
    },
  },
});

export const { setSelectedObj, incrementSelectedIndex } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
