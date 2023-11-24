import {
  ModalName,
  openOrCloseModal,
  setErrorModalAction,
  setProcessingAction,
} from "@/reduxs/modals/modal.slices";
import React, { useEffect } from "react";
import {
  ManageSettlerModal,
  MintModal,
  EnchantModal,
  SacrificeSettlerModal,
  ManageSettlersListModal,
  SuccessModal,
  DistributionModal,
  NothingModal,
  DungeonRaidedModal,
  ErrorModal,
  DoNotHaveASatchelModal,
  MultipleParticipateModal,
  LorakUpdateModal,
  GraveYardModal,
} from "./Modals";
import WhereToStartModal from "./WhereToStartModal";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { DungeonType, ErrorType } from "@/types";
import { useAccount } from "wagmi";
import {
  fetchNftAction,
  handleChangeNftAction,
  setSelectedNftAction,
  setShardBalanceAction,
} from "@/reduxs/accounts/account.actions";
import NoRitualStoneModal from "./Modals/NoRitualStoneModal";
import YesRitualStoneModal from "./Modals/YesRitualStoneModal/Index";
import { IMintFuncRef } from "./Modals/MintModal";
import DoNotEnoughShardModal from "./Modals/DoNotEnoughShardModal";
import { saveLorkaUpdateToLocalStorage } from "@/utils/localstore.helpers";
import DiedDungeonRaidedModal from "./Modals/DiedDungeonRaidedModal";
import SacrificeCompletedModal from "./Modals/SacrificeCompletedModal";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { ShardContract } from "@/contracts/ShardContract";
import ManageSettlerNewModal from "./Modals/ManageSettlerNewModal";
import SacrificeMythicModal from "./Modals/SacrificeMythicModal";
import SacrificeMythicCompleteModal from "./Modals/SacrificeMythicModal/SacrificeMythicCompleteModal";

