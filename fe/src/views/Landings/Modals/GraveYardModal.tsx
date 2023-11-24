import CommonModal from "@/components/CommonModal/Index";
import Fetching from "@/components/Fetching";
import { setSelectedNftAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { LandTornNFT } from "@/types";
import { numberFormat } from "@/utils";
import { Text, Flex, ModalProps } from "@chakra-ui/react";
import React from "react";

interface IProps extends Omit<ModalProps, "children"> {}
export default function GraveYardModal({onClose, ...props }: IProps) {
  const dispatch = useAppDispatch();
  const { isFetchingTornDied, tornsDied } = useAppSelector((p) => p.account);  

const onSelectSettler = async(torn: LandTornNFT)=> {
  dispatch(setSelectedNftAction({ nft: torn, isNew: false }));
  onClose();
}




  return (
    <CommonModal hBg={368} wBg={700} title={"GraveYARD"} onClose={onClose} {...props}>
      <Flex
        w={"full"}
        maxW="670px"
        h={{ base: "500px", lg: "295px" }}
        bg="#1B1B1B"
        marginTop="-20px"
        borderRadius="10px"
        border="1px solid rgba(201, 201, 201, 0.65)"
        backdropFilter="blur(1.7px);"
        flexDirection="column"
        position="relative"
        overflowX="auto"
      >
        <Flex w={{ base: "640px", lg: "640px" }} flexDirection="column">
          <Flex
            w="full"
            my="7px"
            mx="7px"
          >
            <Flex w="130px">
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                Dead Settler
              </Text>
            </Flex>
            <Flex flex={1}>
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                Status
              </Text>
            </Flex>
            <Flex w="110px" className="col-center">
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                Shard Power
              </Text>
            </Flex>
            <Flex w="90px" className="col-center">
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                ATK/DEF
              </Text>
            </Flex>
            <Flex w="90px" className="col-center">
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                Mythics
              </Text>
            </Flex>
            <Flex w='80px' />
          </Flex>
          <Flex
            flex={1}
            mx="7px"
            className="leader-board-table"
            overflowY="auto"
            overflowX="auto"
            flexDirection="column"
            w="full"
          >
            {tornsDied.map((torn, index) => (
              <Flex
                w="full"
                key={torn.tokenId}
                className="graveyard-row"
                mb="1px"
                alignItems='center'
                //display={{base: 'none', lg: 'flex'}}
              >
                <Flex w="125px" className="graveyard-column">
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    pl="22px"
                  >
                    {torn.name}
                  </Text>
                </Flex>
                <Flex flex={1} className="graveyard-column">
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    color="rgba(255, 239, 215, 0.50)"
                  >
                    {torn.reason || "-- --"}
                  </Text>
                </Flex>
                <Flex w="100px" className="graveyard-column col-center">
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    color="rgba(255, 239, 215, 0.50)"
                  >
                    {numberFormat(torn.shardPower)}
                  </Text>
                </Flex>
                <Flex w="100px" className="graveyard-column col-center">
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    color="rgba(255, 239, 215, 0.50)"
                  >
                    {`${torn.atk}/${torn.def}`}
                  </Text>
                </Flex>
                <Flex w="100px" className="graveyard-column col-center">
                  <Text
                    variant={TextVariants.WITH_ACTOR}
                    fontSize="14px"
                    color="rgba(255, 239, 215, 0.50)"
                  >
                    {numberFormat(torn.totalMythic)}
                  </Text>
                </Flex>
                <Flex w='80px'
                  h='26.8px'
                  bgImage='/modals/claim-btn.svg'
                  cursor='pointer'
                  onClick={() => onSelectSettler(torn)}
                >                  
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Fetching isFetching={isFetchingTornDied || false} mt="0px" />
        </Flex>
      </Flex>
    </CommonModal>
  );
}
