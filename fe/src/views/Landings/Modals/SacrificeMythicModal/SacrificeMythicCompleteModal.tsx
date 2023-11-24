import CommonModal from "@/components/CommonModal/Index";
import { TextVariants } from "@/themes/theme";
import {
  Flex,
  Image,
  ModalProps,
  SimpleGrid,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import Mythic from "./Mythic";
import LandButton from "@/components/LandButton";
import MythicData from '@/configs/mythic-data.json';
import { PaladinType } from "@/types";

interface IProps extends Omit<ModalProps, "children"> {}
export default function SacrificeMythicCompleteModal({onClose,  ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { sacrificeResult } = useAppSelector((p) => p.account);

  return (
    <CommonModal
      isCentered={false}
      title="SACRIFICE COMPLETED"
      titleMbProps={{
        fontSize: "16px",
      }}
      onBack={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER))}
      wBg={700}
      hBg={620}
      disableClose
      onClose={onClose}
      {...props}
    >
      <VStack
        w="full"
        justifyContent="space-between"
        py={{ base: "10px", lg: "40px" }}
      >
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "24px" }}
          textAlign="center"
        >
          Your Journey has ended...
          <br />
          For now.
          <br />
          You can go back and create a new Settler. Good luck.
          <br /> <br />
          <chakra.span color="#FFA012">You have received:</chakra.span>
        </Text>

        <SimpleGrid
          mt={{ base: "0px", lg: "20px !important" }}
          w="fit-content"
          columns={{ base: 2, lg: sacrificeResult?.mythics.length || 4 }}
          justifyContent="center"
          gap="40px"
        >
          {sacrificeResult?.mythics.map((m) => {
            const mythic = MythicData.find(p=> p.id === m.tokenId);
            return (
              <Mythic
                color={mythic?.color || ''}
                index={mythic?.id || 2}
                type={(mythic?.type || 'Paladin') as PaladinType}
                isActive
                name={mythic?.name || ''}
                key={m.id}
                amount={m.amount}
              />
            );
          })}
        </SimpleGrid>
        <Flex py="20px" display={{ base: "none", lg: "flex" }}>
          <Image src="/modals/line-start.svg" />
        </Flex>
        <LandButton
          text="Continue"
          onClick={onClose}
        />
      </VStack>
    </CommonModal>
  );
}
