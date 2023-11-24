import { menus, urls } from "@/configs/strings";
import { MAX_WIDTH } from "@/themes/config";
import { TextVariants } from "@/themes/theme";
import { Flex, FlexProps, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Socials from "@/components/Socials";
import { useRouter } from "next/router";
import { useAppSelector } from "@/reduxs/hooks";

interface IProps extends FlexProps {}
export default function Header({ ...props }: IProps) {

  const { pathname } = useRouter();
  return (
    <Flex
      as="header"
      flexDirection="row"
      w="full"
      maxW={`${MAX_WIDTH}px`}
      py="14px"
      px={{ base: "10px", lg: "0px" }}
      {...props}
    >
      <Link href={urls.logo}>
        <HStack>
          <Image src="./logo.svg" />
          <Image src="./landtorn-logo.svg" />
        </HStack>
      </Link>
      <Flex w="137px" display={{ base: "none", lg: "flex" }} />
      <HStack display={{ base: "none", lg: "flex" }}>
        {menus.map((m, index) => (
          <Link
            key={m.lable}
            href={`${m.url}`}
          >
            <Flex
              w="fit-content"
              position="relative"
              justifyItems="center"
              alignItems="center"
            >
              <Text
                px="26px"
                py="15px"
                mx="5px"
                variant={TextVariants.WITH_MENU}
              >
                {m.lable}
              </Text>
              {pathname === m.url && (
                <Image
                  src="./navs/active.svg"
                  position="absolute"
                  bottom="-5px"
                  left={0}
                  right={0}
                  margin="auto"
                />
              )}
            </Flex>
          </Link>
        ))}
      </HStack>
      <Spacer />
      <Socials display={{ base: "none", lg: "grid" }} mt="10px" />
      <MobileMenu />
    </Flex>
  );
}
