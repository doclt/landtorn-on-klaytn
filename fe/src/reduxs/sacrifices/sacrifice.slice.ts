import { ISacrificeReward } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchSacrificeRewardAction } from "./sacrifice.action";


interface SacrificeState {
  sacrificeRewards: ISacrificeReward[];
}

const initialState: SacrificeState = {
  sacrificeRewards: []
};

export const sacrificeSlice = createSlice({
  name: "sacrifice",
  initialState,
  reducers: {    
    
  },
  extraReducers: (builder) => { 
    builder.addCase(fetchSacrificeRewardAction.fulfilled, (state, {payload}) => {
      state.sacrificeRewards = payload;
    })
  }
});
export default sacrificeSlice.reducer
export const {} = sacrificeSlice.actions


