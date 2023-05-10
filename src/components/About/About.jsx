import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import vdo from '../../assets/videos/vdo.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from '../../assets/docs/termsAndCondition';

const Founder = () => {
  return (
    <>
      <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
        <VStack>
          <Avatar
            src="https://avatars.githubusercontent.com/u/78247921?v=4"
            boxSize={['40', '48']}
          />
          <Text children="Co-Founder" opacity={'0.7'} />
        </VStack>

        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
          <Heading children="Dani Ram Sahu" size={['md', 'xl']} />
          <Text
            alignItems={['center', 'left']}
            children="Hi, I'm a full-stack developer. Our mission is to provide quality content at reasonable price"
          />
        </VStack>
      </Stack>
    </>
  );
};

const VideoPlayer = () => {
  return (
    <>
      <Box>
        <video
          autoPlay={false}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={vdo}
        ></video>
      </Box>
    </>
  );
};

const TandC = ({ termsAndCondition }) => {
  return (
    <>
      <Box>
        <Heading
          size={'md'}
          children="Terms & Conditions"
          textAlign={['center', 'left']}
          my={'4'}
        />

        <Box h="sm" p="4" overflowY={'scroll'}>
          <Text
            textAlign={['center', 'left']}
            letterSpacing={'widest'}
            fontFamily={'heading'}
          >
            {termsAndCondition}
          </Text>

          <Heading
            children="Refund only applicable within 7 days."
            my="4"
            size="xs"
          />
        </Box>
      </Box>
    </>
  );
};

const About = () => {
  return (
    <>
      <Container maxW={'container.lg'} padding="16" boxShadow={'lg'}>
        <Heading children="About Us" textAlign={['center', 'left']} />
        <Founder />

        <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
          <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
            We are a video streaming platform with some premium courses
            available only for premium users.
          </Text>

          <Link to="/subscribe">
            <Button variant="ghost" colorScheme="yellow">
              Checkout Our Plans
            </Button>
          </Link>
        </Stack>

        <VideoPlayer />

        <TandC termsAndCondition={termsAndCondition} />

        <HStack my={'4'} p="4">
          <RiSecurePaymentFill />
          <Heading
            children="Payment is secured by Razorpay"
            fontFamily={'sans-serif'}
            size={'xs'}
            textTransform={'uppercase'}
          />
        </HStack>
      </Container>
    </>
  );
};

export default About;
