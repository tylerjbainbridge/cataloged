import React, { useRef } from 'react';

import { Flex, Box, Image, Heading, Button, Link, Text } from '@chakra-ui/core';
import { useMedia } from 'react-use';

import Layout, { client, theme } from '../components/layout';
import favicon from '../images/favicon.png';
import screenshot from '../images/image-with-command-center.jpg';

import pink from '../images/pink.png';
import purple from '../images/purple.png';
import yellow from '../images/yellow.png';

import '../typography.css';
import { JoinWaitlist } from '../components/JoinWaitlist';

const IndexPage = () => {
  let isMobile = useMedia('(max-width: 768px)');

  const logo = <Image src={favicon} size="150px" />;

  const contentWidth = isMobile ? '100%' : '1200px';

  const screenshotRef = useRef(null);

  const screenShotWidth = screenshotRef?.offsetWidth;
  const screenShotHeight = screenshotRef?.offsetHeight;

  useEffect(() => {
    isMobile = window.matchMedia('(max-width: 768px)');
  }, []);

  return (
    <Layout>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        width="100vw"
        height="100vh"
      >
        <Flex justifyContent="center" padding={isMobile ? '20px' : undefined}>
          <Flex width={contentWidth}>
            <Flex
              mt="40px"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Flex alignItems="center">
                <Image src={favicon} size="40px" mr="10px" />
                <Heading
                  fontWeight="semibold"
                  // letterSpacing="1.5px"
                  fontSize="35px"
                  fontFamily="Cooper BT"
                  color="brand.purple.main"
                  textDecoration={`underline solid ${theme.colors.brand.yellow.main}`}
                  textDecorationColor="brand.pink"
                >
                  Cataloged
                </Heading>
              </Flex>
              <Flex alignItems="center">
                {!isMobile && (
                  <Flex mr="20px">
                    <Link
                      href="mailto:cataloged@tylerbainbridge.com"
                      color="brand.pink.main"
                      fontWeight="500"
                    >
                      Contact
                    </Link>
                  </Flex>
                )}
                <Button
                  as={Link}
                  href="https://app.cataloged.co/"
                  target="_blank"
                  cursor="pointer"
                  variant="outline"
                  color="brand.pink.main"
                  bg="brand.pink.light"
                  _hover={{
                    bg: 'brand.pink.dark',
                    borderColor: 'brand.pink.main',
                  }}
                  size="md"
                  border="2px solid"
                  borderColor="brand.pink.main"
                >
                  Log in
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="center" padding={isMobile ? '20px' : undefined}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            {...(isMobile
              ? {
                  mb: '20px',
                  objectFit: isMobile ? 'cover' : undefined,
                }
              : {})}
          >
            <Box
              width={isMobile ? '100%' : '450px'}
              mr={isMobile ? undefined : '40px'}
              mb={isMobile ? '20px' : '40px'}
              p="35px"
              bg="brand.purple.light"
              rounded="lg"
            >
              <Heading
                fontFamily="Cooper BT"
                color="brand.purple.main"
                fontSize={isMobile ? '35px' : '50px'}
              >
                {/* Your personal knowledge base */}
                {/* Your second brain */}
                {/* Catalog what's important to you */}
                Organize what's important to you.
              </Heading>
            </Box>
            <Flex width={isMobile ? '100%' : '500px'} flexDirection="column">
              {!isMobile && (
                <Box width="100%">
                  <Text
                    color="brand.pink.main"
                    fontWeight="600"
                    fontSize="25px"
                  >
                    {/* Just think- you can finally organize all your links, notes,
                  files, contacts, and more. */}
                    Wouldn't it be nice to finally organize all your links,
                    notes, files, and contacts?
                  </Text>
                </Box>
              )}
              <Flex justifyContent="flex-start" width="100%" mt="25px">
                <JoinWaitlist />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="center" height="40%">
          <Box position="relative" width={screenShotWidth} height="100%">
            {!isMobile && (
              <>
                <Image
                  zIndex="-2"
                  // zIndex="50"
                  position="absolute"
                  src={pink}
                  size="200px"
                  bottom="0"
                  left="0"
                  transform="rotate(80deg)"
                  ml="-125px"
                />
                <Image
                  zIndex="-2"
                  // zIndex="50"
                  position="absolute"
                  src={purple}
                  size="250px"
                  bottom="0px"
                  right="0"
                  transform="rotate(80deg)"
                  mr="-140px"
                  mb="80px"
                />
                <Image
                  zIndex="-2"
                  // zIndex="50"
                  position="absolute"
                  src={yellow}
                  size="400px"
                  top="0"
                  transform="rotate(140deg)"
                  ml="300px"
                  mt="-200px"
                />
              </>
            )}
            <Image
              ref={ref => {
                screenshotRef.current = ref;
              }}
              height="100%"
              zIndex="20"
              objectFit="cover"
              objectPosition="top"
              src={screenshot}
              width={contentWidth}
              rounded="lg"
            />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default IndexPage;
