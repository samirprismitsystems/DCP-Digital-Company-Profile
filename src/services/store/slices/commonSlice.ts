import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  companyID: null | number;
}

const initialState: IInitialState = {
  companyID: null,
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setCompanyID: (state, action: PayloadAction<any>) => {
      state.companyID = action.payload;
    },
  },
});

export const { setCompanyID } = commonSlice.actions;
export default commonSlice.reducer;
