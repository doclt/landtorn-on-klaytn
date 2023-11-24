import React, { useCallback, useEffect, useState } from "react";
import HomeContainer from "../HomePages/HomeContainer";
import { Flex, HStack, Text, Box, Image } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import TornLorakDescription from "./components/TornLorakDescription";
import Paladin from "./components/Paladin";
import { motion } from "framer-motion";
import PaladinIronFistMobile from "./components/PaladinMobile";
import MythicCard from "./components/MythicCard";
import MintButton from "./components/MintButton";
import { TornLorks } from "@/configs/strings";
import { ErrorType, PaladinType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { getAccountInfoByTokenId } from "@/apis/account.api";
import { setErrorModalAction } from "@/reduxs/modals/modal.slices";
import { useRouter } from "next/router";
import { MythicContract } from "@/contracts/MythicContract";
import { useAccount } from "wagmi";
import ContentDesktop from "./ContentDesktop";

export default function TornLorakContainer() {
  const dispatch = useAppDispatch();
  const { push, back } = useRouter();
  const { nft } = useAppSelector((p) => p.account);
  const [activeType, setActiveType] = useState<PaladinType>("Paladin");
  const [mythicIds, setMythicIds] = useState<number[]>([]);
  const { address } = useAccount();

  const fetchMythicNftAsync = useCallback(async () => {
    try {
      if (!nft) {
        push("/lorak");
        setMythicIds([]);
        return;
      }
      let ids: number[] =[];
      try {
        const accountInfo = await getAccountInfoByTokenId(nft.tokenId);
        ids = accountInfo.AccountMythic.map((p) => p.Spoil.id);
      } catch(ex1) {}     

      if (address) {
        const mythicContract = new MythicContract();
        const mythicIds = await mythicContract.getMythicIds(address);
        ids.push(...mythicIds);
      }
      setMythicIds(ids);
    } catch (ex) {
      console.log((ex))
      dispatch(setErrorModalAction(ErrorType.OH_NO));
      setMythicIds([]);
    }
  }, [nft, address]);

  useEffect(() => {
    fetchMythicNftAsync();
  }, [fetchMythicNftAsync]);

  const onMint = () => {
    return; //alert('Mint...')
  };

  return (
    <>
      <HomeContainer zIndex={1} position="relative" mt={{base: '10px', lg: '0px'}}>
        <Flex
          w="full"
          maxW={{ base: "380px", lg: "1020.78px" }}
          minH={{ base: "300px", lg: "941.26px" }}
          bgImage={{
            base: "./torn-loraks/bg-mb.svg",
            lg: "./torn-loraks/bg.svg",
          }}
          bgRepeat="no-repeat"
          bgSize="contain"
          mt="15px"
          flexDirection="column"
          alignItems="center"
          position="relative"
          ml={{ base: "15px", lg: undefined }}
          zIndex={1}
        >
          <Image
            src="./torn-loraks/back.svg"
            position="absolute"
            left={{base: '4px', lg: "50px"}}
            top={{base: '13px', lg: "20px"}}
            w={{base: '28px', lg: '38px'}}
            cursor="pointer"
            opacity={{base: 0.8, lg: 1}}
            //display={{ base: "none", lg: "block" }}
            onClick={() => back()}
          />
          <HStack>
            <Text
              variant={TextVariants.WITH_TEXT}
              fontSize={{ base: "16px", lg: "32px" }}
              mt={{ base: "15px", lg: "30px" }}
            >
              TORNLORD
            </Text>
          </HStack>
          <TornLorakDescription />
          <ContentDesktop mt="30px" display={{ base: "none", lg: "flex" }}>
            <Paladin
              type="Paladin"
              isActive={activeType === "Paladin"}
              onClick={() => setActiveType("Paladin")}
            />

            <Paladin
              type="IronFist"
              isActive={activeType === "IronFist"}
              onClick={() => setActiveType("IronFist")}
            />
            {TornLorks.map((p) => (
              <MythicCard
                key={p.id}
                index={p.id}
                color={
                  activeType === "Paladin" ? p.paladinColor : p.ironFistColor
                }
                top={p.desktop.top}
                bottom={p.desktop.bottom}
                left={p.desktop.left}
                right={p.desktop.right}
                margin={p.desktop.margin}
                type={activeType}
                paladinId={p.paladinId}
                ironFistId={p.ironFistId}
                mythicIds={mythicIds}
                className={`wow fadeIn`}
              />
            ))}
            <MintButton onClick={onMint} />
          </ContentDesktop>
        </Flex>
      </HomeContainer>

      <Flex
        flexDirection="column"
        display={{ base: "flex", lg: "none" }}
        position="relative"
      >
        <Flex position="absolute" w="full" top="-40px" justifyContent="center">
          <PaladinIronFistMobile
            type={"Paladin"}
            left={"20px !important"}
            isActive={activeType === "Paladin"}
            onClick={() => setActiveType("Paladin")}
            zIndex={2}
          />
          <PaladinIronFistMobile
            right={"20px !important"}
            type={"IronFist"}
            zIndex={2}
            isActive={activeType === "IronFist"}
            onClick={() => setActiveType("IronFist")}
          />
        </Flex>
        <Flex
          w="full"
          h="480px"
          bgImage="./torn-loraks/mb-ft-content.svg"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          margin="0px auto"
          zIndex={0}
          mt="-90px"
          justifyContent="center"
          alignItems="flex-end"
          position="relative"
        >
          <Flex
            w="295.79px"
            h="295.79px"
            borderRadius="full"
            bgImage="./torn-loraks/cicel-bg-mb.svg"
            bgRepeat="no-repeat"
            mb="30px"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Flex
              w="270px"
              h="270px"
              borderRadius="full"
              bgImage="./torn-loraks/1.png"
              bgPosition="center"
              bgRepeat="no-repeat"
              position="absolute"
            />
            {TornLorks.map((p) => (
              <MythicCard
                key={p.id}
                index={p.id}
                color={
                  activeType === "Paladin" ? p.paladinColor : p.ironFistColor
                }
                top={p.mobile.top}
                bottom={p.mobile.bottom}
                left={p.mobile.left}
                right={p.mobile.right}
                margin={p.mobile.margin}
                type={activeType}
                paladinId={p.paladinId}
                ironFistId={p.ironFistId}
                mythicIds={mythicIds}
              />
            ))}
            <MintButton w="142px" h="47px" bottom="-70px" onClick={onMint} />
          </Flex>
        </Flex>
        <Flex w="full" h="250px" />
      </Flex>
    </>
  );
}
