import Layout from "@/layouts";
import { MAX_WIDTH } from "@/themes/config";
import {
  Header,
  LoreLorakExplainedTab,
  WalletContainer,
} from "@/views/Landings";
import MintSettler from "@/views/Landings/ MintSettler";
import Games from "@/views/Landings/Games";
import { Flex } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import BadWrapper, { BadTab } from "@/views/Landings/BadWrapper";
import LeaderBoards from "@/views/Landings/Leaderboards";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  fetchNftAction,
  setSelectedNftAction,
} from "@/reduxs/accounts/account.actions";
import LoadingModal from "@/components/LoadingModal";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import TavernContainer from "@/views/Taverns";
import SpinTheWheel from "@/views/SpinTheWheels";

Landing.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Landing() {
  const { isConnected, address } = useAccount();
  const dispatch = useAppDispatch();
  const { nfts, isFetchNft, nft, isConnectWalletAndMintSettler } =
    useAppSelector((p) => p.account);

  const [selectedTab, setSelectedTab] = useState<BadTab>(BadTab.DUNGEONS);

  const handleFetchNftAsync = useCallback(async () => {
    if (address) {
      await dispatch(fetchNftAction(address)).unwrap();
      if (isConnectWalletAndMintSettler) {
        dispatch(setSelectedNftAction({ isNew: true, nft }));
        dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER));
      }
    }
  }, [address, isConnectWalletAndMintSettler]);

  useEffect(() => {
    handleFetchNftAsync();
  }, [handleFetchNftAsync]);

  return (
    <Flex
      w="full"
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      position="relative"
      pb="100px"
    >
      <Flex
        w="full"
        height="full"
        borderRadius="full"
        position="absolute"
        zIndex={1}
        bgGradient="linear-gradient(180deg, rgba(66, 20, 139, 0.35) 0%, rgba(157, 181, 6, 0.35) 100%)"
        filter="blur(150px)"
      />
      <Flex w="full" maxW={`${MAX_WIDTH}px`} flexDirection="column" zIndex={2}>
        <Header />
        <WalletContainer />
        {(!isConnected || nfts.length < 1) && <MintSettler />}
        {isConnected && nfts.length > 0 && <LeaderBoards />}
        <LoreLorakExplainedTab />
        <BadWrapper
          selectedTab={selectedTab}
          onTabChange={(tab) => setSelectedTab(tab)}
        />
        {selectedTab === BadTab.DUNGEONS && <Games />}
        {selectedTab === BadTab.ASSEMBLE && <SpinTheWheel />}
        {selectedTab === BadTab.TARVERN && <TavernContainer />}
        {selectedTab === BadTab.BARDPASS && <SpinTheWheel />}
        
      </Flex>
      <LoadingModal isOpen={isFetchNft || false} />
    </Flex>
  );
}
