import { useAppSelector } from "@/reduxs/hooks";
import ModalController from "@/views/Landings/ModalController";
import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};
export default function LandingLayout({ children }: Props) {
  const {isFetchSpoil} = useAppSelector(p => p.account);
  const {isProcessing} = useAppSelector(p => p.modal);

  return (
      <Flex
        w="100%"
        margin="0px auto"
        flexDirection="column"
        alignItems="center"
        position='relative'        
      >
        <Flex
          flexDirection="column"
          w="100%"
          justifyContent="center"
          alignItems="center"
        >
          {children}
          <ModalController />
        </Flex>  
       {(isFetchSpoil || isProcessing) && <Flex 
          w='full'
          h='full'
          position='absolute'
          zIndex={100}
          cursor='not-allowed'
        /> }     
      </Flex>
  );
}
