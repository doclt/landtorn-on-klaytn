import { GamesData } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import {
  Flex,
  FlexProps,
  HStack,
  Image,
  Spacer,
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

export default function GameItemMb({
  index,
  onDistribution,
  onParticipate,
  ...props
}: IProps) {
  const { isConnected } = useAccount();
  const {pt} = useGlobal()
  const {isFetchSpoil} = useAppSelector(p => p.account);
  const game = GamesData[(index + 1) as keyof typeof GamesData];
  const isActive = game.active && isConnected && !isFetchSpoil;

  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      w="full"
      maxW="355px"
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
        <Image w="120px" h="180px" src={`./games/${index + 1}-mb.png`} />
        <VStack alignItems="flex-start" h="160px" ml="34px !important">
          <Text variant={TextVariants.WITH_TEXT} fontSize="22px">
            {game.title}
          </Text>
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize="12px"
            mt="10px !important"
          >
            {game.sub}
          </Text>

          <HStack mt="10px !important">
            <Text variant={TextVariants.WITH_TEXT_400} fontSize="10px">
             $SHARD Gate:
            </Text>
            <Flex
              w="110px"
              h="28px !important"
              backdropFilter="blur(4px)"
              borderRadius="8px"
              border="1px solid #919191"
              position="relative"
              textAlign="center"
              pl="10px"
              alignItems="center"
            >
              <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px"
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
          </HStack>

          <HStack mt="10px !important" ml="-33px !important">
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="10px"
              w="76.5px"
            >
              Survive Stats:
            </Text>
            <Flex
              w="140px"
              h="28px"
              backdropFilter="blur(4px)"
              borderRadius="8px"
              border="1px solid #919191"
              position="relative"
              textAlign="center"
              pl="6px"
              alignItems="center"
              ml="-15px !important"
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="18px"
                w="full"
                pt={pt}
              >
                {`${game.atk} ATK / ${game.def} DEF`}
              </Text>
            </Flex>
          </HStack>
        </VStack>
      </HStack>

      <Flex
        w="full"
        flexDirection="column"
        bgImage="./games/item-bg-mb.png"
        bgRepeat="no-repeat"
        bgPosition="center"
        h="127px"
        p="8px"
      >
        <HStack justifyContent="space-between" px="15px" mb="-5px" mt="5px">
          <Image
            src="./games/distribution.svg"
            cursor="pointer"
            onClick={() => isActive && onDistribution && onDistribution()}
          />
          <HStack>
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
              ml="16px"
            >
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="18px"
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
          </HStack>
        </HStack>
        <Image
          src="./games/participate-bg-mb.svg"
          onClick={() => isActive && onParticipate && onParticipate()}
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
}
