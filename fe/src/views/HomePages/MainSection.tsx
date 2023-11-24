import React from "react";
import HomeContainer from "./HomeContainer";
import { Flex, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import { menus } from "@/configs/strings";

export default function MainSection() {
  return (
    <HomeContainer
      minH={{ base: "200px", lg: "650px" }}
      wrapProps={{
        bgImage: "./1/blens/bg.png",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        bgPosition: "center right",
        backgroundAttachment: "fixed",
      }}
      justifyContent="flex-start"
      position="relative"
      bgImage="./header-bg.png"
      bgRepeat="no-repeat"
      bgSize="contain"
      bgPosition="top"
      mt="-5px"
    >
      <VStack w="full" alignItems="flex-start" py={{ base: "100px", lg: 0 }}>
        <Flex
          bgColor="#1D151F"
          w={{ base: "full", lg: "678px" }}
          h={{ base: "126px", lg: "242px" }}
          borderRadius="5px"
          backdropFilter="blur(5px)"
          p={{ base: "13px 10px", lg: "32px 24px" }}
          flexDirection="column"
          className="wow fadeInDown"
        >
          <Text
            variant={TextVariants.WITH_TEXT}
            fontSize={{ base: "24px", lg: "52px" }}
            mb="20px"
            textAlign={{ base: "center", lg: "start" }}
          >
            Rest by the fire, traveller. <br />A new world awaits.
          </Text>
          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "14px", lg: "24px" }}
            color="#FFEFD7"
            textAlign={{ base: "center", lg: "start" }}
          >
            LandTorn is building the BASE hub for games and developing its own
            unique IP-verse of games.
          </Text>
        </Flex>

        <Flex
          bgImage="./1/blens/tab-bg.svg"
          w={{ base: "full", lg: "678px" }}
          h={{ base: "50px", lg: "87px" }}
          bgSize="cover"
          alignItems="center"
          pt="20px"
          position="relative"
          mt={{ base: "20px !important" }}
          pl={{ base: "60px", lg: "120px" }}
          className="wow fadeInUp"
          data-wow-delay="0.5s"
        >
          <Text
            variant={TextVariants.WITH_TEXT}
            fontSize={{ base: "14px", lg: "26px" }}
          >
            LORAK IS NOW LIVE ON BASE MAINNET
          </Text>
          <Link href={`${menus[1].url}`}>
            <Image
              w={{ base: "69px", lg: "130px" }}
              src="./1/blens/play-btn.svg"
              cursor="pointer"
              position="absolute"
              right="10px"
              top={{ base: "18px", lg: "25px" }}
              as={motion.img}
              whileHover={{ scale: 0.98 }}
            />
          </Link>
        </Flex>
      </VStack>
    </HomeContainer>
  );
}
