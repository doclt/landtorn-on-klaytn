import React, { useCallback, useEffect, useMemo, useState } from "react";
import LandingContainer from "../Landings/components/LandingContainer";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { TextVariants } from "@/themes/theme";
import WheelMonk from "./WheelMonk";
import { getEthersSigner } from "@/hooks/useEtherSigner";
import { LuckySpinContract } from "@/contracts/LuckySpinContract";
import { useAccount } from "wagmi";
import { ISpinAccountDetail } from "@/types";
import SpinResultModal from "./SpinResultModal";
import Table from "./Table";

const Headers = [
  { name: "Rewards", w: 302.453 },
  { name: "Total", w: 199 },
  { name: "Claimed", w: 200 },
  { name: "Available", w: 200 },
  { name: "", w: 110, isWithdraw: true },
];

const data1 = [
  [
    { label: "Outcome", color: "rgba(255, 239, 215, 0.50)" },
    { label: "0x", color: "#FFA012" },
    { label: "0.5X", color: "#FFA012" },
    { label: "1.25X", color: "#B88AFF" },
    { label: "1.5x", color: "#B88AFF" },
    { label: "1.75x", color: "#B88AFF" },
    { label: "2.5x", color: "#B88AFF" },
    { label: "3x", color: "#FF8A8A" },
    { label: "6x", color: "#FF8A8A" },
  ],
  [
    { label: "Chances", color: "rgba(255, 239, 215, 0.50)" },
    { label: "40%", color: "#FFEFD7" },
    { label: "6%", color: "#FFEFD7" },
    { label: "4%", color: "#FFEFD7" },
    { label: "24%", color: "#FFEFD7" },
    { label: "12%", color: "#FFEFD7" },
    { label: "6%", color: "#FFEFD7" },
    { label: "6%", color: "#FFEFD7" },
    { label: "2%", color: "#FFEFD7" },
  ],
];

export default function SpinTheWheel() {
  const { address } = useAccount();
  const [accountDetail, setAccountDetail] = useState<ISpinAccountDetail>();
  const [res, setRes] = useState<string>();
  const {isOpen, onClose, onOpen} = useDisclosure();

  const getAccountDetails = useCallback(async () => {
    onClose();
    const signer = await getEthersSigner();
    if (!address || !signer) return;
    const luckySpinContract = new LuckySpinContract(signer);
    const rs = await luckySpinContract.getAccountDetails(address);
    setAccountDetail(rs);
  }, [address]);

  const data = useMemo(() => {
    if (!accountDetail) return [[]];
    return [
      [
        "Outcome",
        (accountDetail?.claimed || 0) + (accountDetail?.balance || 0),
        accountDetail?.claimed,
        accountDetail?.balance,
        true,
      ],
    ];
  }, [accountDetail]);

  const onWithdrawAsync = async () => {
    try {
      const signer = await getEthersSigner();
      if (!signer) return;
      const luckySpinContract = new LuckySpinContract(signer);
      await luckySpinContract.claim();
      await getAccountDetails();
    } catch (ex) {
      console.log(ex)
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, [getAccountDetails]);

  return (
    <LandingContainer
      contentStyle={{
        bgColor: "#1B1B1B",
        borderRadius: "10px",
        border: { base: "none", lg: "0.776px solid rgba(201, 201, 201, 0.65)" },
        p: { base: "0px", lg: "15px" },
        gap: "20px",
        bgImage: {
          base: "/referrals/top-bg-mb.png",
          lg: "/referrals/top-bg.png",
        },
        bgRepeat: "no-repeat",
        bgPosition: "top",
        minH: "90vh",
      }}
    >
      <Flex
        flexDirection="column"
        borderRadius="10px"
        border={{ base: "0.776px solid rgba(201, 201, 201, 0.65)", lg: "none" }}
        gap="20px"
      >
        <Flex flexDirection="column" p={{ base: "10px", lg: "0px" }} mb="20px">
          <Text
            variant={TextVariants.WITH_TEXT}
            fontSize={{ base: "28px", lg: "32px" }}
            lineHeight={{ base: "90%", lg: "120%" }}
          >
            In the streets of Argun you found a Spin the Wheel Monk.
          </Text>
          <Text
            variant={TextVariants.WITH_ACTOR}
            fontSize={{ base: "12px", lg: "14px" }}
            mt={{ base: "10px", lg: "0px" }}
          >
            Play a game of chance with the Monk. Every round costs 100 or 1000
            $SHARD, you can win up to 5X of your stake.
          </Text>
        </Flex>
        <WheelMonk onSuccess={(res) => {
          setRes(res);
          onOpen();
        }} />
        <Flex
          w={{ base: "full", lg: "922px" }}
          minH="100px"
          borderRadius="8px"
          border="1px solid rgba(201, 201, 201, 0.65)"
          p="10px"
          flexDirection={{ base: "row-reverse", lg: "column" }}
          position="relative"
          overflowX="auto"
          justifyContent="center"
        >
          {data1.map((d, i) => (
            <Flex
              key={i}
              w="full"
              flexDirection={{ base: "column", lg: "row" }}
            >
              {d.map((col, colIndex) => (
                <Flex
                  key={`${i}-${colIndex}`}
                  flex={1}
                  w={{ base: "full", lg: "100px" }}
                  minH="31px"
                  justifyContent="center"
                  alignItems="center"
                  bgColor="rgba(217, 217, 217, 0.05)"
                  borderRadius="8px"
                  mb="1px"
                >
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    color={col.color}
                  >
                    {col.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          ))}
        </Flex>

        <Table headers={Headers} data={data} onWithdraw={()=>onWithdrawAsync()} />
      </Flex>
      <SpinResultModal
        spinResult={res}
        isOpen={isOpen}
        onClose={() => getAccountDetails()}
      />
    </LandingContainer>
  );
}
