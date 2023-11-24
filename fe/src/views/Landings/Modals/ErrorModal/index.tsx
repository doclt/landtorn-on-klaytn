import CommonModal from "@/components/CommonModal/Index";
import LandButton from "@/components/LandButton";
import { errors } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import { ErrorType } from "@/types";
import { Image, VStack, Text, ModalProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
import EnergyContent from "./EnergyContent";



interface IProps extends Omit<ModalProps, "children"> {
  errorType: ErrorType
}

export default function ErrorModal({errorType = ErrorType.NOT_ENOUGH_ENERGY, ...props}: IProps) {
  const obj = errors[errorType as keyof typeof errors];
  const hBh = useMemo(() => {
    if (errorType === ErrorType.NOT_ENOUGH_ENERGY) return 740;
    return 410;
  }, [errorType]);

  return (
    <CommonModal title={obj.title} hBg={hBh}  {...props}>
      {errorType !==ErrorType.NOT_ENOUGH_ENERGY && <VStack w="full" justifyContent="center" h="280px">
        <Text
          variant={TextVariants.WITH_TEXT_400}
          fontSize="28px"
          maxW="360px"
          color="#FFA012"
          textAlign="center"
        >
          {obj.des}
        </Text>
        <Image src="./modals/line-start.svg" />
        <LandButton text={obj.btnTitle} />
      </VStack>}
      {errorType === ErrorType.NOT_ENOUGH_ENERGY && <EnergyContent />}
    </CommonModal>
  );
}
