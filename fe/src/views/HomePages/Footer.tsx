import React from "react";
import HomeContainer from "./HomeContainer";
import { Text, VStack } from "@chakra-ui/react";
import Socials from "@/components/Socials";
import { TextVariants } from "@/themes/theme";

export default function Footer() {
  return (
    <HomeContainer
      flexDirection="column"
      h={{ base:"250px", lg: "200px"}}
      position="relative"
      bgImage={{base: 'none', lg: "./footer-bg.png"}}
      bgRepeat="no-repeat"
      bgSize="contain"
      bgPosition="top"
      marginTop="-40px"
      paddingTop="42px"
      wrapProps={{
        bg: "#1D151F",
      }}
      // display={{base: 'none', lg: 'flex'}}
    >
      <VStack
        w="full"
      
        className="wow fadeInUp"
      >
        <Socials />
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="16px"
          mt="24px !important"
        >
          ©LandTorn 2023
        </Text>
      </VStack>
    </HomeContainer>
  );
}
