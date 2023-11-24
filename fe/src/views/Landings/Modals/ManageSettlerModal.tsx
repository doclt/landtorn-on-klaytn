import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import SacrificeSettlerContract from "@/contracts/SacrificeSettlerContract";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { fetchSacrificeRewardAction } from "@/reduxs/sacrifices/sacrifice.action";
import { TextVariants } from "@/themes/theme";
import { getToast } from "@/utils";
import { VStack, Text, ModalProps, useToast } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, 'children'> {}

export default function ManageSettlerModal({...props}: IProps) {
  const dispatch = useAppDispatch();
  const {spoils, nft} = useAppSelector(p => p.account);

  const handleCheckExistRitualStoneAsync = async() => {
    return;
    // const isExistRitualStone = spoils.some(p => p.spoilTypeId === 13);
    // if (!isExistRitualStone) {
    //   dispatch(openOrCloseModal(ModalName.NO_RITUAL_STONE));
    //   return;
    // }   
    // if (!nft?.account) {
    //   dispatch(openOrCloseModal(ModalName.DO_NOT_HAVE_A_SATCHEL));
    //   return;
    // }
    // await dispatch(fetchSacrificeRewardAction(nft.account)).unwrap();
    // dispatch(openOrCloseModal(ModalName.YES_RITUAL_STONE));  
  }

  return (
    <CommonModal 
      title="MANAGE SETTLER"    
    {...props}>
      <VStack w="full">
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "19px" }}
        >
          You go back to the Tavern to rest and decide what to do next. <br /> <br/>
          After speaking with other Settlers you learn that you can Sacrifice
          yourself in the Shadow Church. For the Ritual you’ll need a Ritual
          Stone, after that you’ll be able to extract some of the Shard Value of
          your Settler and be able to enter the world of Lorak once again.
          Mythic Assets will also stay with you.
        </Text>
        <LandButton 
         text="Sacrifice Settler For Shards"
         textDone="Sacrifice Settler For Shards"
         isDone
         onClick={handleCheckExistRitualStoneAsync}        
        />
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "19px" }}
        >
          Others have mentioned that some Settlers that have pure $shards
          enchant themselves to gain higher Shard Power and venture in the
          harder dungeons straight away.
        </Text>
        <LandButton text="Enchant Settler With Shards" 
          onClick={() => dispatch(openOrCloseModal(ModalName.ENCHANT))}
        />
        <Text
          textAlign="center"
          variant={TextVariants.WITH_TEXT_400}
          fontSize={{ base: "16px", lg: "20px" }}
        >
          You also learn that some Settlers control multiple Settlers, they
          purchase control of them on some Market
        </Text>
        <LandButton text="Manage Settlers" mt="-10px"
          onClick={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER_LIST))}
        />
      </VStack>
    </CommonModal>
  );
}
