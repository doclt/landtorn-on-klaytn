import { BadsData } from "@/configs/strings";
import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, Text, Image, FlexProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  index: number;
  active?: boolean;
}
export default function BadItem({ index, active, ...props }: IProps) {
  const bad = BadsData[(index + 1) as keyof typeof BadsData];
  const {pt} = useGlobal();

  return (
    <Flex
      flexDirection="row"
      w={{ base: "171px", lg: `160px` }}
      h={{ base: "42px", lg: `38px` }}
      alignItems="center"
      justifyContent='center'
      gap='20px'
      px="20px"
      filter={`saturate(${active ? 1 : 0})`}
      mixBlendMode={`${active ? 'color' : 'luminosity'}`}
      opacity={`${active ? 1 : 0.5}`}
      bgImage={{ base: "./games/bads/bg-1-mb.svg", lg: `./games/bads/bg-2.svg` }}
      bgSize="contain"
      bgRepeat="no-repeat"
      cursor="pointer"
      {...props}
    >
      <Image
        src={`./games/bads/${index + 1}.svg`}
        w={{ base: "16px", lg: index === 3 ? '25px' : "18px" }}
      />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "24px" }}
          pt={pt}
        >
          {bad}
        </Text>
    </Flex>
  );
}
