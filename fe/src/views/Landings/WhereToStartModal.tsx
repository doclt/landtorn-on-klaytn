import { gitbook_url } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  Button,
  ModalProps,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function WhereToStartModal({
  isOpen,
  onClose,
  ...props
}: IProps) {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="full"
        h="full"
        maxW="496px"
        bgImage="./modals/bg.svg"
        bgRepeat="no-repeat"
        bgColor="transparent"
        minH="870px"
        position="relative"
        mx={{ base: "20px", lg: 0 }}
        bgSize="contain"
      >
        <Image
          src="./modals/close.svg"
          cursor="pointer"
          w="48px"
          h="48px"
          position="absolute"
          right={{ base: "-15px", lg: "-20px" }}
          top={-5}
          onClick={onClose}
        />

        <VStack w="full" p={10} pt={{base: '20px', lg: "28px"}}>
          <Text
            variant={TextVariants.WITH_TEXT}
            textAlign="center"
            fontSize={{ base: "24px", lg: "32px" }}
            w="full"
          >
            Welcome to Lorak, Settler! Battle to get spoils and shards.
          </Text>
          <Image
            src={"./modals/img.png"}
            mt={{ base: "30px !important", lg: "10px" }}
            w={{ base: "168px", lg: "237px" }}
            h={{ base: "224px", lg: "315px" }}
            display={{ base: "none", lg: "block" }}
          />

          <Image
            src={"./modals/img-mobile.png"}
            mt={{ base: "30px !important", lg: "10px" }}
            w={{ base: "168px", lg: "237px" }}
            h={{ base: "224px", lg: "315px" }}
            display={{ base: "block", lg: "none" }}
          />

          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            We are building a BASE-centric gaming platform LandTorn and multiple
            games with it around the TORN IP. Lorak is a game, where you can
            mint TORN NFTs, participate in the story, get $shards and much more.
          </Text>

          <Link href={gitbook_url} target="_blank">
            <Button
              bgColor="transparent"
              _hover={{ bgColor: "transparent" }}
              _focus={{ bgColor: "transparent" }}
              as={motion.button}
              whileTap={{ scale: 0.98 }}
              mt={{ base: "0px !important", lg: "5px !important" }}
              mb={{ base: "0px !important", lg: "5px !important" }}
              w={{ base: "220px", lg: "254px" }}
              h={{ base: "42px", lg: "48px" }}
            >
              <Image src="./modals/lore-btn.png" />
            </Button>
          </Link>

          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            Learn about the story behind the Lorak world.
          </Text>
          <Link href={gitbook_url} target="_blank">
            <Button
              bgColor="transparent"
              _hover={{ bgColor: "transparent" }}
              _focus={{ bgColor: "transparent" }}
              as={motion.button}
              whileTap={{ scale: 0.98 }}
              mt={{ base: "0px !important", lg: "5px !important" }}
              mb={{ base: "0px !important", lg: "5px !important" }}
              w={{ base: "220px", lg: "254px" }}
              h={{ base: "42px", lg: "48px" }}
            >
              <Image src="./modals/tutorial-btn.png" />
            </Button>
          </Link>
          <Text
            textAlign="center"
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "20px" }}
          >
            Here you can find step-by-step explanations and FAQ for the Torn NFT
            mint.
          </Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
