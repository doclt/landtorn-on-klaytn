import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function OtherLayout({ children }: Props) {
  return (
      <Flex
        w="100%"
        margin="0px auto"
        flexDirection="column"
        alignItems="center"
      >
        <Flex
          flexDirection="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          {children}
        </Flex>
      </Flex>
  );
}
