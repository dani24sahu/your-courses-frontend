import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <>
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />

        <Heading
          textAlign={['center', 'left']}
          maxW={'200px'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          children={title}
          size={'sm'}
        />

        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            children={'Creator'}
          />
          <Text
            fontFamily={'bold'}
            textTransform={'uppercase'}
            children={creator}
          />
        </HStack>

        <Heading
          textAlign={'center'}
          size={'xs'}
          children={`Lectures - ${lectureCount}`}
          textTransform={'uppercase'}
        />
        <Heading
          textAlign={'center'}
          size={'xs'}
          children={`Views - ${views}`}
          textTransform={'uppercase'}
        />

        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to={`course/${id}`}>
            <Button colorScheme="yellow">Watch Now</Button>
          </Link>

          <Button
          isLoading={loading}
            variant={'ghost'}
            colorScheme="yellow"
            onClick={() => addToPlaylistHandler(id)}
          >
            Add To Playlist
          </Button>
        </Stack>
      </VStack>
    </>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async courseId => {
    console.log('Added to Playlist', courseId);
     await dispatch(addToPlaylist(courseId))
     dispatch(loadUser())
  };

  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures & Algorithm',
    'Android Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error, message } = useSelector(state => state.course);

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
  }, [category, keyword, error,message, dispatch]);

  return (
    <>
      <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
        <Heading children="All Courses" m={'8'} />
        <Input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="Search A Course..."
          type="text"
          focusBorderColor="yellow.500"
        />

        <HStack
          overflowX={'auto'}
          paddingY={'8'}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {categories.map((item, index) => (
            <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
              <Text children={item} />
            </Button>
          ))}
        </HStack>

        <Stack
          direction={['column', 'row']}
          flexWrap={'wrap'}
          justifyContent={['flex-start', 'space-evenly']}
          alignItems={['center', 'flex-start']}
        >
          {/* { courses &&
           courses.map(item => (
              <Course
                key={item}
                title={item.title}
                description={item.description}
                views={item.views}
                id={item._id}
                creator={item.createdBy}
                imageSrc={item.poster.url}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))} */}
            { courses.length>0 ?
           courses.map(item => (
              <Course
                key={item}
                title={item.title}
                description={item.description}
                views={item.views}
                id={item._id}
                creator={item.createdBy}
                imageSrc={item.poster.url}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            )):<Heading children="Course Not Found" mt={'4'} />}
        </Stack>
      </Container>
    </>
  );
};

export default Courses;
