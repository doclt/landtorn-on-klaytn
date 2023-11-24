import { useGlobal } from "@/contexts/Globals";
import { fonts } from "@/themes/config";
import { TextVariants } from "@/themes/theme";
import { Box, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  totalSpoil: number;
}

export const SHARD_REQUIRED = 1000;

export default function ConditionContent({totalSpoil}: IProps) {
  const { pt } = useGlobal();
  const {totalShard} = useGlobal();
  return (
    <Flex
      w="270px"
      h="148px"
      borderRadius="8px"
      bgImage="/modals/mythic-sacrifice-content-bg.svg"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="contain"
      px="15px"
      flexDirection="column"
      gap="12px"
      py="20px"
    >
      <HStack w="full">
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize="12px"
          color="rgba(255, 239, 215, 0.50)"
        >
          Mythics to Claim:
        </Text>
        <Spacer />
        <Flex
          w="100px"
          h="28px"
          borderRadius="8px"
          border="0.776px solid #919191"
          bg="#1D151F"
          backdropFilter="blur(3.1px)"
          fontFamily={fonts.Mirza}
          fontSize="18px"
          color="#FFEFD7"
          justifyContent="center"
          alignItems="center"
          pt={pt}
          position="relative"
        >
          {totalSpoil}
          <Box
            w="38px"
            h="38px"
            bgImage="/mythic-sacrifices/1.svg"
            bgRepeat="no-repeat"
            position="absolute"
            right={"-5px"}
            top="-5px"
          />
        </Flex>
      </HStack>
      <Flex w="full" alignItems='center' >
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize="12px"
          color="rgba(255, 239, 215, 0.50)"
          w='130px'
        >
          Shard Power Required:
        </Text>
        <Spacer />
        <Flex
          w="100px"
          h="28px"
          borderRadius="8px"
          border="0.776px solid #919191"
          bg="#1D151F"
          backdropFilter="blur(3.1px)"
          fontFamily={fonts.Mirza}
          fontSize="18px"
          color="#FFEFD7"
          justifyContent="center"
          alignItems="center"
          pt={pt}
          position="relative"
        >
          {SHARD_REQUIRED * (totalSpoil || 0)}
          <Box
            w="38px"
            h="38px"
            bgImage="/mythic-sacrifices/2.svg"
            bgRepeat="no-repeat"
            position="absolute"
            right={"-5px"}
            top="-5px"
          />
        </Flex>
      </Flex>
      <HStack w="full">
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize="12px"
          color="rgba(255, 239, 215, 0.50)"
        >
          Your Shard Power:
        </Text>
        <Spacer />
        <Flex
         
          w="100px"
          h="28px"
          borderRadius="8px"
          border="0.776px solid #919191"
          bg="#1D151F"
          backdropFilter="blur(3.1px)"
          fontFamily={fonts.Mirza}
          fontSize="18px"
          color="#FFEFD7"
          justifyContent="center"
          alignItems="center"
          pt={pt}
          position="relative"
        >
          {totalShard}
          <Box
            w="38px"
            h="38px"
            bgImage="/mythic-sacrifices/3.svg"
            bgRepeat="no-repeat"
            position="absolute"
            right={"-5px"}
            top="-8px"
          />
        </Flex>
      </HStack>
    </Flex>
  );
}
