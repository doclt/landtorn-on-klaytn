import CommonModal from "@/components/CommonModal/Index";
import { TextVariants } from "@/themes/theme";
import { ModalProps, VStack, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function LorakUpdateModal({ ...props }: IProps) {
  return (
    <CommonModal
      title="LORAK UPDATE"
      wBg={700}
      //@ts-ignore
      hBg={620}
      {...props}
    >
      <VStack w="full" minH="100% !important" py='20px' flex={1}>
        <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{base: '16px', lg: "24px"}}
            textAlign="center"
            maxW="450px"
          >
            We are excited to share some news with you - Lorak v2 is now live!{" "}
            <br /> <br />
        </Text>
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '16px', lg: "24px"}}
          textAlign="center"
          maxW="600px"
        >
          With this update we have reworked and optimized all of the smart
          contracts. Cost of participation is now 90% lower and you complete up
          to 20 Dungeon Raids in one TX. <br /> <br />
          New players don’t need to do any additional actions.
        </Text>

        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '16px', lg: "24px"}}
          textAlign="center"
          maxW="600px"
          color='#FFA012'
        > 
        <br />
          Old players - you will need to mint a new Satchel. All your old Spoils
          will disappear. Side note: we will reward your previous participation
          with a unique Spoil and more.
        </Text>

        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '16px', lg: "24px"}}
          textAlign="center"
          maxW="600px"
        >
          <br />
          Good luck and let the Gods of Death guide us.
        </Text>
      </VStack>
    </CommonModal>
  );
}
