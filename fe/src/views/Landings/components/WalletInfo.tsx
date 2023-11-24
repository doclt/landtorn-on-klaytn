import { useGlobal } from "@/contexts/Globals";
import { logoutAction } from "@/reduxs/accounts/account.actions";
import { useAppDispatch } from "@/reduxs/hooks";
import { TextVariants } from "@/themes/theme";
import { showSortAddress } from "@/utils";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";

export default function WalletInfo() {
  const dispatch = useAppDispatch();
  const {disconnect} = useDisconnect();
  const { address, isConnected } = useAccount();
  const {pt}=useGlobal();
 
  const {isOpen, onToggle} = useDisclosure();

  if (!isConnected) return null;

  const handleLogout = () => {  
    dispatch(logoutAction());
    disconnect();
  }

  return (
    <>
      <Menu>
        <MenuButton as={Flex} zIndex={11} onClick={onToggle} cursor='pointer'>
          <Flex
            bgImage="./wallets/connected.png"
            w={{ base: "140px", lg: "183px" }}
            h={{ base: "51px", lg: "63px" }}
            bgSize="cover"
            bgRepeat="no-repeat"
            justifyContent="center"
            alignItems="center"
            mr={{base: '-25px', lg: "-10px"}}
            cursor="pointer"
            
          >
            <Image src="./wallets/arrow-down.svg"
              mr="15px"
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
            />
            
            <Text
              variant={TextVariants.WITH_TEXT_400}
              fontSize={{ base: "18px", lg: "22px" }}
              mt="-5px"
              mr="20px"
              pt={pt}
            >
              {showSortAddress(address || "")}
            </Text>
          </Flex>
        </MenuButton>
        <MenuList
          zIndex={10}
          mt="-45px !important"
          minW={{base: '100px !important', lg:"153px !important"}}
          w={{base: '118px !important', lg:"150px !important"}}
          h="56px !important"
          marginLeft={{base: '10px !important', lg: "15px !important"}}
          bgColor="#1D151F"
        >
          <MenuItem bgColor="transparent" mt="20px !important"
            onClick={() => handleLogout()}
          >
            <Text variant={TextVariants.WITH_TEXT_400} fontSize="18px" color='rgba(255, 239, 215, 0.50)'>
              Disconnect
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
