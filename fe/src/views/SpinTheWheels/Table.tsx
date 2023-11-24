import Fetching from "@/components/Fetching";
import { TextVariants } from "@/themes/theme";
import { removeSpecialCharacters } from "@/utils";
import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  headers: {
    name: string;
    w: number;
    isWithdraw?: boolean;
    showIcon?: boolean;
    color?: string;
  }[];
  data: (string | number | boolean)[][];
  noBorderRadius?: boolean;
  isVisibleBgColor?: boolean;
  isScroll?: boolean;
  isWr?: boolean;
  isLoading?: boolean;
  onWithdraw?: (rewardType: boolean | string | number) => void;
}

export default function Table({
  headers,
  data,
  noBorderRadius,
  isVisibleBgColor,
  isScroll,  
  isLoading,
  isWr,
  onWithdraw,  
}: IProps) {

  

  return (
    <Flex
      w={{ base: "full", lg: "922px" }}
      minH="100px"
      borderRadius="8px"
      border="1px solid rgba(201, 201, 201, 0.65)"
      p="10px"
      flexDirection="column"
      position="relative"
      overflowX="auto"
    >
      <Flex w={{base: isScroll ? "570px" : "full", lg: 'full'}} flex={1} flexDirection="column">
        <Flex w="full">
          {headers.map((h, index) => (
            <Flex
              w={{ base: `${isWr ? (index === 0 ? 85 : 60) : h.w}px`, lg: `${h.w}px` }}
              key={h.name}
              p="5px"
            >
              <Text
                variant={TextVariants.WITH_ACTOR}
                fontSize={{ base: "10px", lg: "12px" }}
                color={h.color || "rgba(255, 239, 215, 0.50)"}
                w="full"
                textAlign={index === 0 ? "start" : "center"}
                pl={{ base: "0px", lg: index === 0 ? "20px" : "0px" }}
              >
                {h.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        {data.map((d, rowIndex) => (
          <Flex key={`${d[0]}-${rowIndex}`} w="full" mb="1px">
            {d.map((i, colIndex) => {
              const headerCol = headers[colIndex];
              if (!headerCol) return null;
              const isWithdraw = headerCol.isWithdraw || false;
              const showIcon = headerCol.showIcon || false;
              
              return (
                <Flex
                  key={colIndex}
                  w={{
                    base: `${isWr ? (colIndex === 0 ? 100 : 68) : headerCol.w}px`,
                    lg: `${headers[colIndex].w}px`,
                  }}
                  borderRadius={`${noBorderRadius ? 0 : 8}px`}
                  p={isWithdraw ? 0 : "6px 5px"}
                  bg={
                    isWithdraw
                      ? "transparent"
                      : `rgba(217, 217, 217, ${
                          rowIndex % 2 === 0 ? 0.05 : 0.1
                        })`
                  }
                >
                  {isWithdraw && (
                    <Flex
                      w={{ base: "68.1px", lg: "110px" }}
                      h="31px"
                      bgImage={{
                        base: "/referrals/withdraw-mb.svg",
                        lg: "/referrals/withdraw.svg",
                      }}
                      blendMode={d[5] ? 'luminosity' : 'normal'}
                      opacity={d[5] ? 0.8 : 1}
                      bgRepeat="no-repeat"
                      bgSize="contain"
                      cursor='pointer'
                      borderRadius='8px'
                      onClick={()=> !d[5] && onWithdraw && onWithdraw(i)}
                    />
                  )}
                  {!isWithdraw && (
                    <Flex
                      pl={{ base: "0px", lg: colIndex === 0 ? "20px" : "0px" }}
                      w="full"
                      alignItems='center'
                    >
                      {showIcon && (
                        <Image
                          src={`/referrals/icons/${removeSpecialCharacters(
                            i as string
                          )}.svg`}
                        />
                      )}
                      <Text
                        variant={TextVariants.WITH_ACTOR}
                        fontSize={{ base: "10px", lg: "14px" }}
                        color="#FFEFD7"
                        w="full"
                        textAlign={colIndex === 0 ? "start" : "center"}
                      >
                        {i}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              );
            })}
          </Flex>
        ))}
        {isVisibleBgColor && (
          <>
            <Flex
              flex={1}
              h="full"
              w="50%"
              bg="rgba(35, 25, 11, 0.25)"
              position="absolute"
              left={0}
              top={0}
              borderTopLeftRadius="7px"
              borderBottomLeftRadius="7px"
            />
            <Flex
              flex={1}
              h="full"
              w="50%"
              bg="rgba(12, 0, 35, 0.25)"
              position="absolute"
              right={0}
              top={0}
              borderBottomRightRadius="7px"
              borderTopRightRadius="7px"
            />
          </>
        )}
      </Flex>
      {data.length < 1 && <Flex flex={1} bg='whiteAlpha.100' position='absolute' w='full' h='full' left={0} top={0} 
        justifyContent='center'
        alignItems='center'      
      >
          <Text variant={TextVariants.WITH_TEXT} color='#FFEFD750' fontSize='24px'  pt="5%">NO DATA FOUND!</Text>
      </Flex>}  
      <Fetching minH='100px' isFetching={isLoading || false} bg="blackAlpha.700" left="0px" />
    </Flex>
  );
}
