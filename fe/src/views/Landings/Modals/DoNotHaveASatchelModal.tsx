import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { useAppDispatch } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import { ModalProps, VStack, Text, Image } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function DoNotHaveASatchelModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <CommonModal title="You don’t have a satchel" hBg={410} {...props}>
      <VStack w="full" h="280px" justifyContent="center">
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="28px"
          color="#FFA012"
        >
          Mint Satchel to Access Dungeons
        </Text>
        <Image src="./modals/line-start.svg" mb="10px !important" />
        <LandButton text="Mint Satchel" onClick={() => dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER))} />
      </VStack>
    </CommonModal>
  );
}
