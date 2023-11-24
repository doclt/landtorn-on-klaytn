import Layout from "@/layouts";
import { MAX_WIDTH } from "@/themes/config";
import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import TotalEnergy from "@/views/Landings/components/TotalEnergy";

Size.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="landing">{page}</Layout>;
};

export default function Size() {
  return (
    <Flex
      w="full"
      minH="100vh"
      flexDirection="column"
      alignItems="center"
      position="relative"
      pb="100px"
    >
      <Flex
        w="full"
        height="full"
        borderRadius="full"
        position="absolute"
        zIndex={1}
        bgGradient="linear-gradient(180deg, rgba(66, 20, 139, 0.35) 0%, rgba(157, 181, 6, 0.35) 100%)"
        filter="blur(150px)"
      />
      <Flex
        w="full"
        maxW={`${MAX_WIDTH}px`}
        flexDirection="column"
        zIndex={2}
      > 

        <HStack>
          <TotalEnergy></TotalEnergy>
        </HStack>

      </Flex>
    </Flex>
  );
}
