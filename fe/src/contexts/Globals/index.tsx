import { getRPC } from "@/contracts/utils/getRPC";
import { useAppSelector } from "@/reduxs/hooks";
import { getChainId, getToast, isWindowOs } from "@/utils";
import { isProduction } from "@/utils/env.helpers";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from "wagmi";
import { baseGoerli, base } from "wagmi/chains";

interface IGlobalContext {
  isKlayNetwork: () => Promise<boolean>;
  totalShard: number;
  totalSpoil: number;
  isWindow: boolean;
  pt: string;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GlobalContext = React.createContext<IGlobalContext>({
  isKlayNetwork: async () => true,
  totalShard:0,
  totalSpoil: 0,
  isWindow: false,
  pt: '0px'
});

export const GlobalContextProvider: React.FC<ProviderProps> = ({
  children,
}) => {
  const { chain } = useNetwork();
  const toast = useToast();
  const {switchNetworkAsync} = useSwitchNetwork();
  const {spoils, accountBalanceOf} = useAppSelector(p => p.account);
  const [isWindow, setIsWindow] = useState<boolean>(true);
  const [pt, setPTop] = useState<string>('0px');


  const isKlayNetwork = async () => {
    if (!chain) return false;
    const baseChainId = getChainId();
    const isBase = baseChainId === chain.id;
    if (!isBase) {
      if (switchNetworkAsync) {
        await switchNetworkAsync(baseChainId);
        return true;
      } else {
        toast(getToast('Please switch to the Base network!.', 'error', 'Network Error'))
      }
      return false;
    }
    return isBase;
  };

  const totalSpoil = useMemo(() => {   
    const total = spoils.filter(p=> !p.isClaim).reduce((a, b) => a + b.balanceOf * b.shard, 0);
    return total;
  }, [spoils]);

  const totalShard = useMemo(() => {
    return totalSpoil + accountBalanceOf;
  }, [totalSpoil, accountBalanceOf]);

  useEffect(() => {
    const isWin = isWindowOs();
   if (isWin) {
    setPTop('0px')
   }else {
    setPTop('10px')
   }
  }, [isWindowOs])
  
  

   return (
    <GlobalContext.Provider value={{ isKlayNetwork, totalShard, totalSpoil, isWindow: isWindow, pt }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => React.useContext(GlobalContext);
