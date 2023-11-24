import { DungeonResponseType, DungeonResult, ErrorType, RewardType, Spoil } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum ModalName {
  WHERE_TO_START,
  MINT_YOUR_SETTLER,
  MANAGE_SETTLER,
  MANAGE_SETTLER_LIST,
  SUCCESS,
  ENCHANT,
  SACRIFICE_SETTLER,
  DISTRIBUTION,
  NOTHING,
  DUNGEON_RAIDED,
  NO_RITUAL_STONE,
  YES_RITUAL_STONE,
  SACRIFICE_COMPLETED,
  DO_NOT_HAVE_A_SATCHEL,
  DO_NOT_ENOUGH_SHARD,
  MULTIPLE_PARTICIPATE,
  LORAK_UPDATE,
  GRAVE_YARD,
  DIED,
  SACRIFICE_MYTHIC,
  SACRIFICE_MYTHIC_SUCCESS,
  DIED_RECEIVE_MYTHIC,
  YOU_SURVIED
}

export enum DistributionType {
  DUNGEON_1 = 1,
  DUNGEON_2 = 2,
  DUNGEON_3 = 3,
  DUNGEON_4 = 4,
  DUNGEON_5 = 5,
  DUNGEON_6 = 6,
  DUNGEON_7 = 7,
  DUNGEON_8 = 8,
  DUNGEON_9 = 9,
}

interface ModalState {
  modalName?: ModalName;
  errorType?: ErrorType;
  distributionType: DistributionType;
  isProcessing?: boolean;
  spoil?: Spoil;
  rewardType?: RewardType;
  dungeonResponseType?: DungeonResponseType;
}

const initialState: ModalState = {
  distributionType: DistributionType.DUNGEON_1,
  isProcessing: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openOrCloseModal: (state, action: PayloadAction<ModalName | undefined>) => {
      state.modalName = action.payload;
    },
    setErrorModalAction: (
      state,
      action: PayloadAction<ErrorType | undefined>
    ) => {
      state.errorType = action.payload;
    },
    setProcessingAction: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isProcessing = action.payload;
    },
    setDistributionTypeAction: (
      state,
      action: PayloadAction<DistributionType>
    ) => {
      state.distributionType = action.payload;
    },
    setSpoilAction: (state, {payload}: PayloadAction<DungeonResult>) => {
      const {spoil, rewardType} = payload ;
      state.spoil = spoil;
      state.rewardType = rewardType;
    },
    setDungeonResponseTypeAction: (state, {payload}: PayloadAction<DungeonResponseType | undefined>) => {
      state.dungeonResponseType = payload
    }
  },
});

export const {
  openOrCloseModal,
  setDistributionTypeAction,
  setErrorModalAction,
  setProcessingAction,
  setSpoilAction,
  setDungeonResponseTypeAction,
} = modalSlice.actions;

export default modalSlice.reducer;
