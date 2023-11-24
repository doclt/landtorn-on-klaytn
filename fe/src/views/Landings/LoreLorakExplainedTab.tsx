import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import Tab from "./components/Tab";
import LandingContainer from "./components/LandingContainer";
import Link from "next/link";
import { gitbook_url } from "@/configs/strings";
import { useAccount } from "wagmi";
import { useAppDispatch } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { fetchTornDiedAction } from "@/reduxs/accounts/account.actions";

export default function LoreLorakExplainedTab() {
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();
  const handleGraveYard = () => {
    if (!address) return;
    dispatch(fetchTornDiedAction(address));
    dispatch(openOrCloseModal(ModalName.GRAVE_YARD));
  };

  return (
    <LandingContainer mt="20px" mb="20px">
      <HStack w="full" columnGap="20px" justifyContent="space-between">
        <Link href='/torn-lorak'>
          <Tab label="TornLord" />
        </Link>
        <Link target="_blank" href={gitbook_url}>
          <Tab label="LORAK EXPLAINED" />
        </Link>
        <Tab
          label="Graveyard"
          filter={`saturate(${isConnected ? 1 : 0})`}
          mixBlendMode={`${isConnected ? "normal" : "luminosity"}`}
          opacity={isConnected ? 1 : 0.5}
          onClick={handleGraveYard}
        />
      </HStack>
    </LandingContainer>
  );
}
