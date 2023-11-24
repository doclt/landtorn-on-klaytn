import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import {
  VStack,
  Text,
  ModalProps,
  HStack,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
} from "@/reduxs/modals/modal.slices";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import TornTable from "@/components/TornTable";
import { DungeonType, ErrorType, LandTornNFT } from "@/types";
import {
  handleChangeNftAction,
  setSelectedNftAction,
} from "@/reduxs/accounts/account.actions";
import { getAccountInfoByTokenId } from "@/apis/account.api";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

interface IProps extends Omit<ModalProps, "children"> {}

export default function ManageSettlersListModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { nft } = useAppSelector((p) => p.account);
  const [isCreatedAccount, setIsCreatedAccount] = useState<boolean>(false);
  const [currentTorn, setCurrentTorn] = useState<LandTornNFT>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {address: walletAddress} = useAccount();

  const handleChangeNft = async () => {
    if (!currentTorn) return;
    if (!isCreatedAccount) {
      dispatch(setSelectedNftAction({ nft: currentTorn, isNew: false }));
      dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER));
      return;
    }
    try {
      dispatch(openOrCloseModal());
      await dispatch(
        handleChangeNftAction({ tokenId: currentTorn.tokenId, dType: DungeonType.Dungeon_All, walletAddress })
      ).unwrap();
      dispatch(setSelectedNftAction({ nft: currentTorn, isNew: false }));
    } catch (ex) {
      console.log(ex)
      dispatch(setErrorModalAction(ErrorType.OH_NO));
    }
  };

  const handleSelectNft = async (torn: LandTornNFT) => {
    setIsFetching(true);
    setCurrentTorn(torn);
    try {
      const tornInfo = await getAccountInfoByTokenId(torn.tokenId);
      if (tornInfo && tornInfo.account) {
        setIsCreatedAccount(true);
      } else {
        setIsCreatedAccount(false)
      }
    } catch (ex: any) {
      if (ex.statusCode && ex.statusCode === 404) {
        setIsCreatedAccount(false);
      }
    }
    setIsFetching(false);
  };

  return (
    <CommonModal
      isBack
      onBack={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
      title="MANAGE SETTLERS"
      hBg={574}
      contentProps={{
        minH: "574px",
        w: "496px",
      }}
      {...props}
    >
      <VStack w="full">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "20px" }}
          mt="20px !important"
        >
          Select a different Settler that you own to control.
        </Text>
        <TornTable
          mt="30px !important"
          minH="244px"
          isFetching={isFetching}
          onSelectNft={(torn) => handleSelectNft(torn)}
        />
        <HStack w="full" alignItems="center" justifyContent="center">
          <Image
            src="./mint-add.png"
            w="68px"
            h="68px"
            cursor="pointer"
            as={motion.img}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ scale: 0.9 }}
            onClick={() => {
              dispatch(setSelectedNftAction({ nft: nft, isNew: true }));
              dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER));
            }}
          />
          <LandButton
            text={
              isCreatedAccount
                ? "Select and Control"
                : "Step 2: Mint your Satchel"
            }
            textDone="Select and Control"
            isDone={currentTorn === undefined || isFetching}
            onClick={handleChangeNft}
          />
        </HStack>
      </VStack>
    </CommonModal>
  );
}
