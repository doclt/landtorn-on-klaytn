import { useAppDispatch } from "@/reduxs/hooks";
import { Footer } from "@/views/HomePages";
import BlendingTheBest from "@/views/HomePages/BlendingTheBest";
import LandTornPlatform from "@/views/HomePages/LandTornPlatform";
import MainSection from "@/views/HomePages/MainSection";
import TornGames from "@/views/HomePages/TornGames";
import { Header } from "@/views/Landings";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Landing() {
  return (
    <Flex flexDirection="column"  w="full">
      <Flex
        w="full"
        justifyContent="center"
        bgColor="#1D151F"
        backdropBlur="blur(12.5px)"
        flexDirection="column"
        position='relative'
        alignItems='center'
      >
        <Header />
        <Flex
          w="full"
          bgImage="./navs/down.svg"
          h="40px"
          bgRepeat="no-repeat"
          position="absolute"
          bottom={0}
        />
      </Flex>
      <MainSection />
      <BlendingTheBest />
      <LandTornPlatform /> 
      <TornGames />
      <Footer />
    </Flex>
  );
}
