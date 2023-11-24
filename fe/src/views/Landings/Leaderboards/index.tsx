import { Flex, Image, Spacer, Stack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import LandingContainer from "../components/LandingContainer";
import LeaderBoardTable from "./LeaderBoardTable";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { SettlerStatus } from "@/types";

export default function LeaderBoards() {
  const dispatch = useAppDispatch();
  const { settlerStatus } = useAppSelector((p) => p.account);
  const { isOwned } = useAppSelector((p) => p.marketplace);


  const characterImg = useMemo(() => {
    if (settlerStatus === SettlerStatus.DIED) return 'died.png';
    if (isOwned) return 'baron.png';
    return 'character.png'
  }, [settlerStatus, isOwned]);

  return (
    <LandingContainer
      px={{ base: "0px", lg: "35px" }}
      contentStyle={{ maxW: { base: "full", lg: "960px" } }}
    >
      <Stack
        w="full"
        justifyContent="space-between"
        direction={{ base: "column", lg: "row" }}
        mt={{ base: "20px", lg: 0 }}
      >
        <Flex
          alignItems='center'
          position="relative"
          flexDirection="column"
          className="wow bounceInLeft"
          h={{ lg: "350px"}}
        >
          <Image src={`./${characterImg}`} w={{ base: "238.21px", lg: "297px" }} />
          <Image
            src={`./min-settler.png`}
            position="absolute"
            bottom={{ base: "-59px", lg: "0px" }}
            w={{ base: "70%", lg: "100%" }}
            left={0}
            right={0}
            margin="auto"
            cursor="pointer"
            onClick={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
          />
        </Flex>
        <Spacer />
        <Flex
          w={{ base: "full", lg: "641px" }}
          flexDirection="column"
          maxW={{ base: "full", lg: "765px" }}
          bgColor={{ base: "rgba(255, 247, 235, 0.10)", lg: "transparent" }}
          py={{ base: "26px", lg: "16px" }}
          alignItems="center"
          px={{ base: "20px", lg: 0 }}
          mt={{ base: "70px !important", lg: "0px !important" }}
        >
          <LeaderBoardTable />
        </Flex>
      </Stack>
    </LandingContainer>
  );
}
