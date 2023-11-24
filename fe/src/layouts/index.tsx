import { ReactNode, useEffect } from "react";
import LandingLayout from "./landings";
import OtherLayout from "./others";
import { GlobalContextProvider } from "@/contexts/Globals";
import { useAppDispatch } from "@/reduxs/hooks";
import { useRouter } from "next/router";
import { getMarketItemsAction } from "@/reduxs/markets/market.action";

type Props = {
  children: ReactNode;
  variant?: "landing" | "other";
};

export default function Layout({ variant = "landing", children }: Props) {
  const dispatch = useAppDispatch(); 
  const {query} = useRouter();

  useEffect(() => {
    dispatch(getMarketItemsAction());
  }, [])


  if (variant === "landing") {
    return (
      <GlobalContextProvider>
        <LandingLayout>{children}</LandingLayout>
      </GlobalContextProvider>
    );
  }

  return <OtherLayout>{children}</OtherLayout>;
}
