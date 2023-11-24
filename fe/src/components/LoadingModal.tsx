import { TextVariants } from "@/themes/theme";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ModalProps,
  Image,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends Omit<ModalProps, "children" | "onClose"> {}
export default function LoadingModal({ isOpen, ...props }: IProps) {

  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}} 
    closeOnOverlayClick={false}
    {...props}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        w="full"
        minH="50px"
        bgRepeat="no-repeat"
        bgColor="rgba(0, 0, 0, 0.9)"
        justifyContent='center'
        alignItems='center'
        py='50px'
        borderRadius="12px"
      >
       <Spinner color="#FFEFD7" />
       <Text variant={TextVariants.WITH_TEXT_400} mt="10px" color='#FFEFD7'>Please wait...</Text>
      </ModalContent>
    </Modal>
  );
}
