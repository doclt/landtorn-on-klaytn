import { TextVariants } from "@/themes/theme";
import {
  ModalOverlay,
  ModalContent,
  Modal,
  Image,
  ModalProps,
  Text,
  ModalHeader,
  ModalBody,
  ModalContentProps,
  Flex,
  TextProps,
  FlexProps,
  ModalHeaderProps,
  ImageProps,
} from "@chakra-ui/react";
import React from "react";
import MobileContent from "./MobileContent";
import { useGlobal } from "@/contexts/Globals";

interface IProps extends ModalProps {
  title: string;
  isBack?: boolean;
  wBg?: 323 | 496 | 550 | 700 | 830 | 989;
  hBg?:
    | 252
    | 368
    | 410
    | 489
    | 544
    | 574
    | 507
    | 560
    | 620
    | 656
    | 720
    | 740
    | 745
    | 819
    | 1020;
  onBack?: () => void;
  contentProps?: ModalContentProps;
  disableClose?: boolean;
  titleProps?: TextProps;
  titleMbProps?: TextProps;
  contentMobileProps?: FlexProps;
  headerModalProps?: ModalHeaderProps;
  closeProps?: ImageProps;
}
export default function CommonModal({
  title,
  isOpen,
  onClose,
  children,
  isBack,
  onBack,
  contentProps,
  hBg = 656,
  wBg = 496,
  disableClose,
  titleProps,
  titleMbProps,
  contentMobileProps,
  headerModalProps,
  closeProps,
  ...props
}: IProps) {
  const { pt } = useGlobal();
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size={{ base: "sm", lg: "3xl" }}
      {...props}
    >
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        w="full"
        maxW={{ base: "full", lg: `${wBg}px` }}
        bgColor="transparent"
        boxShadow="none"
        {...contentProps}
      >
        <Flex
          flexDirection="column"
          w="full"
          maxW={{ base: "full", lg: `${wBg}px` }}
          minH={{ base: "300px", lg: `${hBg}px` }}
          position="relative"
          bgImage={{
            base: `./modals/mb/mask-bg-mb.png`,
            lg: `./modals/mask-bg-${wBg}-${hBg}.svg`,
          }}
          bgRepeat="no-repeat"
          bgSize="contain"
          bgColor="transparent"
          boxShadow="none"
          display={{ base: "none", lg: "flex" }}
        >
          <ModalHeader {...headerModalProps}>
            {isBack && (
              <Image
                src="./modals/back.svg"
                position="absolute"
                left="0px"
                top={{ base: "0px", lg: "10px" }}
                w={{ base: "60px", lg: "68px" }}
                h={{ base: "60px", lg: "68px" }}
                cursor="pointer"
                onClick={onBack}
              />
            )}
            <Text
              variant={TextVariants.WITH_TEXT}
              textAlign="center"
              fontSize={{ base: "16px", lg: "32px" }}
              mt="10px"
              textTransform="uppercase"
              zIndex={1}
              ptp={pt}
              {...titleProps}
            >
              {title}
            </Text>
            {!disableClose && (
              <Image
                src="./modals/close.svg"
                cursor="pointer"
                w={{ base: "60px", lg: "68px" }}
                h={{ base: "60px", lg: "68px" }}
                position="absolute"
                right={{ base: "-2px", lg: "10px" }}
                top={{ base: "-2px", lg: "10px" }}
                onClick={onClose}
                {...closeProps}
              />
            )}
          </ModalHeader>
          <ModalBody w="full"
          >
            {children}
          </ModalBody>
        </Flex>
        <MobileContent
          disableClose={disableClose}
          isBack={isBack}
          title={title}
          titleMbProps={titleMbProps}
          onClose={onClose}
          display={{ base: "flex", lg: "none" }}
          contentMobileProps={contentMobileProps}
        >
          {children}
        </MobileContent>
      </ModalContent>
    </Modal>
  );
}
