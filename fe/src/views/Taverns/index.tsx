import React, { useCallback, useEffect, useState } from "react";
import LandingContainer from "../Landings/components/LandingContainer";
import { Flex, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import TavernItem from "./TavernItem";
import TavernSacrificeCompletedModal from "./TavernSacrificeCompletedModal";
import { MarketplaceContract } from "@/contracts/MarketplaceContract";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ShardContract } from "@/contracts/ShardContract";
import {
  setErrorModalAction,
  setProcessingAction,
} from "@/reduxs/modals/modal.slices";
import { DungeonType, ErrorType } from "@/types";
import { useAccount } from "wagmi";
import { handleChangeNftAction } from "@/reduxs/accounts/account.actions";
import { getMaxLoop } from "@/utils/env.helpers";
import { timer } from "@/utils";
import { checkByResultApi } from "@/apis/account.api";
import { SpoilContract } from "@/contracts/SpoilContract";

export default function TavernContainer() {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { accountAddress, nft } = useAppSelector((p) => p.account);
  const { isLimit, items } = useAppSelector((p) => p.marketplace);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [itemId, setItemId] = useState<number>();
  const [balanceOf, setBalanceOf] = useState<
    { id: number; balanceOf: number }[]
  >([]);

  const onHandlePurchase = async (id: number) => {
    try {
      const signer = await getEthersSigner();
      if (!signer || !accountAddress || !address) return;
      setItemId(id);
      dispatch(setProcessingAction(true));
      const marketContract = new MarketplaceContract(signer);
      const shardPrice = await marketContract.getItemInShard(id);
      const shardContract = new ShardContract(signer);
      const balance = await shardContract.balanceOf(address);
      if (balance - shardPrice <= 0) {
        dispatch(setErrorModalAction(ErrorType.NOT_ENOUGH_SHARD));
        setItemId(undefined);
        dispatch(setProcessingAction(false));
        return;
      }
      await shardContract.approve(marketContract._contractAddress, shardPrice);
      const txHash = await marketContract.buyByShard(id, accountAddress, 1);
      let maxLoop = getMaxLoop();
      while (maxLoop > 0) {
        maxLoop -= 1;
        try {
          const result = await checkByResultApi(txHash as string);
          if (result) {
            onOpen();
            break;
          }
        } catch (er) {
          await timer(2000);
        }
        if (maxLoop < 1) throw new Error("Oh no");
      }
    } catch (ex) {
      console.log({ ex });
      setItemId(undefined);
      dispatch(setErrorModalAction(ErrorType.OH_NO));
      onClose();
    }
    dispatch(setProcessingAction(false));
  };

  const onClosePurchasedModal = async () => {
    onClose();
    setItemId(undefined);
    await checkExist();
    if (nft)
      dispatch(
        handleChangeNftAction({
          tokenId: nft.tokenId,
          dType: DungeonType.Dungeon_All,
        })
      );
  };

  const checkExist = useCallback(async () => {
    try {
      if (!accountAddress) return;
      dispatch(setProcessingAction(true));

      const spoilContract = new SpoilContract();
      const rs = await Promise.all(
        [275, 276].map(async (id) => {
          const balanceOf = await spoilContract._blanceOf(accountAddress, id);
          return { id, balanceOf };
        })
      );
      setBalanceOf(rs);
    } catch (ex) {}
    dispatch(setProcessingAction(false));
  }, [accountAddress]);

  useEffect(() => {
    checkExist();
  }, [checkExist]);

  return (
    <LandingContainer>
      <Flex
        w={{ base: "355px", lg: "960px" }}
        h={{ base: "175px", lg: "100px" }}
        borderRadius="9.31px"
        bgImage={{ base: "/taverns/bg-mb.svg", lg: "/taverns/bg.svg" }}
        bgRepeat="no-repeat"
        bgPosition="top"
        p={{ base: "22px 16px", lg: "15px 24px" }}
        flexDirection="column"
        justifyContent="space-bet    ween"
      >
        <Text
          variant={TextVariants.WITH_TEXT}
          fontSize="32px"
          w={{ base: "187px", lg: "full" }}
        >
          Welcome to the Tavern.
        </Text>
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize="14px"
          w={{ lg: "480px" }}
          color="#FFEFD7"
        >
          Here you can purchase goods that will help in your Dungeon runs. Vials
          can be purchased three times a day, each Coin can be purchased only
          one time.
        </Text>
      </Flex>

      <SimpleGrid
        w="full"
        columns={{ base: 2, lg: 4 }}
        gap={{ base: "10px", lg: "20px" }}
        mt={{ base: "10px", lg: "20px" }}
      >
        {items.map((item, index) => (
          <TavernItem
            marketItem={item}
            isLimit={!isLimit.find((p) => p.id === item.id)?.isValid}
            isVial={item.itemType === 4}
            isLoading={item.id === itemId}
            key={item.id}
            id={item.id}
            balanceOf={balanceOf}
            onBuy={() => onHandlePurchase(item.id)}
          />
        ))}
      </SimpleGrid>
      <TavernSacrificeCompletedModal
        type="CONFIRM"
        isOpen={isOpen}
        itemId={itemId || 2}
        onClose={onClosePurchasedModal}
      />
    </LandingContainer>
  );
}
