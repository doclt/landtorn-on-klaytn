import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { isWindowOs } from "@/utils";
import { Flex, FlexProps, HStack, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

interface IProps extends FlexProps {
  isLoading?: boolean;
  isDone?: boolean;
  textDone?: string;
  text: string;
  isLearnMore?: boolean;
}
export default function LandButton({ text, isLoading, isDone, textDone, isLearnMore, ...props }: IProps) {
  const {pt} = useGlobal();
  const bg = useMemo(() => {
    // if (isDone || isLoading) return "btn-done-bg.svg";
    // else
    if (isLearnMore) return 'learn-more.svg';
    return "btn-bg-1.svg";
  }, [isDone, isLoading, isLearnMore]);

  const blendMode = useMemo(() => {
    if (isDone || isLoading) return 'luminosity';
    return undefined;
  }, [isDone, isLoading, isLearnMore]);

  const opacity = useMemo(() => {
    if (isDone || isLoading) return 0.5;
    return 1;
  }, [isDone, isLoading, isLearnMore]);


  return (
    <Flex
      w={{base: '280px', lg: "340px"}}
      h={{base: '50px', lg: "49px"}}
      borderRadius="12px"
      bgImage={`./modals/${bg}`}
      bgRepeat="no-repeat"
      bgPosition='center'
      bgSize="contain"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      cursor='pointer'
      as={motion.div}
      _disabled={{cursor: ''}}
      whileHover={{ scale: 0.98 }}
      mt="5px !important"
      blendMode={blendMode}
      opacity={opacity}
      {...props}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
      >
        {!isLoading && (
          <Text 
            variant={TextVariants.WITH_TEXT_400} 
            fontSize={{base: '14px', lg: "22px"}}
           // mt={`${isWindowOs() ? -10 : 0}px !important`}
           pt={pt}
          >
            {isDone ? (textDone || "Done") : text}
          </Text>
        )}
        {isLoading && (
          <HStack justifyContent="center" alignItems="center">
            <Spinner color="rgba(255,255,255, 0.4)" mb="5px" />
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="18px"
              color="rgba(255,255,255, 0.4)"
            >
              Please wait.
            </Text>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
}
