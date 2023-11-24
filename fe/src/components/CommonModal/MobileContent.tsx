import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import {
  Flex,
  HStack,
  Text,
  Image,
  FlexProps,
  TextProps,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  title: string;
  titleMbProps?: TextProps;
  isBack?: boolean;
  contentMobileProps?: FlexProps;
  onBack?: () => void;
  disableClose?: boolean;
  onClose?: () => void;
}
export default function MobileContent({
  title,
  children,
  isBack,
  onBack,
  disableClose,
  onClose,
  titleMbProps,
  contentMobileProps,
  ...props
}: IProps) {
  const {pt} = useGlobal();
  return (
    <Flex
      w="full"
      maxW="323px"
      margin="0px auto !important"
      bgImage="./modals/mb/body-repeat.svg"
      bgRepeat="repeat-y"
      position="relative"
      mt="10px"      
      {...props}
    >
      <Flex
        w="full"
        bgImage="./modals/mb/head-bg.svg"
        bgRepeat="no-repeat"
        minH="350px"
        flexDirection="column"
      >
        <HStack h="55px" w="full">
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
            fontSize={{ base: "20px", lg: "32px" }}
            mt="10px"
            w="full"
            textTransform="uppercase"
            zIndex={1}
            pt={pt}
            {...titleMbProps}
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
              onClick={() => onClose && onClose()}
            />
          )}
        </HStack>
        <Flex w="full" 
          flexDirection='column' 
          p="15px"          
          {...contentMobileProps}
        >
        {children}
        </Flex>
      </Flex>
      <Flex
        w="full"
        h="30px"
        bgImage="./modals/mb/mask-mb-footer.svg"
        position="absolute"
        bottom={"-10px"}
        bgRepeat="no-repeat"
      />
    </Flex>
  );
}
