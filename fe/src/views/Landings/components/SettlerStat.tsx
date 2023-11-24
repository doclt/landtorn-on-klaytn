import { useGlobal } from "@/contexts/Globals";
import { useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { VStack, Image, Text, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";

export default function SettlerStat() {
  const {spoils} = useAppSelector((p) => p.account);  
  const {pt} =useGlobal();

  const stat = useMemo(() => {   
    const typeIds = [...new Set(spoils.map((p) => p.spoilTypeId))];
    let totalAttack = 0;
    let totalDefense = 0;
    for (let i = 0; i < typeIds.length; i+=1) {
      const typeId = typeIds[i];
      const attack = Math.max(...spoils.filter(p => p.spoilTypeId === typeId).map(t => t.attack)); 
      const defense = Math.max(...spoils.filter(p => p.spoilTypeId === typeId).map(t => t.defense)); 
      totalAttack += attack;
      totalDefense += defense;
    }
    return `${totalAttack} ATK / ${totalDefense} DEF`;
  }, [spoils]);


  return (
    <VStack w={{ base: "f", lg: "140px" }}>
      <Text
        variant={TextVariants.WITH_ACTOR}
        fontSize="12px"
        color="rgba(255, 239, 215, 0.50)"
      >
        Settler Stats:
      </Text>
      <Flex
        w={{ base: "172px", lg: "140px" }}
        h={{ base: '34px', lg: '28px'}}
        bgImage={{ base: "./cards/stetler-stat-bg.svg", lg: "./cards/stetler-stat-bg.svg" }}
        bgRepeat="no-repeat"
        bgSize="cover"
        position="relative"
        justifyContent='center'     
      >
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="18px"   
          pt={pt}
        >
          {stat}
        </Text>
      </Flex>
    </VStack>
  );
}
