import { getDistributionByDungeonIdApi } from "@/apis/account.api";
import { IDistribution } from "@/types/dungeon.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDistributionByDungeonIdAction = createAsyncThunk<IDistribution, number>(
  "dungeon/getDistributionByDungeonId",
  async (dungeonTypeId) => {
    const dungeonResponse = await getDistributionByDungeonIdApi(dungeonTypeId);
    const nullData = dungeonResponse.DungeonSetting.filter(p=> p.range === null);
    const withoutNullData = dungeonResponse.DungeonSetting.filter(p=> p.range !== null);

    const distributionData = nullData.map((p) => ({
      rewardName: p.rewardName,
      ratio: p.ratio,
    }));
    const unitName = [...new Set(withoutNullData.map(p=> p.rewardName))];
    const unitRange = [...new Set(withoutNullData.map(p => p.range))];

    const enchantData = unitRange.sort((a,b) => {return (a || 0)-(b || 0)})
      .map((r) => {
        const o = unitName.map((rewardName) => {
          const rewardValue = withoutNullData.find(
            (p) => p.rewardName === rewardName && p.range === r
          )?.ratio;
          return {
            rewardName,
            rewardValue,
          };
        });
        return {
          enchanted: r,
          ritualStone: o.find((p) => p.rewardName === "RitualStone")
            ?.rewardValue,
          death: o.find((p) => p.rewardName === "Dead")?.rewardValue,
        };
      });

    return {
      enchant: enchantData,
      distribution: distributionData
    }
  }   
);