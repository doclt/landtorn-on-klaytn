import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { VStack, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

interface IProps {energyVal: number}
export default function Energy({energyVal = 0}:IProps) {
  return (
    <VStack      
      position="relative"
      ml='-25px !important'
    >     
      <Flex
        w="69.722px"
        h="89.089px"
        bgImage="./cards/1.svg"
        bgPosition="center"
        bgSize="contain"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        mt='25px'
      >
        <Flex
          w="54.36px"
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

      <Flex
        w='125px'
        h='46px'
        bgImage={{ base: "./cards/bg-mobile.svg", lg: "./modals/multiples/bg-energy.svg" }}
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
        justifyContent='center'
        alignItems='center'
      >

        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="32px"
          textAlign='center'
          mt='15px'
          >
          {energyVal}
        </Text>
      </Flex>
    </VStack>
  );
}
