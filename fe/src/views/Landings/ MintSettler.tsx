import { mintsData } from "@/configs/strings";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import {
  Box,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";
import { ModalName, openOrCloseModal } from "@/reduxs/modals/modal.slices";
import LandingContainer from "./components/LandingContainer";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { setConnectWalletAndMintSettlerAction } from "@/reduxs/accounts/account.actions";

export default function MintSettler() {
  const dispatch = useAppDispatch();
  const { nfts } = useAppSelector((p) => p.account);

  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleMintAsync = async () => {
    if (!isConnected) {
      dispatch(setConnectWalletAndMintSettlerAction(true));
      openConnectModal && openConnectModal();
      return;
    }
    dispatch(openOrCloseModal(ModalName.MINT_YOUR_SETTLER));
  };

  return (
    <LandingContainer
      px={{ base: "0px", lg: "35px" }}
      contentStyle={{ maxW: { base: "full", lg: "960px" } }}
    >
      <Stack
        w="full"
        justifyContent="space-between"
        direction={{ base: "column", lg: "row" }}
        mt={{ base: "20px", lg: 0 }}
      >
        <Flex
          position="relative"
          alignItems="center"
          flexDirection="column"
          className="wow bounceInLeft"
        >
          <Image
            src={`./character${nfts.length < 1 ? "-non" : ""}.png`}
            w={{ base: "238.21px", lg: "297px" }}
          />
          <Image
            src={`./${nfts.length < 1 ? "non-" : ""}min-settler.png`}
            position="absolute"
            bottom={{ base: "-59px", lg: "33px" }}
            w={{ base: "70%", lg: "100%" }}
            left={0}
            right={0}
            margin="auto"
            onClick={handleMintAsync}
            cursor="pointer"
          />
        </Flex>
        <Spacer />
        <Flex
          w={{ base: "full", lg: "600px" }}
          flexDirection="column"
          maxW={{ base: "full", lg: "765px" }}
          bgColor={{ base: "rgba(255, 247, 235, 0.10)", lg: "transparent" }}
          py={{ base: "16px" }}
          alignItems="flex-start"
          mt={{ base: "70px !important", lg: "0px !important" }}
        >
          <Text
            variant={TextVariants.WITH_TEXT}
            fontSize={{ base: "16px", lg: "28px" }}
            textAlign={{ base: "center", lg: "start" }}
            className="wow fadeIn"
            data-wow-delay="0.5s"
          >
            Welcome to Lorak, LandTorn meta-game. The place for Torn Collective
            early adopters and the forge of TornLords.
          </Text>

          <Text
            variant={TextVariants.WITH_TEXT_400}
            fontSize={{ base: "16px", lg: "24px" }}
            mb="22px"
            className="wow fadeIn"
            data-wow-delay="0.5s"
            w="full"
            textAlign={{ base: "center", lg: "start" }}
          >
            Mint a Torn NFT now to:
          </Text>

          <SimpleGrid
            w="full"
            columns={2}
            columnGap={{ base: "5px", lg: "20px" }}
            rowGap={{ base: "10px", lg: "22px" }}
            ml={{ lg: "24px" }}
            mx={{ base: "10px", lg: "20px" }}
          >
            {new Array(4).fill(0).map((_, index) => (
              <Flex
                w={{ base: "160px", lg: "265px" }}
                h={{ base: "48px", lg: "87px" }}
                bgImage={{
                  base: "./mints/bg-container-mb.svg",
                  lg: "./mints/bg-container.svg",
                }}
                key={index}
                position="relative"
                alignItems="center"
                bgRepeat="no-repeat"
                bgSize="contain"
                ml={{ base: "15px", lg: "0px" }}
                className={`wow ${
                  index % 2 === 0 ? "bounceInLeft" : "bounceInRight"
                }`}
              >
                <Box
                  bgImage={`./stones/${index + 1}.svg`}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  w={{ base: "55px", lg: "90px !important" }}
                  h={{ base: "55px", lg: "90px !important" }}
                  zIndex={10}
                  position="absolute"
                  left={{ base: "-25px", lg: "-40px" }}
                  top={{ base: "-6px", lg: "-13px" }}
                />
                <Text
                  variant={TextVariants.WITH_TEXT_400}
                  fontSize={{ base: "12px", lg: "20px" }}
                  pl={{ base: "30px", lg: "55px" }}
                  pr={{ lg: "5px" }}
                  mt={{ lg: "-10px" }}
                >
                  {mintsData[(index + 1) as keyof typeof mintsData]}
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        </Flex>
      </Stack>
    </LandingContainer>
  );
}
