import CommonModal from "@/components/CommonModal/Index";
import { TextVariants } from "@/themes/theme";
import {
  ModalProps,
  VStack,
  Text,
  SimpleGrid,
  Center,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import SacrificeCard from "./SacrificeCard";
import { useGlobal } from "@/contexts/Globals";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ErrorType, ISacrificeReward } from "@/types";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
} from "@/reduxs/modals/modal.slices";
import { sacrificeAction } from "@/reduxs/sacrifices/sacrifice.action";

interface IProps extends Omit<ModalProps, "children"> {}
export default function YesRitualStoneModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  const [optionSelected, setOptionSelected] = useState<ISacrificeReward>();
  const { pt } = useGlobal();
  const { isOpen: isLoading, onClose, onOpen } = useDisclosure();
  const { nft, accountAddress } = useAppSelector((p) => p.account);
  const { sacrificeRewards } = useAppSelector((p) => p.sacrifice);

  const handleDieAndSacrificeAsync = async () => {
    if (isLoading) return;
    try {
      if (!accountAddress || !nft || !optionSelected) return;
      onOpen();
      await dispatch(sacrificeAction({tokenId: nft.tokenId,accountAddress, option: optionSelected.type})).unwrap();
      dispatch(openOrCloseModal(ModalName.SACRIFICE_COMPLETED));
    } catch (ex) {
      console.log({ ex });
      dispatch(setErrorModalAction(ErrorType.OH_NO));
    }
    onClose();
  };

  return (
    <CommonModal
      title="SACRIFICE SETTLER"
      wBg={830}
      hBg={745}
      isBack={false}
      scrollBehavior="inside"
      {...props}
    >
      <VStack
        w="full"
        p={{ base: "15px", lg: "25px" }}
        h={{ base: "600px", lg: "auto" }}
        overflowY={{ base: "scroll", lg: "hidden" }}
      >
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "18px", lg: "23px" }}
        >
          A light breeze touches your face as you enter the Shadow Kirk. At the
          deep end of the Kirk you see a sole candle glazing with fire. A monk
          with white glowing eyes meets you. “Have you brought the Ritual
          Stone?”
          <br />
          You slowly nod.
        </Text>
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "18px", lg: "23px" }}
          color="#FFA012"
        >
          <br />
          “You will loose all of your Spoils and die. You will keep your part of
          your Shards, this depends on the Thunder of the Fallen. You will also
          keep your Mythics.” <br /> <br />
        </Text>

        {/* A light breeze touches your face as you enter the Shadow Kirk. At the deep end of the Kirk you see a sole candle glazing with fire. A monk with white glowing eyes meets you. “Have you brought the Ritual Stone?”
You slowly nod. 



With a dagger full of shadow energy overspilling he nears ready to end your life.  
“Are you ready to meet Grim my child?” */}

        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "18px", lg: "23px" }}
        >
          With a dagger full of shadow energy overspilling he nears ready to end
          your life. “Are you ready to meet Grim my child?”
        </Text>

        <SimpleGrid
          w="full"
          columns={{ base: 1, lg: 3 }}
          rowGap="20px"
          columnGap="20px"
        >
          {sacrificeRewards.filter(p => p.type !== 4).map((op, index) => (
            <Center key={op.type}>
              <SacrificeCard
                item={op}
                isSelected={optionSelected && optionSelected.type === op.type}
                onSelect={() => setOptionSelected(op)}
              />
            </Center>
          ))}
        </SimpleGrid>

        <Button
          bgImage={`./modals/btn-bg-1${optionSelected ? "-selected" : ""}.svg`}
          bgRepeat="no-repeat"
          padding="23px"
          bgColor="tran"
          borderRadius="10px"
          mt="20px !important"
          blendMode={optionSelected ? undefined : "luminosity"}
          onClick={handleDieAndSacrificeAsync}
          isDisabled={isLoading}
        >
          {isLoading && <Spinner mr="5px" />}
          <Text
            variant={TextVariants.WITH_TEXT_400}
            pt={pt}
            fontSize={{ base: "18px", lg: "22px" }}
            opacity={0.7}
          >
            {isLoading ? "Please wait..." : "Die and make the Sacrifice"}
          </Text>
        </Button>
      </VStack>
    </CommonModal>
  );
}
