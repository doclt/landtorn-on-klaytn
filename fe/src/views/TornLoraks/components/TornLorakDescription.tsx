import { TextVariants } from "@/themes/theme";
import { VStack, Text } from "@chakra-ui/react";
import React from "react";

export default function TornLorakDescription() {
  return (
    <VStack w="full" pt={{base: '20px', lg: "35px"}}>
      <Text
        variant={TextVariants.WITH_TEXT}
        fontSize={{ base: "16px", lg: "24px" }}
        maxW={{ base: "320px", lg: 'full' }}
        textAlign="center"
      >
        All Settlers strive to become Lords, they are the limited part of the
        Unlimited Torn collection.
      </Text>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize={{ base: "12px", lg: "18px" }}
        textAlign="center"
        w="full"
        maxW={{ base: "298px", lg: "800px" }}
        pt={{base: '5px', lg: "20px"}}
      >
        Lords carry many valuables for those that own them, but most importantly
        they are the core part of Torn IP. Rewarding those that seek and go deep
        in the TornLands.
      </Text>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize={{ base: "12px", lg: "18px" }}
        textAlign="center"
        w="full"
        maxW={{ base: "298px", lg: "840px" }}
        pt={{base: '5px', lg: "20px"}}
      >
        To conjure a TornLord you must find 4 Legendary Items and have enough
        Shard Power. During The First Cataclysms you can obtain a Paladin or an
        Iron Fist Lord, each have their own set. Good luck only 1000 of each
        will ever exist.
      </Text>
    </VStack>
  );
}
