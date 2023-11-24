import { GamesData } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import {
  Flex,
  FlexProps,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";

interface IProps extends FlexProps {
  index: number;
  onDistribution?: () => void;
  onParticipate?: () => void;
}

export default function GameItemMbNew({
  index,
  onDistribution,
  onParticipate,
  ...props
}: IProps) {
  const { isConnected } = useAccount();
  const { pt } = useGlobal();
  const { isFetchSpoil } = useAppSelector((p) => p.account);
  const game = GamesData[(index + 1) as keyof typeof GamesData];
  const isActive = game.active && isConnected && !isFetchSpoil;

  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      w="full"
      maxW="355px"
      h="280px"
      key={index}
      borderRadius="12px"
      backdropFilter="blur(2.1501457691192627px)"
      border="1px solid rgba(201, 201, 201, 0.65)"
      position="relative"
      flexDirection="column"
      filter={`saturate(${isActive ? 1 : 0})`}
      mixBlendMode={`${isActive ? "color" : "luminosity"}`}
      opacity={isActive ? 1 : 0.5}
      zIndex={2}
      {...props}
    >
      <HStack w="full" p="8px">
        <Image w="105.862px" h="124.544px" ml="10px !important" src={`./games/${index + 1}-mb-1.png`} />
        <VStack alignItems="flex-start" h="160px" ml="34px !important">
          <Text variant={TextVariants.WITH_TEXT} fontSize="22px" pt="20px">
            {game.title}
          </Text>
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize="14px"
            mt="10px !important"
          >
            {game.sub}
          </Text>
        </VStack>
      </HStack>

      <Flex
        w="full"
        flexDirection="column"
        bgImage="./games/item-bg-mb.png"
        bgRepeat="no-repeat"
        bgPosition="center"
        h="125px"
        px="8px"
        pb="8px"
        justifyContent='space-evenly'
      >
        <HStack justifyContent="space-between" px="15px" mb="-5px" mt="5px">
          <VStack alignItems="flex-start">
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="12px"
              ml="-10px"
            > 
              Survive Stats:
            </Text>
            <Flex
              w="135px"
              h="28px"
              backdropFilter="blur(4px)"
              borderRadius="8px"
              border="1px solid #919191"
              position="relative"
              textAlign="center"
              pl="6px"
              alignItems="center"
              ml="-15px !important"
              mt="0px !important"
              bgColor='#1D151F'
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="16px"
                w="full"
                pt={pt}
              >
                {`${game.atk} ATK / ${game.def} DEF`}
              </Text>
            </Flex>
          </VStack>
          <VStack alignItems="flex-start" ml="-20px !important">
            <Text variant={TextVariants.WITH_TEXT_400} fontSize="12px">
              $SHARD Gate:
            </Text>
            <Flex
              w="82px"
              h="28px !important"
              backdropFilter="blur(4px)"
              borderRadius="8px"
              border="1px solid #919191"
              position="relative"
              textAlign="center"
              pl="10px"
              alignItems="center"
              mt="0px !important"
              bgColor='#1D151F'
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="16px"
                textAlign="center"
                w="full"
                pr="20px"
                pt={pt}
              >
                {game.shard}
              </Text>
              <Image
                src="./games/shard-icon.svg"
                position="absolute"
                right="-12px"
                top="-8px"
                w="44px"
              />
            </Flex>
          </VStack>
          <VStack justifyContent='flex-end'>
            <Text></Text>
            <Flex
              w="60px"
              h="27px"
              backdropFilter="blur(4px)"
              borderRadius="8px"
              border="1px solid #919191"
              position="relative"
              textAlign="center"
              pl="6px"
              alignItems="center"
              mt="10px !important" 
              bgColor='#1D151F'             
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="16px"
                pl="10px"
                pt={pt}
              >
                {game.energy}
              </Text>
              <Image
                src="./games/rock.svg"
                position="absolute"
                right="-16px"
                top="-8px"
                w="40px"
              />
            </Flex>
          </VStack>
        </HStack>
        <HStack w="full" mt="5px">
          <Image
            src="/games/distribution-mb.svg"
            cursor="pointer"
            onClick={() => isActive && onDistribution && onDistribution()}
            w="135px"
            h="36px"
          />
          <Image
            src="./games/paticipate-mb.svg"
            onClick={() => isActive && onParticipate && onParticipate()}
            cursor="pointer"
            objectFit="contain"            
            filter="drop-shadow(0px 5px 20px rgba(131, 62, 255, 0.50))"
          />
        </HStack>
      </Flex>
    </Flex>
  );
}
