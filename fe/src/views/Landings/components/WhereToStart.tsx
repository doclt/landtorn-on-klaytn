import { useGlobal } from "@/contexts/Globals";
import { fonts } from "@/themes/config";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface IProps   extends ButtonProps{}

export default function WhereToStart({...props}: IProps) {
  const {pt} = useGlobal();
  return (
    <Button  
      bgImage="./liner-btn-1.svg"
      bgSize='cover'
      w={{base: 'full', lg: "319px"}}
      h="37px"
      fontFamily={fonts.Mirza}
      color="#FFEFD7"
      fontSize="24px"  
      fontWeight="700"
      lineHeight="120%"
      textAlign="center"
      pt={pt}
      {...props}
    >
      Where to start
    </Button>
  );
}
