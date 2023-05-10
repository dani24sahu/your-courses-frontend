import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import {
  TiSocialInstagramCircular,
  TiSocialLinkedinCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';
import React from 'react';

const Footer = () => {
  return (
    <>
      <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack direction={['column', 'row']}>
          <VStack alignItems={['center', 'flex-start']} width={'full'}>
            <Heading children="©️ All Rights Reserved" color={'white'} />

            <Heading
              children="@Dani Ram Sahu"
              fontFamily={'body'}
              size={'sm'}
              color={'yellow.400'}
            />
          </VStack>

          <HStack
            spacing={['2', '10']}
            justifyContent={'center'}
            color={'white'}
            fontSize={50}
          >
            <a
              href="https://linkedin.com/in/dani24"
              target={'_blank'}
              rel="noreferrer"
            >
              <TiSocialLinkedinCircular />
            </a>

            <a
              href="https://instagram.com/dan_i_24"
              target={'_blank'}
              rel="noreferrer"
            >
              <TiSocialInstagramCircular />
            </a>

            <a
              href="https://github.com/dani24sahu"
              target={'_blank'}
              rel="noreferrer"
            >
              <DiGithub />
            </a>
          </HStack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
