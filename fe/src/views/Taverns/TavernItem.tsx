import { TavernSource } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { IMarketItem } from "@/types";
import {
  Box,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IProps {
  marketItem: IMarketItem;
  isVial?: boolean;
  isLimit?: boolean;
  isLoading?: boolean;
  id: number;
  balanceOf: { id: number; balanceOf: number }[];
  onBuy?: () => void;
}

export default function TavernItem({marketItem, isLimit, isVial, balanceOf, isLoading, id, onBuy }: IProps) {
  const { pt } = useGlobal();
  const item = TavernSource[marketItem.id as keyof typeof TavernSource];
  const isEnablePurchased = 
    (balanceOf.find(p => p.id === item.tokenId)?.balanceOf || 0) > 0
    || (isVial && isLimit)
    ;

  const imgW = useMemo(() => {
    if (id === 3) return "140px";
    if (id === 5) return "179px";
    return "179px";
  }, [id]);

  return (
    <Flex
      borderRadius="8px"
      w={{ base: "172px", lg: "225px" }}
      h={{ base: "289.72px", lg: "379px" }}
      bgImage={{
        base: "/taverns/item-bg-mb.svg",
        lg: "/taverns/item-bg.svg",
      }}
      flexDirection="column"
      p={{ base: "2px", lg: "8px" }}
      alignItems="center"
    >
      <Text
        variant={TextVariants.WITH_TEXT}
        fontSize={{ base: "14px", lg: "16.5px" }}
        w="full"
        textAlign="center"
        textTransform="uppercase"
        mt={{ base: "4px", lg: "0px" }}
      >
        {item.name}
      </Text>

      <Flex
        w={{ base: "145px", lg: "190px" }}
        h={{ base: "138px", lg: "180px" }}
        justifyContent="center"
        alignItems="center"
        bgImage={`/taverns/imgs/bg-${id}.svg`}
        position="relative"
        mt={{ base: "6px", lg: "10px" }}
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPosition="center"
      >
        {isEnablePurchased && <Flex
          w="90px"
          h="20px"
          position="absolute"
          bgImage="/taverns/purchased.svg"
          top="1px"
        />}
        <Flex
          w={{ base: "85px", lg: "112px" }}
          h={{ base: "85px", lg: "112px" }}
          borderRadius="full"
          bgColor={item.color}
          mixBlendMode="screen"
          filter="blur(30px)"
          position="absolute"
        />
        <Image
          src={`/taverns/imgs/${id}.svg`}
          zIndex={1}
          mt={{base: id === 2 ? '10px' : 0,  lg: 0}}
          w={{ base: id === 2 ? "110px" : "133.358px", lg: imgW }}
        />
      </Flex>

      <VStack
        w={{ base: "130px", lg: "182px" }}
        minH="61px"
        gap={{ base: "0px", lg: "10px" }}
        mt={{ base: "5px", lg: "10px" }}
      >
        {item.des && (
          <Flex
            w={{ base: "130px", lg: "181px" }}
            h="28px"
            bgImage="/taverns/des-bg.svg"
            bgRepeat="no-repeat"
            justifyContent="center"
            alignItems="center"
            bgSize="contain"
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "9px", lg: "12px" }}
              color="#FFEFD7"
            >
              {item.des}
            </Text>
          </Flex>
        )}
        {item.energy && (
          <HStack w="full" justifyContent="space-between">
            <Text
              variant={TextVariants.WITH_ACTOR}
              fontSize={{ base: "9px", lg: "10px" }}
              color="rgba(255, 239, 215, 0.50)"
            >
              Energy Top-up:
            </Text>
            <Box
              border="1px solid #919191"
              borderRadius="6px"
              backdropFilter="blur(2.37px)"
              w={{ base: "50px", lg: "64.2px" }}
              pl={{ base: "5px", lg: "15px" }}
              h="22px"
              display="flex"
              alignItems="center"
              position="relative"
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize={{ base: "12px", lg: "14px" }}
                pt={pt}
              >
                {marketItem.value}
              </Text>
              <Image
                src="/taverns/energy.svg"
                position="absolute"
                right={"-10px"}
              />
            </Box>
          </HStack>
        )}
        <HStack w="full" justifyContent="space-between">
          <Text
            variant={TextVariants.WITH_ACTOR}
            fontSize={{ base: "9px", lg: "10px" }}
            color="rgba(255, 239, 215, 0.50)"
          >
            Cost $SHARD:
          </Text>
          <Box
            border="1px solid #919191"
            borderRadius="6px"
            backdropFilter="blur(2.37px)"
            w={{ base: "50px", lg: "64.2px" }}
            pl={{ base: "5px", lg: "15px" }}
            h="22px"
            display="flex"
            alignItems="center"
            position="relative"
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "12px", lg: "14px" }}
              pt={pt}
            >
              {marketItem.price}
            </Text>
            <Image
              src="/taverns/shard.svg"
              position="absolute"
              right={"-10px"}
            />
          </Box>
        </HStack>
      </VStack>
      <Image src="/taverns/line.svg" my={{ base: "2px", lg: "10px" }} />
      <Flex
        w={{ base: "145.24px", lg: "190px" }}
        h={{ base: "32px", lg: "32px" }}
        bgImage={{ base: "/taverns/btn-mb.svg", lg: "/taverns/btn.svg" }}
        borderRadius="8px"
        justifyContent="center"
        alignItems="center"
        cursor={isLoading || isEnablePurchased ? 'not-allowed' : "pointer"}
        _hover={{ mixBlendMode: "luminosity" }}
        onClick={() => {
          if (isEnablePurchased) return;
          onBuy && onBuy()
        }}
        mixBlendMode={isLoading || isEnablePurchased ? "luminosity" : "normal"}
        opacity={isLoading || isEnablePurchased ? 0.8 : 1}
        bgSize="cover"
      >
        {isLoading && <Spinner size="sm" color="rgba(255,255,255, 0.5)" />}
        {!isLoading && (
          <Text variant={TextVariants.WITH_TEXT_400} fontSize="18.7px" pt={pt}>
            Buy
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
