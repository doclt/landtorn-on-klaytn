import { fonts } from "@/themes/config";
import { Button, ButtonProps, Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {}
export default function LandTornButton({ ...props }: IProps) {
  return (
    <Flex
      w="fit-content"
      fontFamily={fonts.Mirza}
      fontSize="28px"
      fontWeight="400"
      fontStyle="normal"
      color="#FFEFD7"
      bgImage="./btn-bg.svg"
      bgRepeat="no-repeat"
      flexShrink={0}
      p="12px"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      display="flex"
      borderRadius="12px"
      minW="350px !important"
      boxShadow="0px 4px 20px 0px rgba(0, 0, 0, 0.25)"
      bgSize="auto"
      {...props}
    >
      SHORT EXPLANATION
    </Flex>
  );
}
