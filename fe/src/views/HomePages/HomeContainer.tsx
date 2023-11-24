import { MAX_WIDTH } from "@/themes/config";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  wrapProps?: FlexProps;
  containerProps?: FlexProps;
}
export default function HomeContainer({
  wrapProps,
  children,
  containerProps,
  ...props
}: IProps) {
  return (
    <Flex
      w="full"
      justifyContent="center"
      alignItems="center"
      {...containerProps}
    >
      <Flex w="full" justifyContent="center" alignItems="center" {...wrapProps}>
        <Flex
          flexDirection="row"
          w="full"
          maxW={`${MAX_WIDTH}px`}
          px={{ base: "10px", lg: "0px" }}
          justifyContent="center"
          alignItems="center"
          {...props}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
