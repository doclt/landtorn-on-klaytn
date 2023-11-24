import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import { VStack, Text, ModalProps } from "@chakra-ui/react";
import React from "react";
import ShardBalance from "../components/ShardBalance";
import { useAppDispatch } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";

interface IProps extends Omit<ModalProps, "children"> {}

export default function SacrificeSettlerModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  return (
    <CommonModal
      title="Sacrifice Settler"
      isBack
      onBack={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
      {...props}
    >
      <VStack w="full">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "20px" }}
          mb="-15px !important"
        >
          A light breeze touches your face as you enter the Shadow Kirk. At the
          deep end of the Kirk you see a sole candle glazing with fire.
          <br /> <br />
          A monk with white glowing eyes meets you. “Have you brought the Ritual
          Stone?”
          <br /> <br />
          You slowly nod.
          <br /> <br />
          “You will loose all of your Spoils and die. You will keep your part of
          your Shards, this depends on the Thunder of the Fallen. You will also
          keep your Mythics.”
          <br /> <br />
          With a dagger full of shadow energy overspilling he nears ready to end
          your life.
          <br /> <br />
          “Are you ready to meet Grim my child?”
          <br /> <br />
        </Text>
        <LandButton text="Die and make the Sacrifice" />
      </VStack>
    </CommonModal>
  );
}
