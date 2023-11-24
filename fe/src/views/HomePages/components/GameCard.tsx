import { TextVariants } from "@/themes/theme";
import {
  Flex,
  FlexProps,
  HStack,
  Image,
  ImageProps,
  Stack,
  Text,
  TextProps,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  index: number;
  text: string;
  imgProps?: ImageProps;
  desProps?: TextProps;
}
export default function GameCard({ index, text, imgProps, desProps, ...props }: IProps) {
  return (
    <Flex
      w="full"
      h={{ base: "240px", lg: "170px" }}
      maxW="440px"
      borderRadius="12px"
      border="1px solid #919191"
      backdropFilter="blur(4px)"
      bgColor="rgba(40, 29, 43, 0.75)"
      p="46px"
      className="wow fadeIn"
      data-wow-delay={`${0.5 * (index + 1)}s`}
      {...props}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        w="full"
        flex={1}
        justifyContent="center"
        alignContent="center"
      >
        <Image
          src={`./1/games/logos/${index}.png`}
          w="105px"
          margin={{ base: "0px auto", lg: 0 }}
          {...imgProps}
        />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          color="#FFEFD7"
          fontSize={{ base: "18px", lg: "16px" }}
          ml={{ base: 0, lg: "62px !important" }}
          textAlign={{ base: "center", lg: "start" }}
          {...desProps}
        >
          {text}
        </Text>
      </Stack>
    </Flex>
  );
}
