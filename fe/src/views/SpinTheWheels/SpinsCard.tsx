import { TextVariants } from "@/themes/theme";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";


const data = ["1.25x", "6x", "1.5x", "0x", "2.5x", "1.75x", "3x"];

const initialIndex = 3;

export default function SpinsCard() {
  return (
    <Flex
      h="120px"
      alignItems="flex-end"
      justifyContent="center"
      position="relative"
      gap="16px"
      background="linear-gradient(270deg, rgba(217, 217, 217, 0.00) 0%, #D9D9D9 50.75%, rgba(217, 217, 217, 0.00) 100%)"
    >
      {data.map((d, index) => {
        const scale = Math.abs(initialIndex - index);
        const t = (initialIndex - scale) / initialIndex;
        const tt = t === 0 ? 0.3 : t === 1 ? 1 : t + 0.2;
        console.log({ scale, tt });
        const tranY = scale === 0 ? 0 : 30;
        return (
          <Flex
            key={d}
            w="52px"
            h="70px"
            bgImage={`/spins/cards/1.svg`}
            bgRepeat="no-repeat"
            justifyContent="center"
            alignItems="center"
            transform={`scale(${tt}) translateY(10px)`}
          >
            <Text
              variant={TextVariants.WITH_TEXT}
              fontSize="18px"
              color="#FFEFD7"
              pt="10px"
            >
              {d}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
