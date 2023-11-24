import { MAX_WIDTH } from "@/themes/config";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  contentStyle?: FlexProps;
}
export default function LandingContainer({ children, contentStyle, ...props }: IProps) {
  return (
    <Flex
      flexDirection="row"
      w="full"
      maxW={`${MAX_WIDTH}px`}
      px={{ base: "10px", lg: "35px" }}
      justifyContent='center'
      alignItems='center'
      {...props}
    >
      <Flex w="full" h="full" alignSelf="center" maxW={{base: '356px', lg: "960px"}} flexDirection='column' {...contentStyle}>
        {children}
      </Flex>
    </Flex>
  );
}
