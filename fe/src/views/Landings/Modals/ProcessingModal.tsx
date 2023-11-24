import CommonModal from "@/components/CommonModal/Index";
import { TextVariants } from "@/themes/theme";
import {
  ModalProps,
  VStack,
  Text,
  Image,
  Progress,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function ProcessingModal({ ...props }: IProps) {
  return (
    <CommonModal title="PLEASE WAIT" hBg={410} disableClose {...props}>
      <VStack w="full" h="240px" justifyContent="center">
        <Spinner size="xl" color="#FFA012" />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="30px"
          color="rgba(255, 255,255, 0.3)"
          mt="50px !important"          
        >
          Processing ...
        </Text>
        <Image src="./modals/line-start.svg" />
      </VStack>
    </CommonModal>
  );
}
