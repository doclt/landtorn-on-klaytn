import LandButton from "@/components/LandButton";
import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, HStack, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

interface IProps extends FlexProps {
  index: number;
  text: string;
  btnText: string;
  died?: boolean;
  onBtnClick?: () => void;
}
export default function SettlerCard({
  index,
  text,
  btnText,
  died,
  onBtnClick,
  ...props
}: IProps) {
  const { pt } = useGlobal();
  return (
    <Flex
      bgColor="#1B1B1B"
      borderRadius="8px"
      backdropFilter="blur(2.58px)"
      flexDirection="column"
      p={{base: '10px', lg: "17px 20px"}}
      justifyContent="space-between"
      border="1px solid #1B1B1B"
      className="settler-card-manage"
      mixBlendMode={died ? 'luminosity' : 'normal'}
      {...props}
    >
      <Stack
        direction={{ base: "column", lg: "row" }}
        w="full"
        gap="16px"
        alignItems={{base: 'center', lg: "flex-start"}}
      >
        <Image
          src={`/modals/new-settlers/${index + 1}.png`}
          w={{base: '90px', lg: "128px"}}
          h={{base: '90px', lg: "128px"}}
          objectFit="contain"
        />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "12px", lg: "18px" }}
          pt={pt}
          w={{base: "127px", lg: 'full'}}

          textAlign={{ base: "center", lg: "start" }}
        >
          {text}
        </Text>
      </Stack>
      <Flex
        w={{ base: "127px", lg: "445px" }}
        h={{ base: "56px", lg: "48px" }}
        ml={{base: '-3px', lg: "-10px"}}
        mt="10px"
        bgImage={{base: "/modals/new-settlers/btn-mb.svg", lg: "/modals/new-settlers/btn.svg"}}
        justifyContent="center"
        alignItems="center"
        cursor="pointer"
        _hover={{ bgImage: {base:"/modals/new-settlers/btn-mb-active.svg",  lg: "/modals/new-settlers/btn-active.svg"} }}
        onClick={() => !died && onBtnClick && onBtnClick()} 
        bgRepeat='no-repeat'
        bgSize='contain'
        borderRadius='8px'
      >
        <Text variant={TextVariants.WITH_TEXT_400} pt={pt} 
          w='full'
          textAlign='center'
          fontSize={{base: '18px', lg: "22px"}}>
          {btnText}
        </Text>
      </Flex>
    </Flex>
  );
}