export default function ModalController() {
  const { address } = useAccount();
  const {
    modalName,
    distributionType,
    errorType,
    spoil,
    rewardType,
  } = useAppSelector((p) => p.modal);
  const { nft } = useAppSelector((p) => p.account);
  const dispatch = useAppDispatch();
  const refMinFunc = React.useRef<IMintFuncRef>(null);

  const handleGetShard = async () => {
    try {
      const signer = await getEthersSigner();
      if (signer && address) {
        const shardContract = new ShardContract(signer);
        const balanceOf = await shardContract.balanceOf(address);
        dispatch(setShardBalanceAction(balanceOf));
      }
    } catch (ex) {
      console.log({ ex });
    }
  };

  const onCloseModal = (isError?: boolean) => {
    if (!isError) {
      dispatch(openOrCloseModal());
    } else {
      dispatch(setErrorModalAction());
    }
  };

  const handleRefetchNft = async (isMintModal = false) => {
    const tempNft = nft;
    onCloseModal();
    if (isMintModal) {
      const isHasActivity = refMinFunc.current?.getActivity();
      if (!isHasActivity) return;
    }
    if (address) {
      await dispatch(fetchNftAction(address)).unwrap();
    }
    if (tempNft) {
      await dispatch(handleChangeNftAction({ tokenId: tempNft.tokenId, dType: DungeonType.Dungeon_All, walletAddress: address}));
      dispatch(setSelectedNftAction({ nft: tempNft, isNew: false }));
      return;
    }
  };

  const handleCloseLorakUpdateModal = () => {
    saveLorkaUpdateToLocalStorage();
    onCloseModal();
  };

  const handleCloseDiedModal = async () => {
    onCloseModal();
    if (address) {
      await dispatch(fetchNftAction(address)).unwrap();
    }
  };

  const handleOnCloseSacrifice = async () => {
    try {
      await handleCloseDiedModal();
      await handleGetShard();
    } catch (ex) {}
  };

  useEffect(() => {
    handleGetShard();
  }, [handleGetShard]);

  return (
    <>
      <WhereToStartModal
        isOpen={modalName === ModalName.WHERE_TO_START}
        onClose={() => onCloseModal()}
      />

      {/* <ManageSettlerModal
        isOpen={modalName === ModalName.MANAGE_SETTLER}
        onClose={() => onCloseModal()}
      /> */}

      <MintModal
        ref={refMinFunc}
        closeOnOverlayClick={false}
        isOpen={modalName === ModalName.MINT_YOUR_SETTLER}
        onClose={() => handleRefetchNft(true)}
      />

      <EnchantModal
        isOpen={modalName === ModalName.ENCHANT}
        onClose={() => onCloseModal()}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      />

      <SacrificeSettlerModal
        isOpen={modalName === ModalName.SACRIFICE_SETTLER}
        onClose={() => onCloseModal()}
      />

      <ManageSettlersListModal
        isOpen={modalName === ModalName.MANAGE_SETTLER_LIST}
        onClose={() => onCloseModal()}
      />

      <SuccessModal
        isOpen={modalName === ModalName.SUCCESS}
        onClose={() => handleRefetchNft()}
      />

      <DistributionModal
        title="Distribution"
        dungeonType={distributionType}
        isOpen={modalName === ModalName.DISTRIBUTION}
        onClose={() => onCloseModal()}
      />

      <NothingModal
        isOpen={modalName === ModalName.NOTHING}
        onClose={() => onCloseModal()}
      />

      <DungeonRaidedModal
        isOpen={modalName === ModalName.DUNGEON_RAIDED}
        onClose={() => onCloseModal()}
        spoil={spoil}
        rewardType={rewardType}
      />

      <ErrorModal
        isOpen={errorType !== undefined}
        errorType={errorType ? errorType : ErrorType.OH_NO}
        onClose={() => onCloseModal(true)}
      />

      <NoRitualStoneModal
        isOpen={modalName === ModalName.NO_RITUAL_STONE}
        onClose={() => onCloseModal()}
        onReturn={() => {
          dispatch(openOrCloseModal(ModalName.MANAGE_SETTLER));
        }}
      />

      <YesRitualStoneModal
        isOpen={modalName === ModalName.YES_RITUAL_STONE}
        onClose={() => onCloseModal()}
      />

      <DoNotHaveASatchelModal
        isOpen={modalName === ModalName.DO_NOT_HAVE_A_SATCHEL}
        onClose={() => onCloseModal()}
      />

      <DoNotEnoughShardModal
        isOpen={modalName === ModalName.DO_NOT_ENOUGH_SHARD}
        onClose={() => onCloseModal()}
      />

      <MultipleParticipateModal
        isOpen={modalName === ModalName.MULTIPLE_PARTICIPATE}
        onClose={() => onCloseModal()}
      />

      {/* <LorakUpdateModal
        isOpen={modalName === ModalName.LORAK_UPDATE}
        onClose={() => handleCloseLorakUpdateModal()}
      /> */}

      <GraveYardModal
        isOpen={modalName === ModalName.GRAVE_YARD}
        onClose={() => handleCloseLorakUpdateModal()}
      />

      <DiedDungeonRaidedModal
        isOpen={modalName === ModalName.DIED}
        onClose={() => handleCloseDiedModal()}
      />
      <SacrificeCompletedModal
        isOpen={modalName === ModalName.SACRIFICE_COMPLETED}
        onClose={() => handleOnCloseSacrifice()}
      />

      <ManageSettlerNewModal
        isOpen={modalName === ModalName.MANAGE_SETTLER}
        onClose={() => onCloseModal()}
      />

      <SacrificeMythicModal        
        isOpen={modalName === ModalName.SACRIFICE_MYTHIC}
        onClose={() => onCloseModal()}       
       />

       <SacrificeMythicCompleteModal
        isOpen={modalName === ModalName.SACRIFICE_MYTHIC_SUCCESS}
        onClose={() => handleOnCloseSacrifice()}     
       />
    </>
  );
}
