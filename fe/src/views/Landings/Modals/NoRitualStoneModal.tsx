import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import { ModalProps, VStack, Text, Image } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {
  onReturn?: () => void;
}
export default function NoRitualStoneModal({onReturn, ...props }: IProps) {
  return (
    <CommonModal title="SACRIFICE SETTLER" isBack onBack={onReturn} {...props}>
      <VStack w="full">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '18px', lg: "24px"}}
        >
          A light breeze touches your face as you enter the Shadow Kirk. At the
          deep end of the Kirk you see a sole candle glazing with fire. <br /> <br />
          A monk with white glowing eyes meets you. “Have you brought the Ritual
          Stone?” <br /> <br />
          You decline and ask what is it. <br/> <br />
        </Text>
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '18px', lg: "24px"}}
          color="#FFA012"
        >
          The monk responds. “The Ritual Stone is needed for the Sacrifice, it
          allows me to channel your essence to another world with Grim’s
          blessings. You can find Ritual Stones in Dungeons, although they are
          quite rare.”
        </Text>
        <Image src="./modals/line-start.svg" mb="10px !important" />
        <LandButton text="Return" onClick={onReturn} />
      </VStack>
    </CommonModal>
  );
}
