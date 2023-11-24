import React from "react";
import LandingContainer from "./components/LandingContainer";
import { Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import GameItem from "./components/GameItem";
import GameItemMb from "./components/GameItemMb";
import { getToast } from "@/utils";
import { getAccountInfoByTokenId } from "@/apis/account.api";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  DistributionType,
  ModalName,
  openOrCloseModal,
  setDistributionTypeAction,
  setProcessingAction,
} from "@/reduxs/modals/modal.slices";
import { DungeonType } from "@/types";
import {
  MultipleDungeonContentType,
  setCurrentDungeonContentAction,
  setDungeonTypeAction,
  setInitialDungeonAction,
} from "@/reduxs/dungeons/dungeon.slice";
import GameItemMbNew from "./components/GameItemMbNew";
import { getDistributionByDungeonIdAction } from "@/reduxs/dungeons/dungeon.action";

export default function Games() {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { nft } = useAppSelector((p) => p.account);

  const onDistribution = async (index: number) => {
    try {
      const type = index as DistributionType;
      dispatch(getDistributionByDungeonIdAction(index)).unwrap();
      dispatch(setDistributionTypeAction(type));
      dispatch(openOrCloseModal(ModalName.DISTRIBUTION));
    } catch (ex) {
      console.log(ex);
    }
  };

  const onParticipate = async (game: DungeonType) => {
    if (!nft) {
      toast(
        getToast(
          "To participate in the Dungeons is only available to Settler Holders. Mint a Settler or purchase one to access the Dungeons.",
          "error",
          "Participate"
        )
      );
      return;
    }
    const tornInfo = await getAccountInfoByTokenId(nft.tokenId);
    if (!tornInfo.account) {
      dispatch(setProcessingAction(false));
      dispatch(openOrCloseModal(ModalName.DO_NOT_HAVE_A_SATCHEL));
      return;
    }
    dispatch(setInitialDungeonAction());
    dispatch(setDungeonTypeAction(game));
    dispatch(
      setCurrentDungeonContentAction(
        MultipleDungeonContentType.VentureIntoTheDungeonContainer
      )
    );
    dispatch(openOrCloseModal(ModalName.MULTIPLE_PARTICIPATE));
  };

  return (
    <LandingContainer>
      <SimpleGrid columns={1} w="full" rowGap="20px">
        {new Array(2).fill(0).map((_, index) => (
          <Flex
            key={index}
            className={`wow fadeInUp`}
            data-wow-delay={`${index * 0.2}s`}
            justifyContent="center"
          >
            <GameItemMbNew
              index={index}
              onDistribution={() => onDistribution(index + 1)}
              onParticipate={() => onParticipate(index + 1)}
            />
            <GameItem
              index={index}
              onDistribution={() => onDistribution(index + 1)}
              onParticipate={() => onParticipate(index + 1)}
            />
          </Flex>
        ))}
      </SimpleGrid>
    </LandingContainer>
  );
}
