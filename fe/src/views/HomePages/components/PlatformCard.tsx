import { flatforms } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, HStack, Image, VStack, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  index: number;
}
export default function PlatformCard({ index, ...props }: IProps) {

  const plat = flatforms[index as keyof typeof flatforms];
  return (
    <Flex
      w="full"
      maxW="568px"
      border="1px solid #77607E"
      borderRadius="12px"
      bgColor="#281D2B"
      backdropFilter="blur(2.2px)"
      h={{base: '210px', lg: "248px"}}
      p="26px"
      position="relative"
      margin={{ base: "0px auto" }}
      {...props}
    >
      <VStack alignItems="flex-start">
        <HStack mb={{ base: "20px", lg: 0 }} display="flex">
          <Image src={`./1/platforms/1/${index}.png`} />
          <Text mt="10px !important" variant={TextVariants.WITH_TEXT}
            fontSize={{base: '24px', lg: '32px'}}
            w={{base: '136px', lg: 'full'}}
          >
            {plat.title}
          </Text>
        </HStack>
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "12px", lg: "20px" }}
          w="full"
          maxW={{ base: "180px", lg: "270px" }}
          color="#FFEFD7"
          opacity="0.5"
          mt={{base: '0px !important', lg: "15px !important"}}
          lineHeight="120%"
        >
          {plat.des}
        </Text>
      </VStack>

      <Image
        src={`./1/platforms/2/${index}.png`}
        position="absolute"
        right={{ base: "15px", lg: "20px" }}
        w={{ base: "130px", lg: "180px" }}
        bottom="0px"
        display={{ base: "none", lg: "block" }}
      />

      <Image
        src={`./1/platforms/2/${index}-mobile.png`}
        position="absolute"
        bottom="20px"
        right={{ base: "25px", lg: "20px" }}
        w={{ base: "100px", lg: undefined }}
        h="160px"
        display={{ base: "block", lg: "none" }}
      />
    </Flex>
  );
}
