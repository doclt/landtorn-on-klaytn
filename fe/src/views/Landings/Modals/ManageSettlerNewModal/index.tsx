import CommonModal from "@/components/CommonModal/Index";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import { fetchSacrificeRewardAction } from "@/reduxs/sacrifices/sacrifice.action";
import {
  ModalProps,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import SettlerCard from "./SettlerCard";
import { RITUAL_STONE_ID } from "@/configs/strings";
import { SettlerStatus } from "@/types";

interface IProps extends Omit<ModalProps, "children"> {}

export default function ManageSettlerNewModal({ ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { spoils, nft, settlerStatus } = useAppSelector((p) => p.account);

  const handleCheckExistRitualStoneAsync = async () => {
    const isExistRitualStone = spoils.some(p => p.spoilTypeId === RITUAL_STONE_ID);
    if (!isExistRitualStone) {
      dispatch(openOrCloseModal(ModalName.NO_RITUAL_STONE));
      return;
    }
    if (!nft?.account) {
      dispatch(openOrCloseModal(ModalName.DO_NOT_HAVE_A_SATCHEL));
      return;
    }
    await dispatch(fetchSacrificeRewardAction(nft.account)).unwrap();
    dispatch(openOrCloseModal(ModalName.YES_RITUAL_STONE));
  };

  const isDied = useMemo(() => {
    if (settlerStatus === SettlerStatus.DIED) return true;
    return false;
  }, [settlerStatus]);

  return (
    <CommonModal
      isCentered={false}
      title="You go back to the Tavern to rest and decide what to do next"
      titleProps={{
        fontSize: "32px",
        textTransform: "none",
      }}
      titleMbProps={{
        fontSize: '18px',
        textTransform: 'none',
        w: '198px',
        lineHeight: '100%',
        position: 'absolute',
        right: '20%',
        top: '5px'
      }}
      wBg={989}
      hBg={560}
      isBack
      onBack={() => dispatch(openOrCloseModal())}
      {...props}
    >
      <SimpleGrid w="full" columns={2} gap="10px">
        <SettlerCard
          index={0}
          text="Requires a Ritual Stone and a visit to the Shadow Church, it will allow you to kill your Settler and turn part of your Shard Power into $SHARD and withdraw  your Mythics."
          btnText="Sacrifice for $Shard"
          onBtnClick={handleCheckExistRitualStoneAsync}  
          died={isDied}
        />
        <SettlerCard
          index={1}
          text="This Ritual allows you to destroy your Settler and withdraw Mythic NFTs back to your wallet. Requires a certain level of Shard Power for each Mythic you hold. It does not require a Ritual Stone. "
          btnText="Sacrifice for Mythics"
          died={isDied}
          onBtnClick={() => dispatch(openOrCloseModal(ModalName.SACRIFICE_MYTHIC))}
        />
   
        <SettlerCard
          index={2}
          text="Others have mentioned that some Settlers that have pure $shards enchant themselves to gain higher Shard Power and venture in the harder dungeons straight away. "
          btnText="Enchant Settler With $Shard"
          died={isDied}
          onBtnClick={() => dispatch(openOrCloseModal(ModalName.ENCHANT))}
       />
        <SettlerCard
          index={3}
          text="You also learn that some Settlers control multiple Settlers, they purchase control of them on some Market "
          btnText="Manage Settlers"
          onBtnClick={() => dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER_LIST))}
       />
      </SimpleGrid>
    </CommonModal>
  );
}
