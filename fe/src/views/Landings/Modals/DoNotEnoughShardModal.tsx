import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { useAppDispatch } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import { ModalProps, VStack, Text, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function DoNotEnoughShardModal({ ...props }: IProps) {
  return (
    <CommonModal title="NOT ENOUGH SHARD POWER" hBg={410} {...props}>
      <VStack w="full" h="280px" justifyContent="center">
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '18px', lg: "28px"}}
          color="#FFA012"
          textAlign='center'
        >
          Get more Spoils or purchase <br/> $SHARD and enchant your Settler.
        </Text>
        <Image src="./modals/line-start.svg" />
        <Link  target="_blank" href="https://app.uniswap.org/#/swap?outputCurrency=0x52c45d3068c937cb1e6b4a7f2c2a66b85056dd24">
          <LandButton text="Purchase $SHARD" />
        </Link>
      </VStack>
    </CommonModal>
  );
}
