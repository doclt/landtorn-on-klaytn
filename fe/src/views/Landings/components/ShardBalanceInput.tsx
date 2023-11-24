import { useAppSelector } from "@/reduxs/hooks";
import { fonts } from "@/themes/config";
import { TextVariants } from "@/themes/theme";
import {
  NumberFormatValues,
  NumericFormat,
  SourceInfo,
} from "react-number-format";

import { getToast, numberFormat } from "@/utils";
import {
  Flex,
  FlexProps,
  HStack,
  Image,
  Input,
  StackProps,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useImperativeHandle, useState } from "react";

interface IProps extends StackProps {
  hideBalanceText?: boolean;
}

export interface IShardFuncRef {
  getValue: () => void;
}


const ShardBalanceInput = React.forwardRef(
  ({ hideBalanceText, ...props }: IProps, ref: React.Ref<IShardFuncRef>
  ) => {
    const { shardBalance } = useAppSelector((p) => p.account);
    const [val, setVal] = useState<number>(shardBalance);
    const toast = useToast();
    const handleValueChange = (
      values: NumberFormatValues,
      sourceInfo: SourceInfo
    ) => {
      const newV = values.floatValue || 0;
      if (shardBalance - newV < 0) {
        sourceInfo.event?.preventDefault();
        return;
      }
      setVal(newV);
    };

    useImperativeHandle(ref, () =>  ({
      getValue
    }));

    const getValue = () => val;
  

    return (
      <HStack alignItems="center" {...props}>
        {!hideBalanceText && (
          <Text
            color="rgba(255, 239, 215, 0.50)"
            fontFamily={fonts.Actor}
            fontSize={{ base: "12px", lg: "18px" }}
          >
            Balance:
          </Text>
        )}
        <Flex
          border="1px solid #919191"
          w={{ base: "80px", lg: "96.5px" }}
          h={{ base: "28px", lg: "32px" }}
          borderRadius={{ base: "8px", lg: "12px" }}
          backdropFilter="blur(4px)"
          position="relative"
          alignItems="center"
        >
          <NumericFormat
            border="none"
            focusBorderColor="transparent"
            fontFamily={fonts.Mirza}
            py="5px"
            pt="15px"
            allowNegative={false}
            decimalScale={1}
            thousandSeparator
            defaultValue={0}
            value={0}
            onValueChange={handleValueChange}
            customInput={Input}
            isAllowed={(values) => {
              const isAllowed = (values.floatValue || 0) < shardBalance;
              if (!isAllowed) {
                toast(
                  getToast(
                    "You do not have enough Shards to complete this enchantment or something like that."
                  )
                );
              }
              return isAllowed;
            }}
          />
          <Image
            src="./shard-icon.svg"
            position="absolute"
            right={{ base: "-30px", lg: "-40px" }}
          />
        </Flex>
        <Text
          variant={TextVariants.WITH_MENU}
          color="rgba(255, 239, 215, 0.50)"
          ml={{ base: "20px", lg: "20px !important" }}
          fontSize={{ base: "12px", lg: "18px" }}
          mt="8px !important"
        >
          $SHARD
        </Text>
      </HStack>
    );
  }
);

export default ShardBalanceInput;
