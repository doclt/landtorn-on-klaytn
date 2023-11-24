import LandButton from "@/components/LandButton";
import { errors, gitbook_url } from "@/configs/strings";
import { setSelectedNftAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
} from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import { ErrorType } from "@/types";
import { VStack, Text, Flex, Box, Image } from "@chakra-ui/react";
import React from "react";

export default function EnergyContent() {
  const dispatch = useAppDispatch();
  const obj = errors[ErrorType.NOT_ENOUGH_ENERGY];
  const { energy } = useAppSelector((p) => p.dungeon);
  const { nft } = useAppSelector((p) => p.account);

  const onMintNewSettler = () => {
    dispatch(setErrorModalAction());
    dispatch(setSelectedNftAction({ nft, isNew: true }));
    dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER));
  };

  return (
    <VStack w="full" h={{ base: "400px", lg: "602px" }} justifyContent="center">
      <Text
        variant={TextVariants.WITH_TEXT_400}
        textAlign="center"
        fontSize={{ base: "18px", lg: "24px" }}
        w="360px"
      >
        You don’t have any
      </Text>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize={{ base: "42px", lg: "72px" }}
        color="#FFA012"
      >
        ENERGY
      </Text>

      <Flex
        w="200px"
        flexDirection="column"
        alignItems="center"
        filter={`saturate(0)`}
        mixBlendMode={"luminosity"}
        opacity={0.5}
        mb="27px !important"
      >
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize={{ base: "18px", lg: "24px" }}
          color="rgba(255, 239, 21  5, 0.50)"
        >
          Total Energy:
        </Text>

        <Box
          w="125px"
          h="107px"
          bgImg="./modals/not-energy.svg"
          mt="12px"
          display="flex"
          justifyContent="center"
          pt="10px"
        >
          <Text variant={TextVariants.WITH_TEXT_400} fontSize="32px">
            {energy}
          </Text>
        </Box>
      </Flex>

      <Text
        variant={TextVariants.WITH_TEXT_400}
        textAlign="center"
        fontSize={{ base: "18px", lg: "24px" }}
        w={{ base: "300px", lg: "360px" }}
      >
        {obj.des}
      </Text>
      <Image src="./modals/line-start.svg" my="10px !important" />
      <Text
        variant={TextVariants.WITH_TEXT_400}
        textAlign="center"
        fontSize={{ base: "18px", lg: "24px" }}
        w={{ base: "300px", lg: "360px" }}
      >
        Or you can create a new Settler.
      </Text>
      <LandButton text={obj.btnTitle} onClick={onMintNewSettler} />
    </VStack>
  );
}
