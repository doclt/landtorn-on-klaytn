import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { fonts } from "@/themes/config";
import { TextVariants } from "@/themes/theme";
import { balanceFormat, formatNumberWithK, intToString, numberFormat } from "@/utils";
import { Flex, FlexProps, HStack, Image, StackProps, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends StackProps {
  hideBalanceText?: boolean;
}

export default function ShardBalance({hideBalanceText, ...props}: IProps) {
  const {shardBalance} = useAppSelector(p => p.account);
  const {pt} = useGlobal();
  return (
    <HStack alignItems='center' {...props}>
      {!hideBalanceText && <Text
        color="rgba(255, 239, 215, 0.50)"
        fontFamily={fonts.Actor}
        fontSize={{ base: "12px", lg: "18px" }}
      >
        SHARD Balance:
      </Text>}
      <Flex
        border="1px solid #919191"
        minW={{ base: "80px", lg: "96.5px" }}
        h={{ base: "28px", lg: "32px" }}
        borderRadius="12px"
        backdropFilter="blur(4px)"
        position="relative"
        alignItems="center"
      >
        <Text
          variant={TextVariants.WITH_MENU}
          fontSize={{ base: "15px", lg: "22px" }}
          ml="14px"
          pt={pt}
        >
          {intToString(shardBalance)}
        </Text>
        <Image
          src="./shard-icon.svg"
          position="absolute"
          right={{ base: "-30px", lg: "-40px" }}        
        />
      </Flex>
    </HStack>
  );
}
