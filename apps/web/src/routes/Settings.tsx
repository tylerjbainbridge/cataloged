import React, { useEffect } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Button,
  Stack,
  Heading,
  Divider,
  Flex,
  useToast,
  Text,
} from '@chakra-ui/core';
import qs from 'query-string';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { usePrevious } from 'cataloged-shared/hooks/usePrevious';
import { useRemoveFromQueryString } from 'cataloged-shared/hooks/useGoTo';
import { useAuth } from 'cataloged-shared/hooks/useAuth';
import { useMedia } from 'react-use';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import { downloadFile } from 'cataloged-shared/util/helpers';

export interface ItemDrawerProps {
  toggleFullScreen: () => any;
  isFullScreen: boolean;
  onClose: () => any;
}

export const GET_GOOGLE_URLS = gql`
  query getGoogleContactsURL(
    $scopes: [String!]
    $googleAccountId: String
    $syncContent: String
  ) {
    googleContactsURL: googleURL(
      origin: "/settings"
      isAuthMethod: false
      scopes: $scopes
      googleAccountId: $googleAccountId
      syncContent: $syncContent
    )
  }
`;

export const SYNC_GOOGLE_CONTACTS = gql`
  mutation syncGoogleContacts($googleAccountId: String!) {
    syncGoogleContacts(googleAccountId: $googleAccountId)
  }
`;

export const ConnectButton = ({
  scopes,
  googleAccountId,
  syncContent,
}: any) => {
  const location = useLocation();

  const [removeFromQueryString] = useRemoveFromQueryString();

  const toast = useToast();

  const getUrl = useQuery(GET_GOOGLE_URLS, {
    variables: {
      scopes,
      syncContent,
      googleAccountId,
    },
  });

  const [syncGoogleContacts, mutationState] = useMutation(
    SYNC_GOOGLE_CONTACTS,
    {
      variables: {
        googleAccountId,
      },
      onCompleted: data => {
        console.log('done syncing');

        removeFromQueryString(['syncContent', 'googleAccountId']);

        toast({
          title: `Sync complete (${data.syncGoogleContacts})`,
          status: 'success',
          duration: 2000,
          position: 'bottom-left',
        });
      },
    },
  );

  useEffect(() => {
    const parsed = qs.parse(location.search);

    if (
      parsed?.syncContent === 'contacts' &&
      parsed?.googleAccountId === googleAccountId
    ) {
      // syncGoogleContacts();
    }
  }, []);

  return (
    <Button
      cursor="pointer"
      variant="outline"
      bg="brand.pink.light"
      color="brand.pink.main"
      _hover={{ bg: '#e8e4ed', borderColor: 'brand.pink.main' }}
      border="2px solid"
      borderColor="brand.pink.main"
      size="md"
      maxWidth="50%"
      isLoading={getUrl.loading || mutationState.loading}
      isDisabled={!getUrl.data?.googleContactsURL}
      onClick={() => {
        window.location.replace(getUrl.data?.googleContactsURL);
      }}
    >
      Add Google Contacts
    </Button>
  );
};

export const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  const isMobile = useMedia('(max-width: 768px)');

  const { user, signOut } = useAuth();

  const match = useRouteMatch('/settings');

  const { isOpen, onOpen, onClose } = useDisclosure(!!match);

  const previousIsOpen = usePrevious(isOpen);

  useEffect(() => {
    onOpen();
  }, []);

  useEffect(() => {
    if (!isOpen && previousIsOpen) {
      setTimeout(() => {
        history.push({
          pathname: location.pathname.replace('/settings', '') || '/',
          search: location.search,
        });
      }, 500);
    }
  }, [isOpen]);

  return (
    <Drawer
      placement="right"
      size="full"
      closeOnOverlayClick
      closeOnEsc
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent width={isMobile ? '100%' : '500px'}>
        <DrawerCloseButton bg="white" />

        <DrawerHeader
          borderBottomWidth="1px"
          display="flex"
          alignItems="center"
        >
          Your account
        </DrawerHeader>

        <DrawerBody d="flex" p="15px">
          <Flex
            height="100%"
            width="100%"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Stack spacing="15px">
              <Heading size="sm">Google Accounts</Heading>
              <Divider />
              {user.googleAccounts.map((googleAccount: any) => (
                <Stack>
                  <Text>{googleAccount.email}</Text>
                  <ConnectButton
                    key={googleAccount.id}
                    syncContent="contacts"
                    scopes={[
                      'https://www.googleapis.com/auth/contacts.readonly',
                    ]}
                    googleAccountId={googleAccount.id}
                  />
                </Stack>
              ))}
              <Divider />
              <Heading size="sm">Downloads</Heading>
              <Button
                as="a"
                d="flex"
                alignItems="center"
                cursor="pointer"
                p="3px"
                m={0}
                maxWidth="50%"
                onClick={() => {
                  // @ts-ignore
                  downloadFile(
                    'https://collections-file-storage-1.s3.amazonaws.com/desktop/Cataloged-1.0.0.dmg',
                  );
                }}
              >
                Desktop app
              </Button>
            </Stack>

            <Stack spacing="20px">
              <Button
                d="flex"
                alignItems="center"
                cursor="pointer"
                p="3px"
                m={0}
                maxWidth="50%"
                onClick={() => {
                  window.localStorage.removeItem('cataloged-cache');
                  signOut();
                  window.location.reload();
                }}
              >
                Sign out
              </Button>
            </Stack>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
