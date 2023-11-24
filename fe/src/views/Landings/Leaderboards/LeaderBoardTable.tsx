import { Flex, FlexProps } from "@chakra-ui/react";
import React, { useMemo } from "react";
import LeaderBoardSummary from "./LeaderBoardSummary";
import { useAppSelector } from "@/reduxs/hooks";
import SpoilsTable from "../components/SpoilsTable";

interface IProps extends FlexProps {}

export default function LeaderBoardTable({ ...props }: IProps) {
  const { spoils, isFetchSpoil } = useAppSelector((p) => p.account);
  const tableHeight = useMemo(() => {
    if(spoils.length > 0) return 276;
    return 285;
  }, [spoils]);
  return (
    <Flex
      w="full"
      h="full"
      position="relative"
      flexDirection="column"
      {...props}
    >
        <SpoilsTable
          spoils={spoils}
          isFetchSpoil={isFetchSpoil || false}    
          maxH={tableHeight} 
          minH={tableHeight}
          contentMaxH={220}
        />
        <LeaderBoardSummary />
    </Flex>
  );
}
