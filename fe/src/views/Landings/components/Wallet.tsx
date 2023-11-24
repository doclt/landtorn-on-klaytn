import { Flex, FlexProps, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useAccount } from "wagmi";

interface IProps extends FlexProps {}
export default function Wallet({...props}: IProps) {
  const {isConnected} = useAccount();
  if (isConnected) return null;
  return (
    <Flex
      as={motion.div}
      w={{base: '105px', lg:"140px"}}
      h={{base: '28px', lg:"38px"}}
      bgImage="./wallets/wallet-bg.png"
      bgSize="cover"
      cursor="pointer"
      whileHover={{scale: 0.98}}
      {...props}
    >
      
    </Flex>
  );
}
