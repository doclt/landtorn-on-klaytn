import { useGlobal } from "@/contexts/Globals";
import { TextVariants } from "@/themes/theme";
import { Flex, Box, Text, Image, chakra, Spinner, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import SpinsCard from "./SpinsCard";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { LuckySpinContract } from "@/contracts/LuckySpinContract";
import { ShardContract } from "@/contracts/ShardContract";

interface IProps {
  onSuccess?: (result: string) => void;
}
export default function WheelMonk({onSuccess}: IProps) {
  const { pt } = useGlobal();
  const {isOpen, onClose, onOpen} = useDisclosure();
  

  const onSpinAsync = async (spinType = 100 | 1000) => {
    try {
      const signer = await getEthersSigner();
      if (!signer) return;
      onOpen();
      const luckySpinContract = new LuckySpinContract(signer);
      const shardContract = new ShardContract(signer);
      await shardContract.approve(luckySpinContract._contractAddress, spinType);
      const result = await luckySpinContract.spin(spinType);
      result && onSuccess && onSuccess(result)
    } catch (ex) {
      console.log(ex);
    }
    onClose();
  };


  return (
    <Flex
      w={{ base: "full", lg: "922px" }}
      h={{ base: "444px", lg: "257px" }}
      bgImage={{
        base: "/spins/bg-mobile-1.png",
        lg: "/spins/bg-1.png",
      }}
      bgRepeat="no-repeat"
      bgSize="contain"
      flexDirection="column"
      position="relative"
      pt="40px"
      px={{ base: "20px", lg: "30px" }}
      pb={{ base: "20px", lg: "20px" }}
      mt={{ base: "20px", lg: "17px" }}
      transition={"all .1s ease-in-out"}
    >
      <Box
        bgImage="/spins/spin-the-wheel.svg"
        w={{ base: "329.48px", lg: "312px" }}
        h={{ base: "63.33px", lg: "60px" }}
        bgRepeat="no-repeat"
        bgSize="contain"
        position="absolute"
        left={{ base: "13px", lg: 174 }}
        right={0}
        top={{ base: "-27px", lg: "-10px" }}
      />

      <Image
        src="/spins/the-monk.png"
        w="172px"
        h="174px"
        alignSelf="center"
        display={{ base: "block", lg: "none" }}
        mt="12px"
      />

      <Flex
        w={{ base: "full", lg: "478px" }}
        minH="50px"
        ml={{ base: "-3px", lg: "66px" }}
        mt="17px"
        alignItems="center"
        flexDirection="column"
      >
        <Flex>
          <Flex
            w={{ base: "150.28px", lg: "198.4px" }}
            h={{ base: "47.76px", lg: "62px" }}
            bgImage="/spins/shard-bg.svg"
            bgSize="cover"
            mr={{ base: "-18px", lg: "-15px" }}
            zIndex={2}
            justifyContent="center"
            alignItems="center"
            position="relative"
            mt={{ base: "20px", lg: "15px" }}
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="24px"
              color="#FFEFD7"
              pt={pt}
            >
              100
              <chakra.span fontSize={{ base: "14px", lg: "24px" }}>
                SHARD
              </chakra.span>
            </Text>
            <Flex
              w="100px"
              h="38px"
              bgImage="/spins/spin-left.svg"
              position="absolute"
              bottom="-25px"
              cursor="pointer"
              onClick={() => onSpinAsync(100)}
              justifyContent="center"
              alignItems="center"
            ></Flex>
          </Flex>
          <Flex
            w={{ base: "59px", lg: "65px" }}
            h="99.1px"
            bgImage="/spins/stone-bg.svg"
            justifyContent="center"
            pt="20px"
          >
            <Box
              w="36px"
              h="36px"
              bgColor="#6630FF"
              borderRadius="full"
              mixBlendMode="screen"
              filter="blur(19px)"
            />
            <Image
              src="/spins/stone.gif"
              w="37.5px"
              h="37.5px"
              position="absolute"
              mixBlendMode="screen"
            />
          </Flex>
          <Flex
            w={{ base: "150.28px", lg: "198.4px" }}
            h={{ base: "47.76px", lg: "62px" }}
            bgImage="/spins/shard-bg.svg"
            bgSize="cover"
            ml={{ base: "-18px", lg: "-15px" }}
            zIndex={2}
            justifyContent="center"
            alignItems="center"
            position="relative"
            mt={{ base: "20px", lg: "15px" }}
          >
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize="24px"
              color="#FFEFD7"
              pt={pt}
            >
              1000
              <chakra.span fontSize={{ base: "14px", lg: "24px" }}>
                SHARD
              </chakra.span>
            </Text>
            <Flex
              w="100px"
              h="38px"
              bgImage="/spins/spin-right.svg"
              position="absolute"
              bottom="-25px"
              cursor="pointer"
              onClick={() => onSpinAsync(1000)}
            />
          </Flex>
        </Flex>
      </Flex>

     {isOpen &&  <Flex
        w="full"
        position="absolute"
        margin="auto"
        top={0}
        left={0}
        borderRadius='8px'
        bgColor="rgba(0,0,0,0.8)"
        h="full"
        justifyContent='center'
        alignItems='center'
        zIndex={200}
      >
        <Spinner color="rgba(255,255,255, 0.5)" />
      </Flex>}
      
    </Flex>
  );
}
