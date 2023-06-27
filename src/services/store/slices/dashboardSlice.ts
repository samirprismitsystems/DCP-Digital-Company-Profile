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
    setSelectedObj: (state, action: PayloadAction<IInitialState>) => {
      state.selectedIndex = action.payload.selectedIndex;
      state.selectedTitle = action.payload.selectedTitle;
    },
  },
});

export const { setSelectedObj } = dashboardSlice.actions;
export default dashboardSlice.reducer;
