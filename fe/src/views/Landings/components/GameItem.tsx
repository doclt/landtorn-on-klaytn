import { GamesData } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { isWindowOs } from "@/utils";
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

export default function GameItem({
  index,  
  onDistribution,
  onParticipate,
  ...props
}: IProps) {
  const {pt} = useGlobal();
  const {isConnected} = useAccount();
  const {isFetchSpoil} = useAppSelector(p => p.account);
  const game = GamesData[(index + 1) as keyof typeof GamesData];
  const isActive = game.active && isConnected && !isFetchSpoil;
  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      w="full"
      maxW="960px"
      key={index}
      // h={`${isWindowOs() ? 155 : 185}px`}
      h='155px'
      borderRadius="12px"
      backdropFilter="blur(2.1501457691192627px)"
      border="1px solid rgba(201, 201, 201, 0.65)"
      p="18px"
      bgImage="./games/item-bg.svg"
      bgRepeat="no-repeat"
      bgPosition="bottom"
      bgSize="contain"
      position="relative"
      filter={`saturate(${isActive ? 1 : 0})`}
      mixBlendMode={`${isActive ? "color" : "luminosity"}`}
      opacity={isActive ? 1 : 0.5}
      zIndex={2}      
      {...props}      
    >
      <Image src={`./games/${index + 1}.png`} mb="-18px" objectFit="contain" />
      <Flex w="full" flexDirection="column" ml="45px">
        <HStack w="full" alignItems="flex-start">
          <VStack alignItems="flex-start">
            <Text variant={TextVariants.WITH_TEXT} fontSize="32px">
              {game.title}
            </Text>
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="14px"
              w="full"
              maxW="468px"
              mt="0px !important"
            >
              {game.sub}
            </Text>
          </VStack>
          <Spacer />
          <VStack alignItems="flex-end" w="300px">
            <HStack mr="10px">
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="16px"
                w="90px"
                textAlign="end"
              >
              $SHARD  Gate:
              </Text>
              <Flex
                minW="140px"
                h="28px"
                backdropFilter="blur(4px)"
                borderRadius="12px"
                border="1px solid #919191"
                position="relative"
                textAlign="center"
                pl="6px"
                alignItems="center"
                justifyContent="center"
                pr="20px"
                pt={pt}
              >
                <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px">
                  {game.shard}
                </Text>
                <Image
                  src="./games/shard-icon.svg"
                  position="absolute"
                  right="-8px"
                  top="-8px"
                  w="42px"
                />
              </Flex>
            </HStack>
            <HStack mt="10px !important" pr="10px">
              <Text
                variant={TextVariants.WITH_TEXT_400}
                fontSize="16px"
                w="90px"
                textAlign="end"
              >
                Survive Stats:
              </Text>
              <Flex
                minW="140px"
                h="28px"
                backdropFilter="blur(4px)"
                borderRadius="12px"
                border="1px solid #919191"
                position="relative"
                textAlign="center"
                pl="6px"
                alignItems="center"
                justifyContent="center"
              >
                <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px"
                pt={pt}
                >
                  {`${game.atk} ATK/${game.def} DEF`}
                </Text>
              </Flex>
            </HStack>
          </VStack>
        </HStack>

        <HStack w="full">
          <HStack>
            <Image
              src="./games/distribution.svg"
              cursor="pointer"
              onClick={() => isActive && onDistribution && onDistribution()}
            />
            <HStack>
              <Flex
                w="67px"
                h="28px"
                backdropFilter="blur(4px)"
                borderRadius="12px"
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
                  textAlign="center"
                  pl="20px"
                  pt={pt}
                >
                  {game.energy}
                </Text>
                <Image
                  src="./games/rock.svg"
                  position="absolute"
                  right="-16px"
                  top="-9px"
                  w="42px"
                />
              </Flex>
            </HStack>
          </HStack>
          <Spacer />
          <Image
            src="./games/participate-bg.svg"
            w="172px"
            paddingLeft="7px"
            onClick={() => isActive && onParticipate && onParticipate()}
            cursor="pointer"
          />
        </HStack>
      </Flex>
    </Flex>
  );
}
