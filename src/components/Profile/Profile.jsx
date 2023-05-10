import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Register';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import { cancelSubscription } from '../../redux/actions/subscription';

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylisthandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    if (subscriptionError) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionMessage) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [dispatch, subscriptionMessage, subscriptionError, error, message]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Container minH="95vh" maxW="container.lg" py="8">
        <Heading children="Profile" m="8" textTransform={'uppercase'} />

        <Stack
          justifyContent={'flex-start'}
          direction={['column', 'row']}
          alignItems={'center'}
          spacing={['8', '16']}
          p="8"
        >
          <VStack>
            <Avatar src={user.avatar.url} boxSize={'48'} />

            <Button
              onClick={onOpen}
              isLoading={loading}
              colorScheme="yellow"
              variant={'ghost'}
            >
              Change Profile Photo
            </Button>
          </VStack>

          <VStack alignItems={['center', 'flex-start']} spacing="4">
            <HStack>
              <Text children="Name" fontWeight={'bold'} />
              <Text children={user.name} />
            </HStack>

            <HStack>
              <Text children="Email" fontWeight={'bold'} />
              <Text children={user.email} />
            </HStack>

            <HStack>
              <Text children="Created At" fontWeight={'bold'} />
              <Text children={user.createdAt.split('T')[0]} />
            </HStack>

            {user.role !== 'admin' && (
              <HStack>
                <Text children="Subscription" fontWeight={'bold'} />
                {user.subscription && user.subscription.status === 'active' ? (
                  <Button
                    onClick={cancelSubscriptionHandler}
                    color="yellow.500"
                    variant="unstyled"
                    isLoading={subscriptionLoading}
                  >
                    Cancel Subscription
                  </Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme="yellow">Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}

            <Stack direction={['column', 'row']} alignItems={'center'}>
              <Link to="/updateprofile">
                <Button>Update Profile</Button>
              </Link>

              <Link to="/changepassword">
                <Button>Change Password</Button>
              </Link>
            </Stack>
          </VStack>
        </Stack>

        <Heading children="Playlist" size="md" my="8" />

        {user.playlist.length > 0 && (
          <Stack
            direction={['column', 'row']}
            alignItems={'center'}
            flexWrap={'wrap'}
            p="4"
          >
            {user.playlist.map(element => (
              <VStack key={element.course} w="48" m="2">
                <Image
                  src={element.poster}
                  boxSize={'full'}
                  objectFit={'contain'}
                />

                <HStack>
                  <Link to={`/courses/course/${element.course}`}>
                    <Button variant={'ghost'} colorScheme="yellow">
                      Watch Now
                    </Button>
                  </Link>

                  <Button
                    onClick={() => removeFromPlaylisthandler(element.course)}
                    isLoading={loading}
                  >
                    <RiDeleteBin7Fill />
                  </Button>
                </HStack>
              </VStack>
            ))}
          </Stack>
        )}

        <ChangePhotoBox
          changeImageSubmitHandler={changeImageSubmitHandler}
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
        />
      </Container>
    </>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const CloseHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={CloseHandler}>
      <ModalOverlay backdropFilter={'blur(10px'} />

      <ModalContent>
        <ModalHeader> Choose Photo </ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing="8">
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  onChange={changeImage}
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme="yellow"
                  type="submit"
                >
                  {' '}
                  Change{' '}
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button onClick={CloseHandler} mr="3">
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
