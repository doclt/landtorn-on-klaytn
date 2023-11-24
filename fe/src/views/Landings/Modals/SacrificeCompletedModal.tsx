import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { numberFormat } from "@/utils";
import {
  VStack,
  Text,
  chakra,
  Image,
  Flex,
  Box,
  ModalProps,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}

export default function SacrificeCompletedModal({onClose, ...props }: IProps) {
  const { pt } = useGlobal();
  const { sacrificeResult } = useAppSelector((p) => p.account);
  return (
    <CommonModal
      title="SACRIFICE COMPLETED"
      wBg={700}
      hBg={507}
      isBack
      onClose={onClose}
      {...props}
    >
      <VStack minH="200px" p={{ lg: "35px" }}>
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "18px", lg: "24px" }}
          textAlign="center"
          w="full"
          maxW="600px"
        >
          Your Journey has ended... <br /> For now. <br />
          You can go back and create a new Settler. Good luck. <br /> <br />
          <chakra.span color="#FFA012">
            The Thunder of the Fallen has affected your Shard gain. You have
            received:
          </chakra.span>
        </Text>
       {sacrificeResult && sacrificeResult.totalMythic && <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "18px", lg: "24px" }}
          textAlign="center"
          w="full"
          maxW="600px"
        >
          {sacrificeResult?.totalMythic || 15} MYTHIC
        </Text>}
        <Flex alignItems="center" mt={`${sacrificeResult && sacrificeResult.totalMythic ? 10 : 30}px !important`}>
          <Flex
            w="84px"
            h="28px"
            position="relative"
            border="0.776px solid #919191"
            borderRadius="8px"
            alignItems="center"
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="18px"
              pt={pt}
              w="full"
              textAlign="center"
              pr="20px"
            >
              {numberFormat(sacrificeResult?.shardBalance || 0)}
            </Text>
            <Box
              w="38px"
              h="35px"
              position="absolute"
              right="-10px"
              bgImage="./sacrifices/shard.svg"
            />
          </Flex>
          <Text
            variant={TextVariants.WITH_TEXT_400}
            color="#FFEFD7"
            fontSize="18px"
            opacity={0.5}
            pt={pt}
            pl="8px"
          >
            $SHARD
          </Text>
        </Flex>
        <Image
          src="./modals/line-start.svg"
          mt="20px !important"
          mb="10px !important"
        />
        <LandButton text="Continue" onClick={onClose} />
      </VStack>
    </CommonModal>
  );
}
