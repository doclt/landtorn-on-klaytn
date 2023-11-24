import { TextVariants } from "@/themes/theme";
import { Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps {
  label: string;
}

export default function TabOne({ label }: IProps) {
  return (
    <Flex
      h={{ base: "42px", lg: "49px" }}
      w={{ base: "172px", lg: "360px" }}
      bgImage={{ base: "./tab-bg-mobile.svg", lg: "./tab-bg-1.svg" }}
      bgSize="cover"
      bgRepeat="no-repeat"
      justifyContent="flex-end"
      alignItems="center"
      cursor="pointer"
      as={motion.div}
      pr='10px !important'
      whileHover={{scale: 0.99}}
      position='relative'
    >
      <Image src="./torn-icon.png"
        position='absolute'
        left="-56px"
        w="165px"
        
      />
      <Text
        variant={TextVariants.WITH_TEXT}
        fontSize={{base: '14px', lg: "22px"}}
        textShadow="-2px -3px #270058"
        pt="11px"
      >
        {label}
      </Text>
    </Flex>
  );
}
