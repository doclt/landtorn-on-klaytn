import CommonModal from "@/components/CommonModal/Index";
import { dungeon_data } from "@/configs/strings";
import { DistributionType } from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Modal,
  Text,
  Image,
  Flex,
  HStack,
  ModalProps,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IProps  extends Omit<ModalProps, "children"> {
  title: string;
  dungeonType?: DistributionType;
}

export default function DistributionModalBackup({
  title,
  dungeonType = 3,
  onClose,
  ...props
}: IProps) {
  const data = dungeon_data[dungeonType as keyof typeof dungeon_data];

  const heightType = useMemo(() => {
    if (dungeonType === DistributionType.DUNGEON_3) return 521;
    if (dungeonType === DistributionType.DUNGEON_4) return 521;
    return 360;
  }, [dungeonType]);
  return (
    <Modal isCentered onClose={onClose} {...props}>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        w="full"
        bgColor="transparent"
        maxW="496px"
        minH={`${heightType}px`}
        position="relative"
        mx={{ base: "20px !important", lg: 0 }}
        flexDirection="column"
        bgRepeat="no-repeat"
        bgSize="contain"
        bgImage={`./modals/distributions/dungeon-${heightType}.png`}
      >
        <ModalHeader>
          <Text
            variant={TextVariants.WITH_TEXT}
            textAlign="center"
            fontSize={{ base: "22px", lg: "32px" }}
            w="full"
            mt="10px"
            textTransform="uppercase"
          >
            {title}
          </Text>
          <Image
            src="./modals/distributions/close.svg"
            cursor="pointer"
            w="66px"
            h="66px"
            position="absolute"
            right={{ base: "15px", lg: "10px" }}
            top="10px"
            onClick={onClose}
          />
        </ModalHeader>
        <ModalBody
          w="full"
          justifyContent="center"
          display="flex"
          alignItems="flex-start"
        >
          <Flex
            w="full"
            minH="100px"
            borderRadius="12px"
            border="1px solid rgba(201, 201, 201, 0.65)"
            maxW="416px"
            mt="10px"
            bgColor="#1B1B1B"
            backdropFilter="blur(2.1501457691192627px)"
            flexDirection="column"
          >
            <HStack>
              <Flex w="256.75px" h="40px"  alignItems="center" pl="25px">
                <Text variant={TextVariants.WITH_ACTOR} color='rgba(255, 239, 215, 0.50)'
                  fontSize={{base: '12px', lg: '16px'}}
                >What To Expect</Text>
              </Flex>
              <Flex w="138.25px" h="40px"  alignItems="center" justifyContent='center'>
                <Text variant={TextVariants.WITH_ACTOR} color='rgba(255, 239, 215, 0.50)'
                  fontSize={{base: '12px', lg: '16px'}}
                >Сhance</Text>
              </Flex>
            </HStack>

            {data.map((p, index) => (
              <HStack w="full" key={index}>
                <Flex
                  w="256.75px"
                  h={{base: '30px', lg: "40px"}}
                  bgColor={
                    index % 2 === 0
                      ? "rgba(217, 217, 217, 0.10)"
                      : "rgba(217, 217, 217, 0.05)"
                  }
                  borderRadius="8px"
                  alignItems="center"
                  pl="15px"
                  ml="10px"
                >
                  <Text variant={TextVariants.WITH_ACTOR}
                    fontSize={{base: '12px', lg: '16px'}}
                  >{p.lable}</Text>
                </Flex>
                <Flex
                  ml="0px !important"
                  w="138.25px"
                  h={{base: '30px', lg: "40px"}}
                  bgColor={
                    index % 2 === 0
                      ? "rgba(217, 217, 217, 0.10)"
                      : "rgba(217, 217, 217, 0.05)"
                  }
                  borderRadius="8px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text variant={TextVariants.WITH_ACTOR}
                    fontSize={{base: '12px', lg: '16px'}}
                  >{p.value}</Text>
                </Flex>
              </HStack>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
