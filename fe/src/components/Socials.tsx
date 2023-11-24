import { socials } from "@/configs/strings";
import { Image, SimpleGrid, SimpleGridProps } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IProps extends SimpleGridProps {}
export default function Socials({...props}: IProps) {
  return (
    <SimpleGrid columns={3} columnGap="20px" {...props}>
      {new Array(3).fill("/").map((_, index) => (
        <Link href={socials[(index + 1) as keyof typeof socials]} target="_blank" key={index}>
          <Image src={`./socials/${index + 1}.svg`} />
        </Link>
      ))}
    </SimpleGrid>
  );
}
