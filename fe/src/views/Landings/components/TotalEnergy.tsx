import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { isWindowOs } from "@/utils";
import { VStack, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

export default function TotalEnergy() {
  const {accountEnergy} = useAppSelector(p => p.account);
  const {pt} = useGlobal();
  return (
    <VStack w={{ base: "full", lg: "fit-content" }} my={{ base: "30px", lg: 0 }}>
      <Text
        variant={TextVariants.WITH_ACTOR}
        fontSize="12px"
        color="rgba(255, 239, 215, 0.50)"
      >
        Total Energy:
      </Text>
      <Flex
        w={{ base: "154px", lg: "99px" }}
        h={{ base: '28px', lg: '28px'}}
        bgImage={{ base: "./cards/bg-mobile.svg", lg: "./cards/bg.svg" }}
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
        mt="20px"
      >
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="22px"
          ml={{base: '60px', lg: "30px"}}
          mt='-3px !important'
          pt={pt}
        >
          {accountEnergy || 0}
        </Text>
        <Flex
          w="36px"
          h="46px"
          bgImage="./cards/1.svg"
          bgPosition="center"
          bgSize="contain"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          right="-15px"
          top="-8px"
        >
          <Flex
            w="30px"
            borderRadius="full"
            bgImage="./cards/effect.gif"
            bgPosition="center"
            bgSize="cover"
            justifyContent="center"
            alignItems="center"
            bgColor="#000"
          >
            <Image src="./cards/2.svg" />
          </Flex>
        </Flex>
      </Flex>
    </VStack>
  );
}
