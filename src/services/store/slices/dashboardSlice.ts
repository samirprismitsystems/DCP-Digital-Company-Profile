import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  selectedIndex: number;
  selectedTitle: string | null;
  websiteSlug: string | null;
}

const initialState: IInitialState = {
  selectedIndex: 0,
  selectedTitle: null,
  websiteSlug: null,
};

export const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    incrementSelectedIndex: (state) => {
      state.selectedIndex = state.selectedIndex + 1;
    },
    setSelectedObj: (state, action: PayloadAction<any>) => {
      state.selectedIndex = action.payload.selectedIndex;
      state.selectedTitle = action.payload.selectedTitle;
    },

    setWebsiteSlug: (state, action: PayloadAction<any>) => {
      state.websiteSlug = action.payload;
    },
  },
});

export const { setSelectedObj, incrementSelectedIndex, setWebsiteSlug } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
