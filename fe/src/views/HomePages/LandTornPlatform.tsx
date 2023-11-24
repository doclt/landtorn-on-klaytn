import React, { useMemo } from "react";
import HomeContainer from "./HomeContainer";
import { Image, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import PlatformCard from "./components/PlatformCard";

export default function LandTornPlatform() {
  const [isLargerThan1280] = useMediaQuery('(min-width: 992px)');
  
  const dataSource = useMemo(() => {
    if (isLargerThan1280) return [1,2,3,4];
    return [1,3,2,4]
  }, [isLargerThan1280])

  return (
    <HomeContainer
      minH="800px"
      wrapProps={{
        bgImage: "./1/platforms/bg.png",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        bgPosition: "center",
        mb: "-10px",
        zIndex: 2,
      }}
      flexDirection="column"
      justifyContent="center"
      position="relative"
      containerProps={{
        bgImage: "linear-gradient(180deg, white, #0d080b)",
      }}
      py={{ base: "50px", lg: "0px" }}
    >
      <Text
        variant={TextVariants.WITH_TEXT}
        fontSize={{ base: "24px", lg: "52px" }}
        mb="20px"
        className="wow fadeIn"
      >
        LandTorn Platform
      </Text>
      <SimpleGrid
        w="full"
        columns={{ base: 1, lg: 2 }}
        columnGap="20px"
        rowGap="20px"
      >
        {dataSource.map((i, index) => (
          <PlatformCard
            index={i}
            key={i}
            className="wow fadeIn"
            data-wow-delay={`${0.5 * (index + 1)}s`}
          />
        ))}
      </SimpleGrid>
    </HomeContainer>
  );
}
