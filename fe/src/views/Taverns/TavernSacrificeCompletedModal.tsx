import CommonModal from "@/components/CommonModal/Index";
import { TavernSource } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import {
  Box,
  Button,
  Flex,
  Image,
  ModalProps,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

interface IProps extends Omit<ModalProps , "children"> {
  type: 'CONFIRM' | 'SACRIFICE';
  itemId: number;
}
export default function TavernSacrificeCompletedModal({type, itemId = 2, onClose, ...props}:IProps) { 
  const item = TavernSource[itemId as keyof typeof TavernSource];

  const wBg = useMemo(() => { return type === 'SACRIFICE' ? 323 :  550}, [type])
  const hBg = useMemo(() => { return type === 'SACRIFICE' ? 489 :  544}, [type])
  const titleSize = useMemo(() => { return type === 'SACRIFICE' ? '24px' :  '32px'}, [type]);
  const desSize = useMemo(() => { return type === 'SACRIFICE' ? '16px' :  '24px'}, [type]);


  return (
    <CommonModal
      title={type === 'SACRIFICE' ? "SACRIFICE COMPLETED" : 'PURCHASE COMPLETE'}
      wBg={wBg}
      hBg={hBg}
      disableClose
      titleProps={{
        fontSize: titleSize,
      }}    
      onClose={onClose}
      {...props}
    >
      <VStack w="full" mt={{ lg : type === 'SACRIFICE' ? 0 : '30px'}} h="380px" display="flex"  justifyContent="space-between">
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{base: '15px', lg: desSize}}
          textAlign="center"
          w={type === 'SACRIFICE' ? '220px' : 'full'}
        >
          Thank you for making a purchase in our Tavern. <br />
          Good luck Settler in your Journeys.
          <br />
          <br />
          <chakra.span color="#FFA012">You have received:</chakra.span>
        </Text>
        <Flex
          w="143.24px"
          h="167.62px"
          bgImage="/taverns/completed-bg.svg"
          bgRepeat="no-repeat"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Box
            bgColor={item.color}
            w="91px"
            h="91px"
            borderRadius="full"
            position="absolute"
            filter="blur(25px)"
          />
          <Image src={`/taverns/imgs/${itemId}.svg`} zIndex={1} />
        </Flex>
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="18px"
          textTransform="uppercase"
        >
          {item.name}
        </Text>
        <Flex
          w="270px"
          h={{base: '47px', lg: "42px"}}
          bgImage="/taverns/continue-btn.svg"
          bgRepeat="no-repeat"          
          bgSize="contain"
          cursor='pointer'
          as={motion.div}
          borderRadius='12px'
          whileHover={{scale: 0.98}}
          onClick={onClose}
        />
      </VStack>
    </CommonModal>
  );
}
