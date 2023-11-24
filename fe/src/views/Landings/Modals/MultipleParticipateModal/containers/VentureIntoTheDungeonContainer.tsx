import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import { VStack, Text, Image, Flex, useToast } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import PickEnergy, { PickEnergyFuncRef } from "../components/PickEnergy";
import { GamesData } from "@/configs/strings";
import { DungeonResponseType, ErrorType } from "@/types";
import {
  ModalName,
  openOrCloseModal,
  setDungeonResponseTypeAction,
  setErrorModalAction,
  setProcessingAction,
  setSpoilAction,
} from "@/reduxs/modals/modal.slices";
import {
  MultipleDungeonContentType,
  setCurrentDungeonContentAction,
  setEnergyPickedAction,
  setSpoilsGameResultAction,
} from "@/reduxs/dungeons/dungeon.slice";
import { useGlobal } from "@/contexts/Globals";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { useAccount } from "wagmi";
import {
  dungeonGameResultByGameId,
  getAccountInfoByTokenId,
} from "@/apis/account.api";
import { getToast, timer } from "@/utils";
import { SpoilClaimerContract } from "@/contracts/SpoilClaimerContract";
import { getEthBalance } from "@/contracts/utils";
import { getMaxLoop } from "@/utils/env.helpers";
import { handleChangeNftAction } from "@/reduxs/accounts/account.actions";

