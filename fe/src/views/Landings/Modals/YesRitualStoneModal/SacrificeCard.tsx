import LandButton from "@/components/LandButton";
import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, HStack, Text, VStack, Box, Spacer, Center, Image, FlexProps } from "@chakra-ui/react";
import React from "react";
import SelectButton from "./SelectButton";
import { ISacrificeReward } from "@/types";
import { numberFormat } from "@/utils";

interface IProps extends FlexProps{
  isSelected?: boolean
  onSelect?:()=> void;
  item: ISacrificeReward;
}
export default function SacrificeCard({item, isSelected, onSelect, ...props}: IProps) {
  const { pt } = useGlobal();
  return (
    <Flex
      w="full"
      maxW="225px"
      h="195px"
      flexDirection="column"
      bgImage="./modals/mask-bg-225-195.svg"
      bgRepeat="no-repeat"
      bgPosition="center"
      border={isSelected ? '1px solid #DCFF00' : undefined}
      borderRadius="6px"      
      {...props}
    >
      <Flex
        h="28px"
        w="full"
        textTransform="uppercase"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant={TextVariants.WITH_TEXT} fontSize="16px" pt={pt}>
          {item.name || ''}
        </Text>
      </Flex>
      <Center flex={1}>
        <VStack w="80%" h="full" py="15px">
          <HStack w="full">
            <Text
              variant={TextVariants.WITH_ACTOR}
              fontSize="12px"
              color="rgba(255, 239, 215, 0.50)"
              w='120px'
            >
              Cost ETH:
            </Text>          
            <Flex
              w="140px"
              h="28px"
              position="relative"
              border="0.776px solid #919191"
              borderRadius="8px"
              alignItems="center"
              pl="5px"
            >
              <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px" pt={pt} w='full' textAlign='center' pr="20px">
                {item.fee.toFixed(6)}
              </Text>
              <Box 
                w='38px' 
                h='35px'
                position='absolute'
                right="-10px"
                bgImage='./sacrifices/eth.svg'
              />
            </Flex>
          </HStack>

          <HStack w="full" mt="10px !important">
            <Text
              variant={TextVariants.WITH_ACTOR}
              fontSize="12px"
              color="rgba(255, 239, 215, 0.50)"
              w='120px'
            >
              Reward $SHARD:
            </Text>
              
            <Flex
              w="84px"
              h="28px"
              position="relative"
              border="0.776px solid #919191"
              borderRadius="8px"
              alignItems="center"
            >
              <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px" pt={pt} w='full' textAlign='center' pr="20px">
                {item.shard}
              </Text>
              <Box 
                w='38px' 
                h='35px'
                position='absolute'
                right="-10px"
                bgImage='./sacrifices/shard.svg'
              />
            </Flex>
          </HStack>
          <Image src="./modals/line-start.svg" w='50%' my="10px !important" />
          <SelectButton 
            isSelected={isSelected}
            cursor='pointer'
            onClick={onSelect}
          />
        </VStack>
      </Center>
    </Flex>
  );
}
