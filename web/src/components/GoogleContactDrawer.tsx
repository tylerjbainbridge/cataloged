import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  DrawerContent,
  Flex,
  MenuItem,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/core';
import { Labels } from './Labels';
import { LazyImage } from './LazyImage';
import { ItemDrawerProps } from '../routes/FeedDrawerItemView';
import { ItemActionMenu } from './ItemActionMenu';
import {
  ItemFull_googleContact,
  ItemFull,
} from '../graphql/__generated__/ItemFull';
import { ItemDrawerMeta } from './ItemDrawerMeta';
import { ItemStatusInput } from './ItemStatusInput';
import { useMedia } from 'react-use';

export interface ItemWithGoogleContact extends ItemFull {
  googleContact: ItemFull_googleContact;
}

export interface GoogleContactDrawerProps extends ItemDrawerProps {
  item: ItemWithGoogleContact;
}

export interface UpdateGoogleContactFormValues {
  href: string | null;
  title: string | null;
  description: string | null;
}

export const GoogleContactDrawer = ({
  item,
  onClose,
  drawerContentProps,
}: GoogleContactDrawerProps) => {
  const isMobile = useMedia('(max-width: 768px)');

  const { googleContact } = item;

  // const [updateGoogleContact, { loading: isUpdating }] = useMutation(
  //   UPDATE_LINK_MUTATION,
  //   {
  //     variables: { googleContactId: googleContact.id, ...values },
  //   },
  // );

  return (
    <>
      <DrawerContent
        width={isMobile ? '100%' : '500px'}
        {...drawerContentProps}
      >
        <Flex
          width="100%"
          float="right"
          height="100%"
          bg="white"
          position="fixed"
          right="0"
          p="20px"
          borderLeft="1px solid lightgray"
          justifyContent="space-between"
          flexDirection="column"
          overflowY="scroll"
        >
          <Box>
            <Stack spacing="20px">
              <Flex width="100%" justifyContent="flex-end">
                <ItemActionMenu item={item}>
                  {menuNodes => (
                    <>
                      <MenuItem d="flex" alignItems="center" onClick={onClose}>
                        <Icon name="close" fontSize="12px" mr="5px" /> Close
                      </MenuItem>
                      {Object.values(menuNodes)}
                    </>
                  )}
                </ItemActionMenu>
              </Flex>
              <Stack spacing={5}>
                <Stack spacing={5} isInline alignItems="center">
                  {googleContact.photoUrl && (
                    <LazyImage
                      rounded="lg"
                      src={googleContact.photoUrl}
                      width="100px"
                      height="100px"
                      objectFit="cover"
                    />
                  )}
                  <Stack spacing="5px">
                    {googleContact.name && (
                      <Box>
                        <StatLabel>Name</StatLabel>
                        <StatNumber>{googleContact.name}</StatNumber>
                      </Box>
                    )}
                    {(googleContact.companyName ||
                      googleContact.companyTitle) && (
                      <Box>
                        <StatLabel>Work</StatLabel>
                        <StatNumber>
                          {[
                            item.googleContact.companyTitle,
                            item.googleContact.companyName,
                          ]
                            .filter(Boolean)
                            .join(' at ')}
                        </StatNumber>
                      </Box>
                    )}
                    {googleContact.email && (
                      <Stat>
                        <StatLabel>Email</StatLabel>
                        <StatNumber
                          as="a"
                          //@ts-ignore
                          href={`mailto:${googleContact.email}`}
                        >
                          {googleContact.email}
                        </StatNumber>
                      </Stat>
                    )}
                    {googleContact.phoneNumber && (
                      <Stat>
                        <StatLabel>Phone</StatLabel>
                        <StatNumber
                          as="a"
                          //@ts-ignore
                          href={`tel:${googleContact.phoneNumber}`}
                        >
                          {googleContact.phoneNumber}
                        </StatNumber>
                      </Stat>
                    )}
                  </Stack>
                </Stack>
                <FormControl>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <ItemStatusInput item={item} size="md" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="labels">Labels</FormLabel>
                  <Labels item={item} numDisplayLabels={10} />
                </FormControl>
              </Stack>
            </Stack>
          </Box>
          <ItemDrawerMeta item={item} />
        </Flex>
      </DrawerContent>
    </>
  );
};
