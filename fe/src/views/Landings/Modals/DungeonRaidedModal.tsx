import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { dungeon_raided_data, opensea_item } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import { RewardType, Spoil, SpoilCategory } from "@/types";
import { Text, VStack, ModalProps, Box, Link, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

import React, { useMemo } from "react";

interface IProps extends Omit<ModalProps, "children"> {
  spoil?: Spoil;
  rewardType?: RewardType;
}

export default function DungeonRaidedModal({spoil, rewardType,  onClose , ...props }: IProps) {
  const dungeon = useMemo(() => {
    if (rewardType === RewardType.MYTHIC) return dungeon_raided_data[5 as keyof typeof dungeon_raided_data];
    return dungeon_raided_data[(spoil?.category.id || 1) as keyof typeof dungeon_raided_data];
  }, [spoil, rewardType]);


  const nameOrDescription = useMemo(() => {
    if (dungeon.des) return dungeon.des;
    return spoil?.name || '';
  }, [spoil, dungeon]);
  

  const img = useMemo(() => {
    if (rewardType && rewardType === RewardType.MYTHIC) return `mythics/${spoil?.id || 1}.png`;
    return `spoils/${spoil?.category.id || 5}.png`;
  }, [spoil, rewardType]);


  const pre = useMemo(() => {
    if (!spoil || !spoil.category) return 0;
    if (spoil && spoil.category && spoil.category.id === SpoilCategory.Mythic) return 0;
    return 0.35;
  }, [spoil]);

  const open_sea_link = useMemo(() => {
    if (spoil?.tokenId === -1)
      return `https://opensea.io/assets/base/0x9f9401ee604f7725255c756b99e416754ba0b910/${spoil.id}`;
    return `${opensea_item}${spoil?.tokenId}`;
  }, [spoil]);


  return (
    <CommonModal title="Dungeon RAIDED" onClose={onClose} hBg={740} {...props}>
      <VStack w="full">
        <Text variant={TextVariants.WITH_TEXT_400} fontSize='28px' pt="15px">{dungeon.title}</Text>
        <Image
          w={`${285 + (285 * pre)}px`}
          h={`${302 + (302 * pre)}px`}          
          src={`./modals/dungeons/${img}`}
          as={motion.img}
          mt={`${pre ? -50 : 0}px !important`}
          mb={`${pre ? -50 : 0}px !important`}
        />
       
        <Text variant={TextVariants.WITH_TEXT_400} fontSize="28px" mb="10px !important"
          maxW='385px'
          textAlign='center'
        >{nameOrDescription}</Text>
        {dungeon.isAttack && <Text variant={TextVariants.WITH_TEXT_400} fontSize="24px">ATTACK - {spoil?.attack || 0}</Text>}
        {dungeon.isDefence && <Text variant={TextVariants.WITH_TEXT_400} fontSize="24px">DEFENCE - {spoil?.defense || 0}</Text>}
        {dungeon.isShard && <Text variant={TextVariants.WITH_TEXT_400} fontSize="24px">SHARD VALUE - {spoil?.shard || 0}</Text>}
        <Link href={open_sea_link} target="_blank" _activeLink={{border: 'none'}}
           _active={{border: 'none'}}
        >
          <LandButton text="Show on Opensea" />
        </Link>
        <LandButton text="Continue" onClick={onClose} />
      </VStack>
    </CommonModal> 

  );
}
