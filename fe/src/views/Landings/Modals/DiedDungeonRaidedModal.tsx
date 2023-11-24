import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { gitbook_url } from "@/configs/strings";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { DungeonResponseType } from "@/types";
import {
  Text,
  VStack,
  ModalProps,
  Link,
  Image,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import React, { useMemo } from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function DiedDungeonRaidedModal({ onClose, ...props }: IProps) {
  const {dungeonResponseType} = useAppSelector(p=>p.modal);
  return (
    <CommonModal title="Dungeon RAIDED" onClose={onClose} hBg={740} {...props}>
      <VStack w="full" justifyContent="space-between">
        <Flex
          position="relative"
          justifyContent="center"
          alignItems="center"
          minH={{ base: "174px", lg: "234px" }}
          mt={dungeonResponseType === DungeonResponseType.YOU_SURVIED ? "30px" : "0px"}
        >
          <Flex
            w={{ base: "174px", lg: "274px" }}
            h={{ base: "174px", lg: "274px" }}
            borderRadius="full"
            background="#AE0000"
            mixBlendMode="color-dodge"
            filter="blur(50px)"
            position="absolute"
            opacity={0.3}
          />
          <Image src={`./modals/dungeons/${dungeonResponseType === DungeonResponseType.YOU_SURVIED ? 'you-survived' : 'dided'}.png`} />
        </Flex>

        {dungeonResponseType === DungeonResponseType.DEAD && <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="24px"
          mb="10px !important"
          textAlign="center"
        >
          Deep in the Dungeon you encountered <br /> a foe that took your life.
          <br />
          You’ve lost everything.
        </Text>}
        {dungeonResponseType === DungeonResponseType.YOU_SURVIED && <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="24px"
          mb="10px !important"
          textAlign="center"
        >
          Deep in the Dungeon you encountered a foe that took your life. But
          thanks to the Isekar Coin in your possession, you survived. Bless
          Isekar for his mercy.
        </Text>}

       {dungeonResponseType === DungeonResponseType.DIED_RECEIVE_MYTHIC && <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="24px"
          mb="0px !important"
          textAlign="center"
        >
          Deep in the Dungeon you encountered a foe that took your life. <br />
          <br />
          Thanks to the Florki Coin in your possession, all your Mythics have
          survived. Find them in your wallet.
        </Text>}

        <Image
          src="./modals/line-start.svg"
          my={{ base: "20px !important", lg: "50px !important" }}
        />

      {dungeonResponseType !== DungeonResponseType.YOU_SURVIED &&    <Link
          _active={{ border: "none" }}
          boxShadow="none"
          href={gitbook_url}
          target="_blank"
        >
          <LandButton
            isLearnMore
            text="Learn more about Dungeons"
            mt={{ base: "-10px !important", lg: "-5px !important" }}
            onClick={onClose}
          />
        </Link>}
      </VStack>
    </CommonModal>
  );
}
