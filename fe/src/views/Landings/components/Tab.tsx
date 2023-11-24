import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

interface IProps extends FlexProps{
  label: string;
  onClick?: () => void;
}

export default function Tab({ label, ...props }: IProps) {
  const {pt} =useGlobal();
  return (
    <Flex
      h={{ base: "24px", lg: "38px" }}
      w={{ base: "100px", lg: "306px" }}
      bgImage={{ base: "./tab-bg-mobile.svg", lg: "./tab-bg-2.svg" }}
      bgSize="contain"
      bgRepeat="no-repeat"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      as={motion.div}
      whileHover={{scale: 0.99}}
      {...props}     
    >
      <Text
        variant={TextVariants.WITH_TEXT}
        fontSize={{base: '11px', lg: "18px"}}
        textShadow="-2px -3px #270058"
        textTransform="uppercase"
        pt={pt}
      >
        {label}
      </Text>
    </Flex>
  );
}
