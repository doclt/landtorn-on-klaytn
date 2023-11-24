import { getEthersSigner } from "@/hooks/useEtherSigner";
import {
  handleChangeNftAction,
  setIsFetchingSpoilsAction,
} from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
  setSpoilAction,
} from "@/reduxs/modals/modal.slices";
import {
  DungeonResponseType,
  DungeonType,
  ErrorType,
  ISpoil,
  RewardType,
} from "@/types";
import { timer } from "@/utils";
import { Flex, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends FlexProps {
  spoil: ISpoil;
}
export default function ClaimSpoilBtn({spoil, ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { nft } = useAppSelector((p) => p.account);

  const handleClaim = async () => {
   
  };

  return (
    <Flex
      boxShadow="0px 3.10437px 15.52187px 0px rgba(0, 0, 0, 0.25)"
      w="115px"
      h="31px"
      bgImage="/claim-spoil-btn.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
      cursor="pointer"
      as={motion.div}
      whileHover={{ scale: 0.98 }}
      onClick={handleClaim}
      {...props}
    />
  );
}
