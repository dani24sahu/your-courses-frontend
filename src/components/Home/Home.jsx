import React from "react";
import { Link } from 'react-router-dom'
import { Button, Image, Stack, VStack, Heading, Text, Box, HStack } from "@chakra-ui/react"
import './home.css';
import vg from "../../assets/images/vg.png"
import vdo from '../../assets/videos/vdo.mp4'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'

const Home = () => {
    return <section className="" home>
        <div className="container">
            <Stack
                direction={["column", "row"]}
                height="100%"
                justifyContent={["center", "space-between"]}
                alignItems='center'
                spacing={['16', '56']}>

                <VStack width={"full"} alignItems={['center', 'flex-end']} spacing={'8'}>
                    <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
                    <Text textAlign={['center', 'left']} fontFamily={'cursive'} children="Find Valuable Content At Reasonable Price" />
                    <Link to="/courses">
                        <Button size={'lg'} colorScheme="yellow">
                            Explore Now
                        </Button>
                    </Link>
                </VStack>

                <Image className='vector-graphics' boxSize={"md"} src={vg} objectFit="contain" />

            </Stack>
        </div>

        <Box padding='8' bg='blackAlpha.800'>
            <Heading children="OUR BRANDS" textAlign={'center'} fontFamily="body" color={'yellow.400'} />
            <HStack className='bandBanner' justifyContent={'space-evenly'} marginTop="4">
                <CgGoogle />
                <CgYoutube />
                <SiCoursera />
                <SiUdemy />
                <DiAws />
            </HStack>
        </Box>

        <div className='container2'>
            <video
                autoPlay={false}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={vdo}>

            </video>

        </div>

    </section>
}

export default Home;