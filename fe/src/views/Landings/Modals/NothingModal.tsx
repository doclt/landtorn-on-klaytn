import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { gitbook_url } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import {
  Text,
  Image,
  VStack,
  ModalProps,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IProps  extends Omit<ModalProps, "children"> {}
export default function NothingModal({...props}: IProps) {
  return (
    <CommonModal title="Dungeon RAIDED" hBg={740} {...props}>
      <VStack w="full">
        <Text variant={TextVariants.WITH_TEXT_400} fontSize="28px" mt="72px">
          You’ve got
        </Text>
        <Text variant={TextVariants.WITH_TEXT_400} fontSize="70px" py="50px">
          NOTHING
        </Text>
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="24px"
          w="360px"
          textAlign="center"
          pb="42px"
        >
          Barely escaping a deadly encounter, you returned outside of the
          Dungeon. Time to heal your wounds, prepare more and try again.
        </Text>
        <Link href={gitbook_url} target='_blank'>
          <LandButton text="Learn more about Dungeons" />
        </Link>
        <Image src="./modals/line-start.svg" mt="-10px !important" />
      </VStack>
    </CommonModal>
  );
}
