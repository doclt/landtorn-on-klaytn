import ClaimSpoilBtn from "@/views/Landings/ClaimSpoilBtn";
import Fetching from "@/components/Fetching";
import { TextVariants } from "@/themes/theme";
import { ISpoil, RewardType } from "@/types";
import { numberFormat } from "@/utils";
import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  isFetchSpoil: boolean;
  spoils: ISpoil[];
  maxH: number;
}
export default function SpoilContent({
  isFetchSpoil,
  spoils,
  maxH = 300,
}: IProps) {
  if (!isFetchSpoil && spoils.length < 1) return null;

  const getIconBySpoilTypeIdV2 = (
    spoilTypeId: number,
    rewardType?: RewardType,
    allegianceId?: number,
    isActive?: boolean
  ) => {
    if (rewardType === RewardType.MYTHIC) {
      return `./mythics/${allegianceId || 1}.png`;
    }
    return `./spoils/${spoilTypeId}${isActive ? "-active" : ""}.svg`;
  };

  return (
    <Flex w="full" flexDirection="column" position="relative">
      <Flex w="full" px="10px">
        <Flex flex={1} px="10px" py="7px" mb="1px" mr="1px">
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            fontSize={{ base: "12px", lg: "16px" }}
          >
            Spoils
          </Text>
        </Flex>
        <Flex
          w={{ base: "45px", lg: "83px" }}
          px="27px"
          py="7px"
          mb="1px"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            pr="10px"
            fontSize={{ base: "12px", lg: "16px" }}
          >
            Amount
          </Text>
        </Flex>
        <Flex
          w={{ base: "45px", lg: "83px" }}
          px="27px"
          py="7px"
          mb="1px"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            pr="10px"
            fontSize={{ base: "12px", lg: "16px" }}
          >
            Value
          </Text>
        </Flex>
        <Flex
          w={{ base: "45px", lg: "83px" }}
          px="27px"
          py="7px"
          mb="1px"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            pr="10px"
            fontSize={{ base: "12px", lg: "16px" }}
          >
            ATK/DEF
          </Text>
        </Flex>
      </Flex>
      <Flex
        w="full"
        maxH={`${maxH}px`}
        overflowY="auto"
        flexDirection="column"
        px="10px"
        className="leader-board-table"
      >
        {!isFetchSpoil &&
          spoils.map((spoil, index) => (
            <Flex
              w="full"
              key={String(index)}
              borderRadius="8px"
              border={`${spoil.isClaim ? "1px solid #8134FA" : "none"}`}
            >
              <Flex
                flex={1}
                px={`10px`}
                borderRadius="10px"
                bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
                py={`${spoil.isClaim ? 0 : 7}px`}
                mb={`${spoil.isClaim ? 0 : 1}px !important`}
                mr="1px"
                alignContent="center"
              >
                {spoil.isClaim && <ClaimSpoilBtn ml="-10px" mr="15px" spoil={spoil} />}
                {!spoil.isClaim && (
                  <Image
                    src={getIconBySpoilTypeIdV2(
                    
                      spoil.spoilTypeId || 0,
                      spoil.rewardType,
                      spoil.allegianceId,
                      spoil.isActive
                    )}
                    alt={spoil.name}
                    w="24px !important"
                    h="24px !important"
                    mr="17px"
                  />
                )}
                <Text
                  mt="2px"
                  variant={TextVariants.WITH_ACTOR}
                  fontSize={{ base: "12px", lg: "16px" }}
                >
                  {spoil.name}
                </Text>
              </Flex>
              <Flex
                w={{ base: "45px", lg: "83px" }}
                px="27px"
                borderRadius="8px"
                bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
                py={`${spoil.isClaim ? 0 : 7}px`}
                mb="1px"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize={{ base: "12px", lg: "16px" }}
                >
                  {numberFormat(spoil.balanceOf)}
                </Text>
              </Flex>
              <Flex
                w={{ base: "45px", lg: "83px" }}
                px="27px"
                borderRadius="8px"
                bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
                py={`${spoil.isClaim ? 0 : 7}px`}
                mb="1px"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize={{ base: "12px", lg: "16px" }}
                >
                  {spoil.shard}
                </Text>
              </Flex>
              <Flex
                w={{ base: "45px", lg: "83px" }}
                px="27px"
                borderRadius="8px"
                bgColor={`rgba(217, 217, 217, ${index % 2 === 0 ? 0.1 : 0.05})`}
                py={`${spoil.isClaim ? 0 : 7}px`}
                mb="1px"
                justifyContent="center"
                alignItems="center"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize={{ base: "12px", lg: "16px" }}
                >
                  {spoil.attack}/{spoil.defense}
                </Text>
              </Flex>
            </Flex>
          ))}
      </Flex>
      <Fetching minH='280px' isFetching={isFetchSpoil} bg="blackAlpha.700" />
    </Flex>
  );
}
