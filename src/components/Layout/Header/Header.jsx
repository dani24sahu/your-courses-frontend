import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

// const LinkButton = ({url="/" , title="Home" }) => {
//     <Link to={url}>
//         <Button variant={"ghost"}>{title}</Button>
//     </Link>
// }

const Header = ({ isAuthenticated=false, user }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch()

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        zIndex={'overlay'}
        colorScheme={'yellow'}
        widhth="12"
        height={'12'}
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(3px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">YourCourses</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              {/* <LinkButton url="/" title="Home" />
                        <LinkButton url="/courses" title="Beowse Courses" />
                        <LinkButton url="/request" title="Request A Course" />
                        <LinkButton url="/contact" title="Contact Us" /> */}
              <Link onClick={onClose} to="/">
                <Button variant={'ghost'} size={'md'}>
                  Home
                </Button>
              </Link>
              <Link onClick={onClose} to="/courses">
                <Button variant={'ghost'} size={'md'}>
                  Browse Courses
                </Button>
              </Link>
              <Link onClick={onClose} to="/request">
                <Button variant={'ghost'} size={'md'}>
                  Request A Course
                </Button>
              </Link>
              <Link onClick={onClose} to="/contact">
                <Button variant={'ghost'} size={'md'}>
                  Contact Us
                </Button>
              </Link>
              <Link onClick={onClose} to="/about">
                <Button variant={'ghost'} size={'md'}>
                  About Us
                </Button>
              </Link>

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to="/profile">
                          <Button
                            variant={'ghost'}
                            colorScheme="yellow"
                            size={'md'}
                          >
                            Profile
                          </Button>
                        </Link>
                        <Button onClick={logoutHandler} variant={'ghost'}>
                          <RiLogoutBoxLine />
                          LogOut
                        </Button>
                      </HStack>

                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme="purple" variant={'ghost'}>
                            <RiDashboardFill style={{ margin: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to={'/login'}>
                      <Button colorScheme="yellow">Login</Button>
                    </Link>

                    <p>Or</p>

                    <Link onClick={onClose} to={'/register'}>
                      <Button colorScheme="yellow">Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