export default function VentureIntoTheDungeonContainer() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isKlayNetwork } = useGlobal();
  const { address } = useAccount();

  const pickRef = useRef<PickEnergyFuncRef>(null);
  const { energyPicked, tokenId, energy, dungeonType } = useAppSelector(
    (p) => p.dungeon
  );
  
  const { isProcessing } = useAppSelector((p) => p.modal);

  const handlePickEnergy = (val: number) => {
    const dungeon = GamesData[dungeonType as keyof typeof GamesData];
    if (energy < val || energy < dungeon.energy) {
      dispatch(setErrorModalAction(ErrorType.NOT_ENOUGH_ENERGY));
      pickRef?.current?.setEnergyValue();
      return;
    }
    dispatch(setEnergyPickedAction(val));
  };

  const handleFetchGameResult = async (gameId: number) => {
    dispatch(setSpoilsGameResultAction([]));
    if (gameId) {
      let isLoop = true;
      let maxLoop = getMaxLoop();
      while (isLoop) {
        try {
          maxLoop -= 1;
          const gameResult = await dungeonGameResultByGameId(gameId);
          const isDiedReceiveMythic = gameResult.some((p) => p.type === DungeonResponseType.DIED_RECEIVE_MYTHIC);
          const isYouSurvied = gameResult.some((p) => p.type === DungeonResponseType.YOU_SURVIED);
          const isDied = gameResult.some((p) => p.type === DungeonResponseType.DEAD);

          if (isDied || isYouSurvied || isDiedReceiveMythic) {
            dispatch(openOrCloseModal(ModalName.DIED));
            dispatch(
              setDungeonResponseTypeAction(
                isYouSurvied
                  ? DungeonResponseType.YOU_SURVIED
                  : isDiedReceiveMythic
                  ? DungeonResponseType.DIED_RECEIVE_MYTHIC
                  : DungeonResponseType.DEAD
              )
            );
            return undefined;
          }

          if (gameResult.length === 1) {
            const result = gameResult[0];
            switch (result.type) {
              case DungeonResponseType.NOTHING: {
                dispatch(openOrCloseModal(ModalName.NOTHING));
                return gameId;
              }
              case DungeonResponseType.WIN: {
                dispatch(setSpoilAction(result));
                dispatch(openOrCloseModal(ModalName.DUNGEON_RAIDED));
                return gameId;
              }
              default:
                return gameId;
            }
          } else {
            dispatch(setSpoilsGameResultAction(gameResult));
            return gameId;
          }
          isLoop = false;
        } catch (error) {
          await timer(1000 * 2);
          if (maxLoop < 1) {
            isLoop = false;
            throw new Error("oh oh");
          }
        }
      }
    }
  };

  const handleOnProcess = async () => {
    if (isProcessing) return;
    console.log({tokenId})
    try {
      const isRs = await isKlayNetwork();
      const signer = await getEthersSigner();
      if (!signer || !isRs || !address || !dungeonType) {
        return;
      }
      if (!tokenId) {
        toast(
          getToast(
            "To participate in the Dungeons is only available to Settler Holders. Mint a Settler or purchase one to access the Dungeons.",
            "error",
            "Participate"
          )
        );
        return;
      }
      dispatch(setProcessingAction(true));
      const dungeon = GamesData[dungeonType as keyof typeof GamesData];

      const tornInfo = await getAccountInfoByTokenId(tokenId);
      if (!tornInfo.account) {
        dispatch(setProcessingAction(false));
        dispatch(openOrCloseModal(ModalName.DO_NOT_HAVE_A_SATCHEL));
        return;
      }
      if (energy < dungeon.energy || energy < energyPicked) {
        dispatch(setProcessingAction(false));
        dispatch(setErrorModalAction(ErrorType.NOT_ENOUGH_ENERGY));
        return;
      }
      const claimerContract = new SpoilClaimerContract(signer);
      const walletBalance = await getEthBalance(address);
      console.log({walletBalance})
      const gasFee = await claimerContract.getGasFee(energyPicked);

      if (walletBalance < gasFee) {
        dispatch(setProcessingAction(false));
        dispatch(setErrorModalAction(ErrorType.NOT_ENOUGH_ETH));
        return;
      }

      if (dungeon.shard) {
        if (!tornInfo || (tornInfo.balance && tornInfo.balance.shardPower < dungeon.shard)) {
          dispatch(openOrCloseModal(ModalName.DO_NOT_ENOUGH_SHARD));
          dispatch(setProcessingAction(false));
          return;
        }
      }
      const gameId = await claimerContract.participate(energyPicked, tornInfo.account, dungeonType);
      const idResult = await handleFetchGameResult(gameId);
      if (idResult) {
        await dispatch(handleChangeNftAction({tokenId, dType: dungeonType, walletAddress: address})).unwrap();
        dispatch(setProcessingAction(false));
        dispatch(setCurrentDungeonContentAction(MultipleDungeonContentType.CongratulationContainer));
      }
      dispatch(setProcessingAction(false));
    } catch (ex) {
      console.log({ ex });
      dispatch(setProcessingAction(false));
      dispatch(setErrorModalAction(ErrorType.OH_NO));
    }
  };

  return (
    <VStack w="full" py={{ base: "0px", lg: "20px" }}>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        color="#FFA012"
        fontSize={{ base: "24px", lg: "48px" }}
        textTransform="uppercase"
      >
        Spend Energy
      </Text>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize={{ base: "14px", lg: "24px" }}
        textAlign="center"
        px="20px"
      >
        Every time you visit Dungeons you spend some of your Energy. You can
        choose to go through the same Dungeon multiple times. Select how many
        runs you want to do in one TX.
      </Text>
      <Flex
        w="full"
        justifyContent="center"
        alignItems="flex-end"
        h={{ base: "50px", lg: "130px" }}
        mb={{ base: "0px", lg: "20px !important" }}
        mt={{ base: "-10px !important", lg: "0px !important" }}
      >
        {/*@ts-ignore */}
        <PickEnergy defaultVal={energyPicked}
          ref={pickRef}
          onValueChange={(v) => handlePickEnergy(v)}
        />
      </Flex>

      <Image src="./modals/line-start.svg" mb="10px !important" />
      <LandButton
        text="Process"
        onClick={handleOnProcess}
        isLoading={isProcessing}
      />
    </VStack>
  );
}
