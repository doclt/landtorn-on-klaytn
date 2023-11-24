import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  isSelected?: boolean;
}
export default function SelectButton({isSelected, ...props}:IProps) {
  const { pt } = useGlobal();
  return (
    <Flex
      w="190px"
      h="29.6px"
      bgImage={`./sacrifices/btn-${isSelected ? 'selected' : 'select'}.svg`}
      bgRepeat="no-repeat"
      justifyContent='center'
      alignItems='center'
      {...props}
    >
      <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px" pt={pt}>
        Select
      </Text>
    </Flex>
  );
}
