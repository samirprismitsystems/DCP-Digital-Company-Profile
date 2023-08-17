import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  companyID: null | number;
  objData: any;
  routeIsChanged: boolean;
  isProfileHasBeenChanged: boolean;
}

const initialState: IInitialState = {
  companyID: null,
  objData: null,
  routeIsChanged: false,
  isProfileHasBeenChanged: false,
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

    setRouteIsChanged: (state, action: PayloadAction<any>) => {
      state.routeIsChanged = action.payload;
    },

    setIsProfileHasBeenChange: (state, action: PayloadAction<any>) => {
      state.isProfileHasBeenChanged = action.payload;
    },
  },
});

export const { setCompanyID, setRouteIsChanged, setIsProfileHasBeenChange } =
  commonSlice.actions;
export default commonSlice.reducer;
