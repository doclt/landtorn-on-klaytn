import { NoSpoils, gitbook_url } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import { Flex, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function NoSpoilContent() {
  return (
    <Flex
      w="full"
      flex={1}
      flexDirection="column"
      position="relative"
      px="10px"
    >
      <Image
        src="./no-spoil-bg-1.png"
        position="absolute"
        right="0px"
        top="-9px"
        zIndex={"0px"}
        opacity={{base: 0.3, lg: 1}}
      />

      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize="18px"
        color="#FFEFD7"
        w={{base: 'full', lg: "470px"}}
        pt="18px"
        zIndex={1}
      >
        You now own a Settler NFT. Now you can venture into Dungeons. There you
        will find valuables. They will look like this:
      </Text>
      <Flex
        w="full"
        borderRadius="12px"
        border="1px solid rgba(201, 201, 201, 0.65)"
        flexDirection="column"
        mt="10px"
      >
        <Flex w="full" px="10px" zIndex={"1px"}>
          <Flex flex={1} px="17px" py="7px" mb="1px" mr="1px">
            <Text
              variant={TextVariants.WITH_ACTOR}
              color="rgba(255, 239, 215, 0.50)"
              fontSize={{ base: "12px", lg: "14px" }}
            >
              Spoils
            </Text>
          </Flex>
          <Flex w="83px" px="27px" py="7px" mb="1px" alignItems="center">
            <Text
              variant={TextVariants.WITH_ACTOR}
              color="rgba(255, 239, 215, 0.50)"
              pr="10px"
              fontSize={{ base: "12px", lg: "14px" }}
            >
              Value
            </Text>
          </Flex>
          <Flex w="83px" px="27px" py="7px" mb="1px" alignItems="center">
            <Text
              variant={TextVariants.WITH_ACTOR}
              color="rgba(255, 239, 215, 0.50)"
              pr="10px"
              fontSize={{ base: "12px", lg: "14px" }}
            >
              ATK/DEF
            </Text>
          </Flex>
        </Flex>
        {NoSpoils.map((spoil, index) => (
          <Flex w="full" key={String(spoil.name)}>
            <Flex
              flex={1}
              px="27px"
              borderRadius="8px"
              bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
              py="7px"
              mb="1px"
              mr="1px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{ base: "12px", lg: "16px" }}
              >
                {spoil.name}
              </Text>
            </Flex>
            <Flex
              w="83px"
              px="27px"
              borderRadius="8px"
              bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
              py="7px"
              mb="1px"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{ base: "12px", lg: "16px" }}
              >
                {spoil.value}
              </Text>
            </Flex>
            <Flex
              w="83px"
              px="27px"
              borderRadius="8px"
              bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
              py="7px"
              mb="1px"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{ base: "12px", lg: "16px" }}
              >
                {spoil.atk_def}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
      <Text
        variant={TextVariants.WITH_ACTOR}
        fontSize="13.5px"
        color="rgba(255, 239, 215, 0.50)"
        pt="18px"
      >
        Each Spoil is an NFT, held by your Settler. Value means $SHARD Cost,
        some Dungeons require a total $SHARD holding to be high to get in.
        ATK/DEF is needed to survive the deeper Dungeons.
      </Text>

      <HStack w="fit-content" alignItems='center' mt="16px">
        <Text
          variant={TextVariants.WITH_ACTOR}
          fontSize="13.5px"
          color="rgba(255, 239, 215, 0.50)"
        >
          Learn more about Lorak:          
        </Text>
        <Link href={gitbook_url} target="_blank">
            <Image src="./here-btn.svg" />
          </Link>
      </HStack>
    </Flex>
  );
}
