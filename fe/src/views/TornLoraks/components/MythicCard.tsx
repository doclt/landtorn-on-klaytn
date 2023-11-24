import { PaladinType } from '@/types';
import { Box, BoxProps, Image } from '@chakra-ui/react'
import React, { useMemo } from 'react'

interface IProps extends BoxProps {
  color: string;
  index: number;
  type: PaladinType;
  paladinId?: number;
  ironFistId?: number;
  mythicIds: number[];
}
export default function MythicCard({color='#A9FF3C', index = 1, type, paladinId, ironFistId, mythicIds, ...props}: IProps) {

  const isActive = useMemo(() => {
    if (index === 1) return true;
    if (mythicIds.length < 1) return false; 
    if (ironFistId === undefined && paladinId === undefined) return false;
    if (type === 'Paladin')
      return mythicIds.some(p => p === paladinId);
    else 
      return mythicIds.some(p => p === ironFistId);
  }, [paladinId, ironFistId, mythicIds, type]);

  const imgWidth = useMemo(() => {
    if (index === 6 && type === 'Paladin') return '52px';
    if (index === 1) return 'full';
    return "60px";
  }, [type, index]);

  return (
    <Box
      w={{base: '60px', lg: "94px"}}
      h={{base: '70px', lg: "110px"}}
      position='absolute'
      bgImage="./torn-loraks/mythic-bg.svg"
      bgSize='cover'     
      justifyContent='center'
      alignItems='center' 
      display='flex'
      blendMode={isActive ? undefined : 'luminosity'}
      opacity={isActive ? 1 : 0.95}
      {...props}
    >
       {isActive && <Box 
          bgColor={color}
          w={{base: '30px', lg: '60.34px'}}
          h={{base: '40px',  lg: '70.1px'}}
          borderRadius='full'
          filter={`blur(${index === 1 ? 15 : 25}px)`}
          mixBlendMode={index === 1 ? 'overlay' : undefined}
          position='absolute'
          zIndex={index === 1 ? 12 : 2}        
        />}
        <Image src={`./torn-loraks/icons/${type}/${index}.png`} 
          objectFit='contain'
          opacity={isActive ? 1 : 0.5}
          w={{base: index ===1 ? 'full' : '38px', lg: imgWidth}}
          blendMode={isActive ? undefined : 'luminosity'}          
        zIndex={5} />
    </Box>
  )
}
