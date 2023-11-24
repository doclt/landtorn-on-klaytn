import Socials from "@/components/Socials";
import { menus } from "@/configs/strings";
import { TextVariants } from "@/themes/theme";
import {
  useDisclosure,
  Text,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function MobileMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  return (
    <>
      <Image
        src="./menu.svg"
        display={{ base: "block", lg: "none" }}
        onClick={onOpen}
        cursor="pointer"
        ref={btnRef}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor={"black"}>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack w="full" alignItems="flex-start" pt="20px">
              <Socials mb="20px" />              
              {menus.map((m, index) => (
                <Link href={m.url} key={m.lable}>
                  <Text
                    mx="5px"
                    variant={TextVariants.WITH_MENU}
                    borderBottom="1px solid rgba(0,0,0, 0.2)"
                  >
                    {m.lable}
                  </Text>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
