import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import { showTransactionHash } from "@/utils";
import { VStack, Text, ModalProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {
  txHas?: string;
}
export default function DungeonSuccessModal({ txHas, ...props }: IProps) {
  return (
    <CommonModal
      title="SUCCESS!"
      hBg={574}
      contentProps={{
        minH: "100px",
        bgSize: "cover",
      }}
      {...props}
    >
      <VStack w="full" pt="10px" justifyContent="center">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "20px", lg: "32px" }}
          mb="-15px !important"
          mt="-5px !important"
        >
          Your transaction is successful
        </Text>

        <Link href={`https://basescan.org/tx/${txHas}`} target="_blank">
          <LandButton text={showTransactionHash(txHas || "")} />
        </Link>
      </VStack>
    </CommonModal>
  );
}
