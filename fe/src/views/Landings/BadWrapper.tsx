import {
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import BadItem from "./components/BadItem";
import LandingContainer from "./components/LandingContainer";
import SettlerStat from "./components/SettlerStat";
import TotalEnergy from "./components/TotalEnergy";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal, setErrorModalAction } from "@/reduxs/modals/modal.slices";
import { ErrorType, SettlerStatus } from "@/types";

export enum BadTab {
  DUNGEONS = 0,
  ASSEMBLE = 1,
  BARDPASS = 2,
  TARVERN = 3,
} 

interface IProps  {
  selectedTab: BadTab;
  onTabChange: (tab: BadTab) => void;
}
export default function BadWrapper({selectedTab = BadTab.DUNGEONS, onTabChange}: IProps) {
  const dispatch = useAppDispatch();
  const {isConnected} = useAccount();
  const {settlerStatus, isFetchSpoil, accountAddress}=useAppSelector(p=>p.account);;

  const onChangeTab = (index: number, isCheck = false)=> {
    const bad = index as BadTab;
    if (
      isCheck && settlerStatus === SettlerStatus.DIED 
      || isFetchSpoil
      || bad === BadTab.BARDPASS      
      ) return;
    if (!isConnected) return;
    if (!accountAddress && (index as BadTab) === BadTab.ASSEMBLE) {
      dispatch(openOrCloseModal(ModalName.DO_NOT_HAVE_A_SATCHEL));
      return;
    }
    onTabChange(index as BadTab);
  }

  useEffect(() => {
    const tab = settlerStatus === SettlerStatus.DIED ? 1 : 0;
    onChangeTab(tab);
  }, [settlerStatus]);


  return (
    <LandingContainer my="20px">
      <Flex w="full" flexDirection={{ base: "column-reverse", lg: "row" }}>
        <SimpleGrid 
          columns={{base: 2, lg: 4}} 
          w="fit-content" 
          gap='15px'
        >
          {new Array(4).fill(0).map((_, index) => (
            <BadItem key={String(index)} 
              index={index} 
              active={index === selectedTab} 
              onClick={()=> onChangeTab(index, true)}
            />
          ))}
        </SimpleGrid>
        <Spacer />
        <HStack mt="-15px" mr="10px" mb={{base: "20px", lg: 0}}>
            <SettlerStat/>
            <TotalEnergy />         
        </HStack>
      </Flex>
    </LandingContainer>    
  );
}
