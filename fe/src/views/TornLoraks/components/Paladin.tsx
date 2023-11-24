import { TextVariants } from "@/themes/theme";
import { PaladinType } from "@/types";
import { Flex, Text, Box, FlexProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

interface IProps extends FlexProps {
  type: PaladinType;
  isActive?: boolean;
}

export default function PaladinIronFist({type, isActive, ...props}: IProps) {

  const icon = useMemo(() => {
    if (type==='Paladin') return 'paladin';
    return 'iron-fist';
  }, [type]);

  const name = useMemo(() => {
    if (type==='Paladin') return 'Paladin';
    return 'Iron Fist';
  }, [type]);

  const position = useMemo(() => {
    if (type === 'Paladin') return {top: -60, left: -200};
    return {top: -60, right: -200};
  }, [type]);

  const filter = useMemo(() => {
    if (!isActive) return 'saturate(0)';
    return "drop-shadow(0px 0px 20px #883CFF)";
  }, [isActive]);

  return (
    <Flex 
      w="335px" 
      h="200px"
      alignItems='center'
      position='absolute'      
      top={`${position?.top}px`}
      left={`${position?.left}px`}
      right={`${position?.right}px`}
      flexDirection={type === 'Paladin' ? 'row' : 'row-reverse'}
      cursor='pointer'
      as={motion.div}
      whileHover={{scale: 1.02}}
      transition='0.3s linear'
      filter={filter}
      mixBlendMode={`${isActive ? "normal" : "luminosity"}`}
      opacity={isActive ? 1 : 0.9}   
      flexShrink={0}
      {...props}   
    >      
    <Flex>
      <Flex 
        w='221px' 
        h='78px'
        bgImage={'./torn-loraks/bg-content.svg'}
        bgRepeat='no-repeat'
        bgSize='cover'
        justifyContent='center'
        alignItems='center'
      >
        <Text variant={TextVariants.WITH_TEXT} pt="10px" fontSize='32px'
          color={isActive ? '#FFEFD7': '#5A5A5A'}
        >{name}</Text>
      </Flex>
    </Flex>
      <Box
        w="144px"
        h="203px"
        bgImage={`../torn-loraks/${icon}.svg`}
        bgSize='contain'
        bgRepeat='no-repeat'
        bgPosition='center'
        ml={type==='Paladin'? "-30px" : "0px"}
        mr={type==='Paladin'? "0px" : "-30px"}
        zIndex={1}
      />
    </Flex>
  );
}
