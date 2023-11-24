import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { ISpoil } from "@/types";
import SpoilContent from "./SpoilContent";
import NoSpoilContent from "./NoSpoilContent";


interface IProps extends FlexProps {
  spoils: ISpoil[];
  isFetchSpoil: boolean;
  maxH: number;
  minH: number;
  contentMaxH?: number;
}

export default function SpoilsTable({spoils=[], isFetchSpoil=false, maxH = 203, minH= 240, contentMaxH=155, ...props }: IProps) {
  return (
    <Flex
      w="full"
      h="full"
      position="relative"
      flexDirection="column"
      {...props}
    >
      <Flex
        w="full"
        minH={`${minH}px`}
        maxH={{base: 'none', lg: `${maxH}px`}}
        bg="#1B1B1B"
        borderRadius="12px"
        backdropFilter="blur(2.1501457691192627px)"
        border="1px solid rgba(201, 201, 201, 0.65)"
        py="10px"
        flexDirection="column"
        zIndex={2}
      >
        <SpoilContent maxH={contentMaxH}  isFetchSpoil={isFetchSpoil || false} spoils={spoils} />
        {!isFetchSpoil && spoils.length < 1 && <NoSpoilContent />}
      </Flex>
    </Flex>
  );
}
