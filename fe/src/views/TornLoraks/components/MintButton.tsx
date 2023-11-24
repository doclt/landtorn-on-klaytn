import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends FlexProps {}

export default function MintButton({...props}:IProps) {
  return (
    <Flex
      w="140px"
      h="46px"
      position="absolute"
      bottom="-80px"
      left={0}
      right={0}
      margin="0px auto"
      filter="drop-shadow(0px 5px 20px rgba(131, 62, 255, 0.50))"
      cursor="pointer"
      as={motion.div}
      whileHover={{ scale: 0.98 }}
      transition={"all .25s ease-in-out"}
      {...props}
    >
      <Image src="./torn-loraks/mint-btn.svg" bgSize="cover" />
    </Flex>
  );
}
