import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  companyID: null | number;
  objData: any;
}

const initialState: IInitialState = {
  companyID: null,
  objData: null,
};

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setCompanyID: (state, action: PayloadAction<any>) => {
      state.companyID = action.payload;
    },

    setObjData: (state, action: PayloadAction<any>) => {
      state.objData = action.payload;
    },
  },
});

export const { setCompanyID } = commonSlice.actions;
export default commonSlice.reducer;
