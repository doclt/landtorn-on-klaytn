import CommonModal from "@/components/CommonModal/Index";
import { dungeon_data } from "@/configs/strings";
import { useAppSelector } from "@/reduxs/hooks";
import { DistributionType } from "@/reduxs/modals/modal.slices";
import { TextVariants } from "@/themes/theme";
import {
  Text,
  Flex,
  ModalProps,
  chakra,
  Image,
  HStack,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

interface IProps extends Omit<ModalProps, "children"> {
  title: string;
  dungeonType?: DistributionType;
}

export default function DistributionModal({
  title,
  dungeonType = 3,
  ...props
}: IProps) {
  const {distribution} =useAppSelector(p=>p.dungeon);

  return (
    <CommonModal
      isCentered
      scrollBehavior="inside"
      wBg={496}
      hBg={656}
      title={"IMPORTANT"}
      contentMobileProps={{
        h: '550px'
      }}
      {...props}
    >
      <Flex
        flex={1}
        h="550px"
        overflowY="auto"
        flexDirection="column"
        alignItems="center"
        className="leader-board-table distribution-scroll"
        pb="20px"
      >
        <Text variant={TextVariants.WITH_TEXT_400} fontSize={{base: '13px', lg: "16px"}} w='full' textAlign='center'>
          <chakra.span color="#FFA012"> SURVIVE STATS:</chakra.span> If you do
          not meet the Survive Stats of a Dungeon. You will get an additional
          10% chance of death on each Dungeon run. <br />
          <br />
          <chakra.span color="#FFA012">CHANCES:</chakra.span> All chances are
          given for each Dungeon run. Probabilities are calculated through an
          RNG Oracle. <br />
          <br />
          <chakra.span color="#FFA012">$SHARD:</chakra.span> To get $SHARD out
          of the game Settlers need to find Ritual Stones. Enchanting your
          Settler with $SHARD increases your chances to find Ritual Stones and
          reach deeper dungeons without Death.
        </Text>
        <Image src="/modals/line-start.svg" my="10px" />
        <Text
          variant={TextVariants.WITH_TEXT}
          textTransform="uppercase"
          fontSize={{base: '22px', lg: "32px"}}
        >
          Distribution
        </Text>

        <Flex
          w={{base:  'full', lg: "416px"}}
          border="1px solid rgba(201, 201, 201, 0.65)"
          borderRadius="12px"
          bg="#1B1B1B"
          backdropFilter="blur(2.1px)"
          p="10px"
          flexDirection="column"
        >
          <Flex>
            <Flex
              flex={1}
              h="40px"
              borderRadius="8px"
              alignItems="center"
              px="15px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                What To Expect
              </Text>
            </Flex>
            <Flex
              w={{base: '100px', lg: "138px"}}
              h="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize="14px"
                color="rgba(255, 239, 215, 0.50)"
              >
                Сhance
              </Text>
            </Flex>
          </Flex>

          {distribution?.distribution.map((d, index) => (
            <Flex key={index}>
              <Flex
                bgColor={`${
                  index % 2 === 0
                    ? "rgba(217, 217, 217, 0.10)"
                    : "rgba(217, 217, 217, 0.05)"
                }`}
                flex={1}
                h="40px"
                borderRadius="8px"
                alignItems="center"
                px="15px"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize="14px"
                  color="#FFEFD7"
                >
                  {d.rewardName}
                </Text>
              </Flex>
              <Flex
                bgColor={`${
                  index % 2 === 0
                    ? "rgba(217, 217, 217, 0.10)"
                    : "rgba(217, 217, 217, 0.05)"
                }`}
                w={{base: '100px', lg: "138px"}}
                h="40px"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize="14px"
                  color="#FFEFD7"
                >
                  {d.ratio}%
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Image src="/modals/line-start.svg" my="10px" />
        <Text
          variant={TextVariants.WITH_TEXT}
          textTransform="uppercase"
          fontSize={{base: '22px', lg: "32px"}}
        >
          ENCHANT EFFECT
        </Text>

        <Flex
          w={{base: 'full', lg: "416px"}}
          border="1px solid rgba(201, 201, 201, 0.65)"
          borderRadius="12px"
          bg="#1B1B1B"
          backdropFilter="blur(2.1px)"
          p="10px"
          flexDirection="column"
        >
          <Text
            variant={TextVariants.WITH_ACTOR}
            fontSize={{base: '10px', lg: "13px"}}
            color="#FFEFD7"
            w={{base: 'full', lg: "394px"}}
            mb="10px"
            textAlign='center'
            letterSpacing='-0.5px'
          >
            Enchanting your Settler gives increases chances to find Ritual
            Stones, needed for Sacrifice, and lower chance on Death.
          </Text>

          <Flex>
            <Flex
              flex={1}
              h="40px"
              borderRadius="8px"
              alignItems="center"
              px="15px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{base: '10px', lg: "14px"}}
                color="rgba(255, 239, 215, 0.50)"
              >
                Enchanted
              </Text>
            </Flex>
            <Flex
              w={{base: '100px', lg: "118px"}}
              h="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{base: '10px', lg: "14px"}}
                color="rgba(255, 239, 215, 0.50)"
                textAlign='center'
              >
                Ritual Stone Drop
              </Text>
            </Flex>
            <Flex
              w={{base: '100px', lg: "138px"}}
              h="40px"
              justifyContent="center"
              alignItems="center"
              borderRadius="8px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{base: '10px', lg: "14px"}}
                color="rgba(255, 239, 215, 0.50)"
              >
                Death Chance
              </Text>
            </Flex>
          </Flex>

          {distribution?.enchant.map((en, index) => (
            <Flex key={index}>
              <Flex
                bgColor={`${
                  index % 2 === 0
                    ? "rgba(217, 217, 217, 0.10)"
                    : "rgba(217, 217, 217, 0.05)"
                }`}
                flex={1}
                h="40px"
                borderRadius="8px"
                alignItems="center"
                px="15px"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize="14px"
                  color="#FFEFD7"
                >
                  {en.enchanted}
                </Text>
              </Flex>
              <Flex
                bgColor={`${
                  index % 2 === 0
                    ? "rgba(217, 217, 217, 0.10)"
                    : "rgba(217, 217, 217, 0.05)"
                }`}
                w={{base: '100px', lg: "118px"}}
                h="40px"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize="14px"
                  color="#FFEFD7"
                >
                  {en.ritualStone}%
                </Text>
              </Flex>
              <Flex
                bgColor={`${
                  index % 2 === 0
                    ? "rgba(217, 217, 217, 0.10)"
                    : "rgba(217, 217, 217, 0.05)"
                }`}
                w={{base: '100px', lg: "138px"}}
                h="40px"
                justifyContent="center"
                alignItems="center"
                borderRadius="8px"
              >
                <Text
                  variant={TextVariants.WITH_ACTOR}
                  fontSize="14px"
                  color="#FFEFD7"
                >
                  {en.death}%
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </CommonModal>
  );
}
