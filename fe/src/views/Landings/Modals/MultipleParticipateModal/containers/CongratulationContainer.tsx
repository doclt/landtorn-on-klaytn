import LandButton from '@/components/LandButton'
import { TextVariants } from '@/themes/theme'
import { VStack, Text, Image, Box } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/reduxs/hooks'
import SpoilsTable from "@/views/Landings/components/SpoilsTable";
import { DungeonResponseType, ISpoil } from '@/types'
import { handleChangeNftAction } from '@/reduxs/accounts/account.actions'
import { openOrCloseModal } from '@/reduxs/modals/modal.slices'

export default function CongratulationContainer() {
  const dispatch = useAppDispatch();
  const { dungeonGameResult, tokenId, dungeonType } = useAppSelector((p) => p.dungeon);

  const spoils = useMemo(() => {
    const results = dungeonGameResult.filter(p => p.type !== DungeonResponseType.NOTHING);
    return results.map(p => {
        const  spoil: ISpoil = {
          id: p.spoil.id,
          tokenId: p.spoil.tokenId,
          name: p.spoil.name || p.spoil.tokenId.toString(),
          attack: p.spoil.attack || 0,
          defense: p.spoil.defense || 0,
          shard: p.spoil.shard || 0,
          spoilTypeId: p.spoil.spoilTypeId,
          balanceOf: p.amount,
          dungeonTypeId: p.spoil.dungeonTypeId,
          rewardType: p.rewardType,
          amount: p.amount,
          sortVal: Number.MAX_SAFE_INTEGER
        }
        return spoil;
    });
  }, [dungeonGameResult])

  const handleContinue = async()=>{
    if (tokenId !== undefined && dungeonType) {
      // dispatch(handleChangeNftAction({tokenId, dType: dungeonType})).unwrap();
    }
    dispatch(openOrCloseModal());
  }

  return (
    <VStack w="full" position="relative" display="flex" flex={1} py={{base:"10px", lg: "0px"}}>
      <Box
        w={{ base: "100px", lg: "400px" }}
        h={{ base: "100px", lg: "400px" }}
        bgImage="./modals/multiples/congratulation-bg.svg"
        bgRepeat="no-repeat"
        bgSize="cover"
        position="absolute"
        alignItems="center"
        display={{base: 'none', lg: "flex"}}
        mt={{ base: "-40px !important", lg: "-70px !important" }}
        zIndex={0}      
      >
        <Image
          src="./modals/multiples/congratulation-icon.png"
          w={{ base: "70px", lg: "250px" }}
          h={{ base: "70px", lg: "250px" }}
          margin="auto auto"
        />
      </Box>
      <Text
        variant={TextVariants.WITH_TEXT_400}
        color="#9DB506"
        fontSize={{ base: "25px", lg: "48px" }}
        textTransform="uppercase"
        mt={{ base: "-10px !important", lg: "250px !important" }}
        zIndex={1}
      >
        congratulations
      </Text>

      <Text
        variant={TextVariants.WITH_TEXT_400}
        fontSize={{ base: "18px", lg: "24px" }}
        textAlign="center"
        px="20px"
      >
        You found many items, you might need some rest if your energy is low.
        Otherwise, keep fighting.
      </Text>
      <Image
        src="./modals/line-start.svg"
        mt={{base:'0px !important', lg:"10px !important"}}
        mb={{base:'0px !important', lg:"10px !important"}}
      />
      <SpoilsTable maxH={200} spoils={spoils} isFetchSpoil={false} minH={200} />
      {spoils.length > 0 && (<LandButton text="Continue" 
        mt={{base: '-10px !important', lg: "10px !important"}}
      onClick={() => handleContinue()} />)}
    </VStack>
  );
}
