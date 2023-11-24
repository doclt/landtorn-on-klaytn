import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import NoSpoilContent from "@/views/Landings/components/SpoilsTable/NoSpoilContent";
import SpoilContent from "@/views/Landings/components/SpoilsTable/SpoilContent";

interface IProps extends FlexProps {}

export default function SpoilsTable({ ...props }: IProps) {
  const { spoils, isFetchSpoil } = useAppSelector((p) => p.account);
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
        minH="300px"
        maxH="356px"
        bg="#1B1B1B"
        borderRadius="12px"
        backdropFilter="blur(2.1501457691192627px)"
        border="1px solid rgba(201, 201, 201, 0.65)"
        py="10px"
        flexDirection="column"
        zIndex={2}
      >
        <SpoilContent maxH={300} isFetchSpoil={isFetchSpoil || false} spoils={spoils} />
        {!isFetchSpoil && spoils.length < 1 && <NoSpoilContent />}
      </Flex>
    </Flex>
  );
}
