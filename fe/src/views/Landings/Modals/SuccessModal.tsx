import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { TextVariants } from "@/themes/theme";
import { VStack, Text, ModalProps, HStack, Image } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function SuccessModal({ onClose, ...props }: IProps) {
  return (
    <CommonModal
      onClose={onClose}
      wBg={700}
      hBg={720}
      title="SUCCESS!"
      {...props}
    >
      <VStack w="full" pt={{base: '10px', lg: "20px"}}>
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "20px", lg: "26px" }}
          mb="-15px !important"
          mt="-5px !important"
        >
          Welcome Settler! <br /> You are now in the lands of Lorak.
        </Text>
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "22px" }}
          mt="15px !important"
        >
          After getting a drink at the Tavern you learn that:
        </Text>

        <HStack w="90%" minH="50px">
          <Image src="./modals/success/1.svg" mr="10px" />
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "12px", lg: "18px" }}
            color="#FFA012"
          >
            The  currency of this world is called $SHARDS. You can purchase $SHARDS on the marketplace. 
          </Text>
        </HStack>
        <HStack w="90%" minH="50px" my="8px !important">
          <Image src="./modals/success/2.svg" mr="10px" />
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "12px", lg: "18px" }}
            color="#FFA012"
          >
            You can enchant your Settler with $SHARDS to be able to find Mythics NFTs. A specific collection of Mythics will allow you to mint a TornLord, which will be core to the launch of $Torn. 
          </Text>
        </HStack>
        <HStack w="90%" minH="50px">
          <Image src="./modals/success/3.svg" mr="10px" />
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "12px", lg: "18px" }}
            color="#FFA012"
          >
            You can also find Ritual Stones in the Dungeons. They allow for you to sacrifice your Settler and receive $TORN, based on your Settler $SHARDS holdings. 
          </Text>
        </HStack>

        <Image src="./modals/line-start.svg" mb="10px !important" />
        <Text
          w="full"
          maxW="600px"
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "22px" }}
        >
          Unwillingly the Keeper shares that most Settlers don’t care that much
          about Shards, they go inside Dungeons to find Mythical Items. It is
          foretold that if you find the right items you can become a TornLord.
          <br /> <br />
          A small cast created by the Shadow Council having immense power and benefits in the Torn Worlds. 
          <br />
         
        </Text>
        <LandButton text="Continue" onClick={onClose} mt="10px !important" />
      </VStack>
    </CommonModal>
  );
}
