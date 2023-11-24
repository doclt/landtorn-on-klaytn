import CommonModal from "@/components/CommonModal/Index";
import { TextVariants } from "@/themes/theme";
import {
  Flex,
  Image,
  ModalProps,
  Spinner,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import ConditionContent, { SHARD_REQUIRED } from "./ConditionContent";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
} from "@/reduxs/modals/modal.slices";
import { ErrorType, RewardType } from "@/types";
import { useGlobal } from "@/contexts/Globals";
import { sacrificeAction } from "@/reduxs/sacrifices/sacrifice.action";

interface IProps extends Omit<ModalProps, "children"> {}
export default function SacrificeMythicModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { spoils, nft, accountAddress } = useAppSelector((p) => p.account);
  const { totalShard, pt } = useGlobal();
  const { isOpen: isLoading, onClose, onOpen } = useDisclosure();

  const totalMythic = useMemo(() => {
    return spoils
      .filter((p) => p.rewardType === RewardType.MYTHIC)
      .reduce((pre, cur) => pre + cur.amount, 0);
  }, [spoils]);

  const isDisable = useMemo(() => {
    if (!totalMythic) return true;
    if (SHARD_REQUIRED * totalMythic > totalShard) return true;
    return false;
  }, [totalMythic, totalShard]);

  const handleSacrificeMythic = async () => {
    try {
      if (isDisable || isLoading || !accountAddress || !nft) return;
      onOpen();
      await dispatch(
        sacrificeAction({ tokenId: nft.tokenId, accountAddress, option: 4 })
      ).unwrap();
      dispatch(openOrCloseModal(ModalName.SACRIFICE_MYTHIC_SUCCESS));
    } catch (ex) {
      console.log(ex);
      dispatch(setErrorModalAction(ErrorType.OH_NO));
    }
    onClose();
  };

  return (
    <CommonModal
      isCentered={false}
      title="SACRIFICE SETTLER FOR MYTHICS"
      titleMbProps={{
        fontSize: "16px",
      }}
      isBack
      onBack={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
      wBg={830}
      hBg={745}
      {...props}
    >
      <VStack w="full">
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "24px" }}
          w="full"
          textAlign="center"
          p={{ base: "0px", lg: "20px 28px" }}
          pb="10px"
        >
          A light breeze touches your face as you enter the Shadow Kirk. At the
          deep end of the Kirk you see a sole candle glazing with fire. You step
          into the Ritual Circle and read a pamphlet.
          <br /> <br />
          <chakra.span color="#FFA012">
            “To complete the Ritual 1000 Shard Power is needed for every Mythic
            you have. Going through the Ritual will result in the death of your
            Settler and all his Spoils will be destroyed.“
          </chakra.span>
          <br /> <br />
          The reward - Mythics will be transferred to your wallet as Mythic
          NFTs.
        </Text>
        <ConditionContent totalSpoil={totalMythic} />

        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "24px" }}
          w="full"
          textAlign="center"
          px="20px"
          color="#FFA012"
          letterSpacing="-0.48px"
          pt={{ base: 0, lg: "10px" }}
        >
          {totalMythic < 1
            ? ""
            : totalMythic && isDisable
            ? "You don’t have enough Shard Power, go through more Dungeons or Enchant your Settler with $SHARD."
            : "You have enough Shard Power."}
        </Text>
        <Image
          src="/modals/line-start.svg"
          mb={{ base: 0, lg: "10px !important" }}
        />
        {!isLoading && (
          <Flex
            w={{ base: "270px", lg: "324px" }}
            h={{ base: "52px", lg: "52px" }}
            bgImage={{
              base: "/mythic-sacrifices/die-btn-mb.svg",
              lg: "/mythic-sacrifices/die-btn.svg",
            }}
            bgRepeat="no-repeat"
            bgPosition="center"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            as={motion.div}
            whileHover={{ scale: 0.99 }}
            boxShadow="0px 4px 20px 0px rgba(0, 0, 0, 0.25)"
            mixBlendMode={isDisable || isLoading ? "luminosity" : "normal"}
            opacity={isDisable || isLoading ? 0.5 : 1}
            onClick={handleSacrificeMythic}
          />
        )}

        {isLoading && (
          <Flex
            w={{ base: "270px", lg: "324px" }}
            h={{ base: "52px", lg: "52px" }}
            bg="blackAlpha.800"
            borderRadius="8px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            as={motion.div}
            whileHover={{ scale: 0.99 }}
            boxShadow="0px 4px 20px 0px rgba(0, 0, 0, 0.25)"
            mixBlendMode={isDisable || isLoading ? "luminosity" : "normal"}
            opacity={isDisable || isLoading ? 0.5 : 1}
            onClick={handleSacrificeMythic}
          >
            <Spinner size="sm" />
            <Text
              ml="20px"
              variant={TextVariants.WITH_TEXT_400}
              pt={pt}
              fontSize="16px"
            >
              Please wait...
            </Text>
          </Flex>
        )}
      </VStack>
    </CommonModal>
  );
}
