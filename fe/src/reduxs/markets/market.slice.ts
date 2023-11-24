import { createSlice } from "@reduxjs/toolkit";
import { checkDailyPurchaseLimitAction, checkExitsBaronAction, getMarketItemsAction } from "./market.action";
import { IBaron, IMarketItem, SettlerType } from "@/types";


interface MarketplaceState {
  baron?: IBaron;
  isOwned?: boolean;
  isLimit: { isValid: boolean; id: number }[];
  items: IMarketItem[];
}

const initialState: MarketplaceState = {
  items: [],
  isLimit: []
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {    
    
  },
  extraReducers: (builder) => { 
    builder.addCase(checkExitsBaronAction.fulfilled, (state, {payload}) => {
      state.baron = payload;
      state.isOwned = payload?.typeId === SettlerType.Baron;
      
    }),
    builder.addCase(checkDailyPurchaseLimitAction.fulfilled, (state, {payload}) => {
      state.isLimit = payload;
    }),
    builder.addCase(getMarketItemsAction.fulfilled, (state, {payload}) => {
      state.items = payload.reverse();
    })
  }
});
export default marketplaceSlice.reducer
export const {} = marketplaceSlice.actions


