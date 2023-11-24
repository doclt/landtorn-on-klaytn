import { IMarketItem } from "@/types";
import axiosInstance from ".";
const URL = "marketplace";

export const getMarketItemsApi = async (): Promise<IMarketItem[]> => {
  return axiosInstance.get(`${URL}/item`);
};

export const checkDailyPurchaseLimitApi = async (
  accountAddress: string,
  itemTypeId = 4
): Promise<
  {
    isValid: boolean;
    id: number;
  }[]
> => {
  return axiosInstance.get(
    `${URL}/isValidRequest/${accountAddress}/${itemTypeId}`
  );
};
