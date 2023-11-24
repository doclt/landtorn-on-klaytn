import { DungeonResult, DungeonType, ISpoil } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDistributionByDungeonIdAction } from "./dungeon.action";
import { IDistribution } from "@/types/dungeon.type";


export enum MultipleDungeonContentType {
  SelectSettlerContainer,
  SpendEnergyContainer,
  VentureIntoTheDungeonContainer,
  CongratulationContainer, 
}

interface DungeonState {
  dungeonType?: DungeonType;
  currentContent: MultipleDungeonContentType;
  energy: number;
  tokenId?: number;
  energyPicked: number,
  dungeonGameResult: DungeonResult[],
  distribution?: IDistribution;
  isLoadingDistribution?: boolean;
}

const initialState: DungeonState = {
  dungeonType: undefined,
  currentContent: MultipleDungeonContentType.SelectSettlerContainer,
  energy: 0,
  energyPicked: 1,
  dungeonGameResult: [],
};

export const dungeonSlice = createSlice({
  name: "dungeon",
  initialState,
  reducers: {    
    setDungeonTypeAction: (state, {payload}: PayloadAction<DungeonType | undefined>) => {
      state.dungeonType = payload;
    },
    setCurrentDungeonContentAction: (state, {payload}: PayloadAction<MultipleDungeonContentType>) => {      
      state.currentContent = payload;
    },
    setEnergyPickedAction: (state, {payload}: PayloadAction<number>) => {
      state.energyPicked = payload;
    },
    setSpoilsGameResultAction: (state, {payload}: PayloadAction<DungeonResult[]>) => {
      state.dungeonGameResult = payload;
    },
    setInitialDungeonAction: (state) => {
      state.dungeonGameResult = [];
      state.energyPicked = 1;
    },
    setSelectedTornTokenIdAction: (state, {payload}: PayloadAction<{tokenId: number, energy: number}>) => {
      state.tokenId = payload.tokenId;
      state.energy = payload.energy;
    }
  },
  extraReducers: (builder) => { 

    builder.addCase(getDistributionByDungeonIdAction.fulfilled, (state, {payload}) => {
      state.distribution = payload;
      state.isLoadingDistribution = false;
    })
    builder.addCase(getDistributionByDungeonIdAction.rejected, (state) => {
      state.distribution = undefined;
      state.isLoadingDistribution = false;
    })
    builder.addCase(getDistributionByDungeonIdAction.pending, (state) => {
      state.distribution = undefined;
      state.isLoadingDistribution = true;
    })
  }
});
export default dungeonSlice.reducer
export const { 
  setDungeonTypeAction, 
  setCurrentDungeonContentAction, 
  setEnergyPickedAction, 
  setSpoilsGameResultAction,
  setInitialDungeonAction,
  setSelectedTornTokenIdAction,
} = dungeonSlice.actions


