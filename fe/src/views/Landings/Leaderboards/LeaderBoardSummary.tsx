import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { numberFormat } from "@/utils";
import { Flex, FlexProps, VStack, Text, Box } from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IProps extends FlexProps {}
export default function LeaderBoardSummary({ ...props }: IProps) {
  const { accountBalanceOf } = useAppSelector((p) => p.account);
  const { totalShard, totalSpoil } = useGlobal();

  return (
    <Flex
      w="full"
      marginTop={{ base: "10px", lg: "-125px" }}
      alignItems="flex-end"
      {...props}
    >
      <Flex
        flex={1}
        w="full"
        mb={{ base: "-30px", lg: "10px" }}
        pl={{ base: "0px", lg: "30px" }}
        justifyContent={{base: 'space-between', lg: 'flex-start'}}
      >
        <VStack>
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            fontSize={{ base: "10px", lg: "12px" }}
          >
            Enchanted
          </Text>
          <Flex
            w={{ base: "96px", lg: "124px" }}
            h={{ base: "25.2px", lg: "32px" }}
            bgImage="./leaderboards/sub-bg.svg"
            bgRepeat="no-repeat"
            bgSize="contain"
            justifyContent="center"
            alignItems="center"
            pt="10px"
            position="relative"
            marginTop={{ base: "12px !important", lg: "15px !important" }}
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "14px", lg: "18px" }}
            >
              {numberFormat(accountBalanceOf)}
            </Text>
            <Box
              w="44px"
              h="44px"
              position="absolute"
              right={"-26px"}
              top="2px"
              bgImage="./leaderboards/start-icon.svg"
              bgSize="cover"
              bgRepeat="no-repeat"
              zIndex={10}
              display={{ base: "none", lg: "block" }}
            />
          </Flex>
        </VStack>

        <VStack mx="10px">
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            fontSize={{ base: "10px", lg: "12px" }}
          >
            Shard Power
          </Text>
          <Flex
            w={{ base: "120px", lg: "160px" }}
            h={{ base: "33.6px", lg: "44px" }}
            bgImage="./leaderboards/main-bg.svg"
            bgRepeat="no-repeat"
            bgSize="contain"
            justifyContent="center"
            alignItems="center"
            pt="10px"
            position="relative"
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "20px", lg: "24px" }}
              color="#FFEFD7"
            >
              {numberFormat(totalShard)}
            </Text>
          </Flex>
        </VStack>

        <VStack>
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            fontSize={{ base: "10px", lg: "12px" }}
          >
            Spoils
          </Text>
          <Flex
            w={{ base: "96px", lg: "124px" }}
            h={{ base: "25.2px", lg: "32px" }}
            bgImage="./leaderboards/sub-bg.svg"
            bgRepeat="no-repeat"
            bgSize="contain"
            justifyContent="center"
            alignItems="center"
            pt="10px"
            position="relative"
            marginTop={{ base: "12px !important", lg: "15px !important" }}
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "14px", lg: "18px" }}
            >
              {totalSpoil}
            </Text>
            <Box
              w="44px"
              h="44px"
              position="absolute"
              left={"-26px"}
              top="2px"
              bgImage="./leaderboards/start-icon.svg"
              bgSize="cover"
              bgRepeat="no-repeat"
              display={{ base: "none", lg: "block" }}
            />
          </Flex>
        </VStack>
      </Flex>
      <Box
        w="110px"
        h="216px"
        bgImage="./leaderboards/1.png"
        bgRepeat="no-repeat"
        bgSize="contain"
        display={{ base: "none", lg: "block" }}
        bgPosition="-1px 50px"
      />
    </Flex>
  );
}
