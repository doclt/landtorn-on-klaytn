import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { LandTornNFT } from "@/types";
import { numberFormat } from "@/utils";
import { Flex, FlexProps, HStack, Spinner, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Fetching from "./Fetching";

interface IProps extends FlexProps {
  onSelectNft?: (torn: LandTornNFT) => void;
  maxH?: number;
  isFetching?: boolean;
}
export default function TornTable({
  isFetching,
  maxH = 250,
  onSelectNft,
  ...props
}: IProps) {
  const { nfts, nft } = useAppSelector((p) => p.account);
  const [cIndex, setCIndex] = useState<number>();

  const handleSetInitialIndex = useCallback(() => {
    if (!nft) {
      setCIndex(undefined);
      return;
    }
    const index = nfts.findIndex((p) => p.tokenId === nft.tokenId);
    setCIndex(index);
  }, [nfts, nft]);

  useEffect(() => {
    handleSetInitialIndex();
  }, [handleSetInitialIndex]);

  return (
    <Flex
      w="full"
      minH="200px"
      maxH="356px"
      bg="#1B1B1B"
      borderRadius="12px"
      backdropFilter="blur(2.1501457691192627px)"
      border="1px solid rgba(201, 201, 201, 0.65)"
      py="10px"
      flexDirection="column"
      zIndex={2}
      position="relative"
      {...props}
    >
      <Flex w="full" px="10px">
        <Flex flex={1} px="27px" py="7px" mb="1px" mr="1px">
          <Text
            variant={TextVariants.WITH_ACTOR}
            color="rgba(255, 239, 215, 0.50)"
            fontSize={{ base: "12px", lg: "16px" }}
          >
            Settler
          </Text>
        </Flex>
        <Flex
          w="125px"
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
            Shard Power
          </Text>
        </Flex>
        <Flex
          w="83px"
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
        {nfts.map((item, index) => {
          return (
            <Flex
              w="full"
              key={String(item.name + index)}
              className={`${cIndex === index ? "torn-row-active" : "torn-row"}`}
              borderRadius="8px"
              onClick={() => {
                setCIndex(index);
                onSelectNft && onSelectNft(item);
              }}
            >
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
                  {item.name || item.tokenId}
                </Text>
              </Flex>
              <Flex
                w="125px"
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
                  {numberFormat(item.shardPower)}
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
                  {`${item.atk}/${item.def}`}
                </Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Fetching isFetching={isFetching || false} />
    </Flex>
  );
}
