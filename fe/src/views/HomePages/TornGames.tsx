import React from "react";
import HomeContainer from "./HomeContainer";
import { Image, VStack, Flex, Stack } from "@chakra-ui/react";
import GameCard from "./components/GameCard";

export default function TornGames() {
  return (
    <>
      <HomeContainer
        minH="900px"
        wrapProps={{
          bgImage: "./1/games-bg.png",
          bgRepeat: "no-repeat",
          bgSize: "cover",
          bgPosition: "center",
          mb: "-10px",
        }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        containerProps={
          {
            // marginBottom: { base: "110px", lg: "0px" },
          }
        }
      >
        <Flex
          w="full"
          justifyContent="space-between"
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Image
            src="./1/games/1.png"
            w="268px"
            h="402px"
            mx="10px"
            className="wow fadeIn"
            display={{ base: "block", lg: "none" }}
            margin="20px auto"
          />

          <VStack>
            <GameCard
              index={1}
              text="Lorak is the meta-game of the LandTorn universe, the anvil upon which all Torn NFTs are forged. Watch it gradually evolve through cataclysms."
              imgProps={{
                w: "143.8px",
                h: "106.283px",
                mt: "-13px !important"
              }}
              desProps={{
                w: { base: "full", lg: "201px" },
                ml: { base: 0, lg: "35px !important" },
              }}
              px="23px"
            />
            <GameCard
              px="23px"
              mt="40px !important"
              index={3}
              text="Key access point for everything TORN. A new collective, bound by pillars of faith and vision."
              imgProps={{
                w: "130px",
                h: "129.14px",
                mt: "-20px !important",
              }}
              desProps={{
                ml: { base: 0, lg: "35px !important" },
                w: { base: "full", lg: "196px" },
              }}
            />
          </VStack>
          <Image
            src="./1/games/1.png"
            w="268px"
            h="402px"
            mx="10px"
            className="wow fadeIn"
            display={{ base: "none", lg: "block" }}
          />
          <VStack mt={{ base: "40px", lg: 0 }}>
            <GameCard
              index={2}
              text="An epic extraction FPS odyssey crafted on Unreal Engine, anchored in the world of Lorak and seamlessly woven into our meta-game tapestry"
              pr="20px"
              imgProps={{
                w: "105px",
                h: "102px",
                mt: "-13px !important"
              }}
              desProps={{ ml: { base: 0, lg: "20px !important" } }}
            />
            <GameCard
              index={4}
              text="Skill meets speed in our browser-based FPS games, making its debut for LandTorn."
              mt="40px !important"
              pr="30px"
              imgProps={{
                w: {base: '155px', lg: "146.028px"},
                h: {base: '60px', lg: "48.766px"},
                mt: "10px !important"
              }}
              desProps={{
                ml: { base: 0, lg: "10px !important" },
                mt: { base: '31px !important', lg: "10px !important"},
                w: {base: 'full'}
              }}
            />
          </VStack>
        </Flex>
        <GameCard
          mt="43px"
          index={5}
          text="TORN fuels a universe of experiences, curated for the casual gamer and destined to elevate and grow our brand."
          imgProps={{
            w: "81px",
            h: "110.5px",
            mt: "-20px !important",
          }}
          desProps={{
            marginTop: {base: '10px !important', lg: 0}
          }}
        />
      </HomeContainer>
    </>
  );
}
