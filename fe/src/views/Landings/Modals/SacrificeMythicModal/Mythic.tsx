import { TextVariants } from "@/themes/theme";
import { PaladinType } from "@/types";
import { Box, BoxProps, Image, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IProps extends BoxProps {
  color: string;
  index: number;
  type: PaladinType;
  paladinId?: number;
  ironFistId?: number;
  isActive?: boolean;
  name?: string;
  amount?: number;
}
export default function Mythic({
  color = "#A9FF3C",
  index = 1,
  type,
  paladinId,
  ironFistId,
  isActive,
  name,
  amount,
  ...props
}: IProps) {
  const imgWidth = useMemo(() => {
    if (index === 6 && type === "Paladin") return "52px";
    if (index === 1) return "full";
    return "60px";
  }, [type, index]);

  return (
    <VStack>
      <Box
        w="94px"
        h="110px"
        bgImage="./torn-loraks/mythic-bg.svg"
        bgSize="cover"
        justifyContent="center"
        alignItems="center"
        display="flex"
        blendMode={isActive ? undefined : "luminosity"}
        opacity={isActive ? 1 : 0.95}
        {...props}
      >
        {isActive && (
          <Box
            bgColor={color}
            w={{ base: "30px", lg: "60.34px" }}
            h={{ base: "40px", lg: "70.1px" }}
            borderRadius="full"
            filter={`blur(15px)`}
            mixBlendMode={index === 1 ? "overlay" : undefined}
            position="absolute"
            zIndex={index === 1 ? 12 : 2}
          />
        )}
        <Image
          src={`./torn-loraks/icons/ids/${index}.png`}
          objectFit="contain"
          opacity={isActive ? 1 : 0.5}
          w={imgWidth}
          blendMode={isActive ? undefined : "luminosity"}
          zIndex={5}
        />
      </Box>
      <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px">
       {amount && amount > 1 ? amount : ''} {name}
      </Text>
    </VStack>
  );
}
