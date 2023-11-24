import CommonModal from '@/components/CommonModal/Index'
import LandButton from '@/components/LandButton';
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps, VStack } from '@chakra-ui/react'
import React from 'react'

interface IProps extends Omit<ModalProps, 'children'> {
  spinResult?: string;
}
export default function SpinResultModal({spinResult, ...props}: IProps) {
  return (
    <Modal isCentered {...props}>
      <ModalOverlay bgColor='rgba(0,0,0, .8)'></ModalOverlay>
      <ModalContent bgColor='transparent' shadow='none'>
        <ModalCloseButton borderRadius='10px' bgColor='rgba(255,255,255, 0.2)' right='70px' />
        <ModalBody>
          <VStack  pt="20px" justifyContent="center">
            <Image src={`/spins/results/${spinResult}.svg`} w="60%" objectFit="cover" />            
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
