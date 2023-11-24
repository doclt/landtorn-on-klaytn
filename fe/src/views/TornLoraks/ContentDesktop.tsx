import { Flex, FlexProps, Image } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {}
export default function ContentDesktop({ children, ...props }: IProps) {
  return (
    <Flex
      w="530px"
      h="530px"
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
      zIndex={1}
      {...props}
    >
      <Flex
        w="530px"
        h="530px"
        borderRadius="full"
        bgColor="rgba(66, 20, 139, 0.35)"
        position="absolute"
        filter="blur(150px)"
      />
      <Flex
        w="480px"
        h="480px"
        borderRadius="full"
        border="1px solid #848484"
        justifyContent="center"
        alignItems="center"
        position="relative"
        zIndex={2}
        mt="50px"
      >
        <Flex
          w="438px"
          h="438px"
          borderRadius="full"
          border="1px solid #848484"
          justifyContent="center"
          alignItems="center"
        >
          <Flex width="384.473px" h="312.807px" justifyContent="center">
            <Flex
              width="384.473px"
              h="312.807px"
              bgImage="/torn-loraks/blur-1.png"
              filter="blur(44.5px)"
              position="absolute"
            />
            <Image
              src="/torn-loraks/bg-1.svg"
              zIndex={10}
              position="absolute"
              top="0px"
            />
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
