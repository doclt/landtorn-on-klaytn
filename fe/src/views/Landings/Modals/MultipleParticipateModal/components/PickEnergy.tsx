import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { HStack, Box, Text, StackProps } from "@chakra-ui/react";
import { ValueOf } from "next/dist/shared/lib/constants";
import React, { useCallback, useImperativeHandle, useState } from "react";

const SPEND_STEPS = [1, 2, 5, 10, 20] as const;
export type SpendStepType = typeof SPEND_STEPS[number];

interface IProps extends StackProps {
  defaultVal: SpendStepType;
  noClick?: boolean;
  onValueChange?:(v: number) => void;
}

export interface PickEnergyFuncRef {
  getPickEnergyValue: () => void;
  setEnergyValue: () => void;
}

const PickEnergy = React.forwardRef(
  ({defaultVal,  noClick, onValueChange, ...props }: IProps, ref: React.Ref<PickEnergyFuncRef>) => {
    const {pt} = useGlobal();
    const [activated, setActivated] = useState<number>(defaultVal);
    const onSelectEnergy = useCallback((val: number) => {
      if (!noClick) {
        setActivated(val);
        onValueChange && onValueChange(val);
      }
    }, [setActivated, noClick]);

    const getPickEnergyValue = () => activated;
    const setEnergyValue = () => {setActivated(1)};

    useImperativeHandle(ref, () => ({
      getPickEnergyValue,
      setEnergyValue,
    }));

    return (
      <HStack columnGap="20px" {...props}>
        {SPEND_STEPS.map((s) => (
          <Box
            key={s}
            w={{base: `${s === activated ? 28 : 24}px`, lg: `${s === activated ? 58 : 42}px`}}
            h={{base: `${s === activated ? 28 : 24}px`, lg: `${s === activated ? 58 : 42}px`}}
            bgImage={`./modals/multiples/spend${
              activated === s ? "-active" : ""
            }-bg.svg`}
            bgSize='contain'
            bgRepeat="no-repeat"
            bgPosition="center"
            cursor="pointer"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={() => onSelectEnergy(s)}
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{base: `${s === activated ? 15 : 13}px`, lg: `${s === activated ? 29 : 24}px`}}
              color="#281D2B"      
              pt={pt}
            >
              {s}
            </Text>
          </Box>
        ))}
      </HStack>
    );
  }
);

export default PickEnergy;
