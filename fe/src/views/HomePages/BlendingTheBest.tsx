import React from "react";
import HomeContainer from "./HomeContainer";
import { Flex, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import { blendings } from "@/configs/strings";
import { fonts } from "@/themes/config";

export default function BlendingTheBest() {
  return (
    <>
      {/* <Flex
        w="full"
        h="100px"
        bgImage="./1/blens/bg-1.png"
        bgRepeat="no-repeat"
        bgSize="cover"
        display={{ base: "none", lg: "flex" }}
      /> */}
      <HomeContainer
        minH="400px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pb="60px"
        pt={{base: '60px', lg: 0}}
        wrapProps={{
          position: "relative",
          bgColor: "white",
        }}
        containerProps={{
          bgImage: "./1/blens/union.png",
          bgRepeat: "no-repeat",
          bgSize: "contain",
          pt: {base: '20px', lg: "70px"},
          mt: {base: 0, lg:"-20px"}
        }}
      >
        <Image
          src="./1/platforms/wing.png"
          position="absolute"
          right="0px"
          bottom="-200px"
          w="30%"
          zIndex={0}
        />
        <Flex w="full" flexDirection="column"  zIndex={1}>
          <Text
            variant={TextVariants.WITH_TEXT}
            color="#1D151F"
            fontSize={{ base: "24px", lg: "42px" }}
            mb="30px"
            className="wow fadeIn"
            textAlign='center'
          >
            Blending the best of both worlds to power the future of BASE Gaming
          </Text>

          <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} columnGap="20px">
            {new Array(2).fill(0).map((_, index) => (
              <Flex
                key={index}
                bgColor="#FFEFD7"
                border="1px solid #FFE9C8"
                borderRadius="12px"
                h={{base: '282px', lg:"380px"}}
                flexDirection="column"
                justifyContent="space-between"
                overflow="hidden"
                position="relative"
                mt="25px"
                className="wow fadeIn"
                data-wow-delay={`${0.5 * (index + 1)}s`}
              >
                <HStack w="full" justifyContent="space-evenly" p="17px 36px">
                  <Image
                    src={`./1/blens/${index + 1}.svg`}
                    w={{ base: "112px", lg: '159px' }}
                  />
                  <Text
                    variant={TextVariants.WITH_TEXT}
                    color="#1D151F"
                    w={{ base: "70%", lg: "50%" }}
                    fontSize={{ base: "24px", lg: "42px" }}
                  >
                    {blendings[(index + 1) as keyof typeof blendings].title}
                  </Text>
                </HStack>
                <Flex
                  w="45px"
                  h="45px"
                  bgColor="#FFEFD7"                 
                  zIndex={3}
                  position="absolute"
                  display={{base: 'none', lg: "block"}}
                  right="46px"
                  top="116px"
                  transform={"rotate(45deg)"}
                  borderRadius="5px"                  
                />
                <Flex
                  w="full"
                  h="230px"
                  bg="rgba(29, 21, 31, 0.05)"
                  pt="40px"
                  px="17px"
                  position="relative"
                >
                  <Text
                    variant={TextVariants.WITH_TEXT_400}
                    color="#1D151F"
                    fontSize={{ base: "16px", lg: "22px" }}
                    fontFamily={fonts.Actor}
                    lineHeight="160%"
                    fontStyle="normal"
                  >
                    {blendings[(index + 1) as keyof typeof blendings].des}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      </HomeContainer>
    </>
  );
}
