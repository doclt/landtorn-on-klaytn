import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import ShardBalance from "./components/ShardBalance";
import Wallet from "./components/Wallet";
import WhereToStart from "./components/WhereToStart";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAppDispatch } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import LandingContainer from "./components/LandingContainer";
import WalletInfo from "./components/WalletInfo";
import { setConnectWalletAndMintSettlerAction } from "@/reduxs/accounts/account.actions";

export default function WalletContainer() {
  const dispatch = useAppDispatch();
  const {openConnectModal} = useConnectModal();

  const handleOpenConnectWallet = () => {
    dispatch(setConnectWalletAndMintSettlerAction())
    openConnectModal && openConnectModal();
  }


  return (
    <>
      <Flex
        w="full"
        h="80px"
        bgImage="linear-gradient(90deg, rgba(255, 247, 235, 0.00) 0%, rgba(255, 247, 235, 0.10) 51.04%, rgba(255, 247, 235, 0.00) 100%);"
        bgRepeat="no-repeat"
        bgPosition="center"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", lg: "row" }}
        px={{ base: "10px" }}
        py={{ base: "13px" }}
        className="wow fadeIn"
        mb={{ base: "20px !important", lg: "0px !important" }}
        data-wow-delay="0.5s"
      >
        <LandingContainer>
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <ShardBalance />
            <WhereToStart
              display={{ base: "none", lg: "flex" }}
              onClick={() =>
                dispatch(openOrCloseModal(ModalName.WHERE_TO_START))
              }
            />
            <Wallet onClick={handleOpenConnectWallet} />;
            <WalletInfo />
          </HStack>

          <WhereToStart
            display={{ base: "flex", lg: "none" }}
            mt="15px"
            fontSize="18px"
            onClick={() => dispatch(openOrCloseModal(ModalName.WHERE_TO_START))}
          />
        </LandingContainer>
      </Flex>
    </>
  );
}
