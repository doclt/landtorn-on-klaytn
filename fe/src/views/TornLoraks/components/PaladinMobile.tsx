import { TextVariants } from "@/themes/theme";
import { PaladinType } from "@/types";
import { Flex, Image, Text, Box, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";


interface IProps extends FlexProps {
  type: PaladinType;
  isActive?: boolean;
}

export default function PaladinIronFistMobile({type, isActive, ...props}: IProps) {

  const icon = useMemo(() => {
    if (type==='Paladin') return 'paladin';
    return 'iron-fist';
  }, [type]);

  const name = useMemo(() => {
    if (type==='Paladin') return 'Paladin';
    return 'Iron Fist';
  }, [type]);

  const filter = useMemo(() => {
    if (!isActive) return 'saturate(0)';
    return "drop-shadow(0px 0px 8px #883CFF)";
  }, [isActive]);

  return (
    <Flex 
      alignItems='center'
      flexDirection={type === 'Paladin' ? 'row' : 'row-reverse'}
      cursor='pointer'
      as={motion.div}
      whileHover={{scale: 1.02}}
      transition='0.3s linear'
      filter={filter}
      mixBlendMode={`${isActive ? "normal" : "luminosity"}`}
      opacity={isActive ? 1 : 0.7} 
      w='173px'
      {...props}   
    >      
    <Flex>
      <Flex 
        w='115.629px' 
        h='40.81px'
        bgImage='./torn-loraks/bg-content-mb.svg'
        bgRepeat='no-repeat'
        bgSize='cover'
        justifyContent='center'
        alignItems='center'
      >
        <Text variant={TextVariants.WITH_TEXT} pt="10px" fontSize='18px'>{name}</Text>
      </Flex>
    </Flex>
    <Box
      w="78.645px"
      h="92.5px"
      bgImage={`./torn-loraks/${icon}-mb.svg`}
      bgSize='contain'
      bgRepeat='no-repeat'
      bgPosition='center'
      ml={type==='Paladin'? "-20px" : "0px"}
      mr={type==='Paladin'? "0px" : "-20px"}
      zIndex={1}
    />
    </Flex>
  );
}
