import { checkBaronIsExistApi } from "@/apis/account.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBaron, IMarketItem } from "@/types";
import {
  checkDailyPurchaseLimitApi,
  getMarketItemsApi,
} from "@/apis/marketplace.api";

export const checkExitsBaronAction = createAsyncThunk<
  IBaron | undefined,
  string
>("marketplace/checkExitsBaronAction", async (accountAddress) => {
  const baron = await checkBaronIsExistApi(accountAddress);
  return baron;
});

export const checkDailyPurchaseLimitAction = createAsyncThunk<
  { isValid: boolean; id: number }[],
  string
>("marketplace/checkDailyPurchaseLimitAction", async (accountAddress) => {
  try {
    const rs = await checkDailyPurchaseLimitApi(accountAddress);
    return rs;
  } catch (ex) {
    return [];
  }
});

export const getMarketItemsAction = createAsyncThunk<IMarketItem[]>(
  "marketplace/getMarketItemsAction",
  async () => {
    try {
      const items = await getMarketItemsApi();
      return items;
    } catch (ex) {
      return [];
    }
  }
);
