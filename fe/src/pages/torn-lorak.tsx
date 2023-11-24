import Layout from "@/layouts";
import HomeContainer from "@/views/HomePages/HomeContainer";
import { Header, WalletContainer } from "@/views/Landings";
import { TornLorakContainer } from "@/views/TornLoraks";
import { Flex } from "@chakra-ui/react";
import React from "react";

TornLorak.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function TornLorak() {
  return (
    <Flex flexDirection="column" w="full" position="relative">
      <Flex
        bg="linear-gradient(0deg, rgba(66, 20, 139, 0.35) 0%, rgba(157, 181, 6, 0.35) 100%)"
        w="full"
        maxW="1224px"
        h="1224px"
        borderRadius="full"
        position="absolute"
        filter="blur(150px);"
        alignSelf="center"
        left={{ lg: 0}}
        right={{ lg: 0}}
        bottom={{base: 0}}
        margin="0px auto"
      />

      <Flex
          display={{base: 'flex', lg: 'none'}}  
          bg="linear-gradient(180deg, rgba(66, 20, 139, 0.35) 0%, rgba(157, 181, 6, 0.35) 100%)"        
          w='full'        
          h='full'
          maxW="1224px"
          borderRadius="full"
          position="absolute"
          filter="blur(150px);"
          alignSelf="center"
          bottom={0}      
        />

      <Flex w="full" justifyContent="center" alignItems="center">
        <Header />
      </Flex>
      <HomeContainer>
        <WalletContainer />
      </HomeContainer>
      <TornLorakContainer />
    </Flex>
  );
}
