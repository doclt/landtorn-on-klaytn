import CommonModal from "@/components/CommonModal/Index";
import React, { useMemo } from "react";
import {
  CongratulationContainer,
  VentureIntoTheDungeonContainer,
} from "./containers";
import { ModalProps } from "@chakra-ui/react";
import { useAppSelector } from "@/reduxs/hooks";
import { MultipleDungeonContentType } from "@/reduxs/dungeons/dungeon.slice";

interface IProps extends Omit<ModalProps, "children"> {}

export default function MultipleParticipateModal({ ...props }: IProps) {
  const {currentContent} = useAppSelector(p => p.dungeon);

  const hBg = useMemo(() => {
    switch (currentContent) {
      case MultipleDungeonContentType.VentureIntoTheDungeonContainer:
        return 620;
      default:
        return 819;
    }
  }, [currentContent]);

  const getTitle = useMemo(() => {
    switch (currentContent) {
      case MultipleDungeonContentType.VentureIntoTheDungeonContainer:
        return "VENTURE INTO THE DUNGEON";
      case MultipleDungeonContentType.CongratulationContainer:
        return "Dungeons raided";
      default:
        return "PARTICIPATE";
    }
  }, [currentContent]);

  return (
    <CommonModal
      title={getTitle}
      wBg={700}
      //@ts-ignore
      hBg={hBg}
      {...props}
    >
      {currentContent === MultipleDungeonContentType.VentureIntoTheDungeonContainer && <VentureIntoTheDungeonContainer />}
      {currentContent === MultipleDungeonContentType.CongratulationContainer && <CongratulationContainer />}
    </CommonModal>
  );
}


