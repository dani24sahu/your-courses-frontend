import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/subscription';
import { toast } from 'react-hot-toast';

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );

  const {  error: courseError } = useSelector(
    state => state.course
  );

  const subscribeHandler = async () => {
    const { data:{key} } = await axios.get(`${server}/razorpaykey`);

    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }

    if (subscriptionId) {

      const openPopUp = () => {
        const options = {
          key,
          name: "YourCourses",
          description: "Get access to all premium content",
          image: "https://www.publicdomainpictures.net/pictures/120000/velka/yin-yang-14264436247Kt.jpg",
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "@daniramsahu",
          },
          theme: {
            color: '#ffc800',
          }
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [dispatch, error, user.name, user.email, key, courseError, subscriptionId]);

  return (
    <>
      <Container h="90vh" p="16">
        <Heading children="Welcome" my="8" textAlign={'center'} />

        <VStack
          boxShadow={'lg'}
          alignItems={'stretch'}
          borderRadius={'lg'}
          spacing={'0'}
        >
          <Box bg="yellow.400" p="4" css={{ borderRadius: '8px 8px 0 0' }}>
            <Text children={'Pro Pack - Rs299.00'} color="black" />
          </Box>

          <Box p="4">
            <VStack textAlign={'center'} px="8" mt="4" spacing={'8'}>
              <Text children="Join Pro pack and get access to all content." />
              <Heading children="Rs299 Only" size="md" />
            </VStack>

            <Button
              onClick={subscribeHandler}
              my="8"
              width="full"
              colorScheme="yellow"
              isLoading={loading}
            >
              Buy Now
            </Button>
          </Box>

          <Box bg="blackAlpha.600" p="4" css={{ borderRadius: '0 0 8px 8px' }}>
            <Heading
              children="100% Refund at cancellation"
              color={'white'}
              textTransform={'uppercase'}
              size="sm"
            />
            <Text
              children={'*Terms & Conditions Apply'}
              fontSize={'xs'}
              color={'white'}
            />
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Subscribe;
