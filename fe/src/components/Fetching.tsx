import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, HStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  isFetching: boolean;
}
export default function Fetching({ isFetching, ...props }: IProps) {
  if (!isFetching) return null;
  return (
    <Flex
      w="100% !important"
      h="100% !important"
      flex={1}
      position="absolute"
      bg="blackAlpha.800"
      marginTop="-10px"
      borderRadius="12px"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <HStack>
        <Spinner color="rgba(255,255,255, 0.5)" />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          mt="10px !important"
          color="rgba(255,255,255, 0.5)"
          fontSize="16px"
        >
          Please wait...
        </Text>
      </HStack>
    </Flex>
  );
}
