import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Button,
  FormControl,
  Text,
} from '@chakra-ui/core';
import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';

import { client, useMedia } from '../components/layout';

import '../typography.css';

const JOIN_WAITLIST = gql`
  mutation addToWaitlist($email: String!) {
    addToWaitlist(email: $email) {
      email
    }
  }
`;

export const JoinWaitlist = () => {
  let isMobile = useMedia('(max-width: 768px)');

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    errors,
  } = useForm({
    defaultValues: { email: '' },
  });

  watch();

  const values = getValues();

  const [addToWaitlist, { data, error, loading }] = useMutation(JOIN_WAITLIST, {
    client,
    optimisticResponse: {
      __typename: 'Mutation',
      addToWaitlist: {
        __typename: 'InterestedUser',
        email: values.email,
      },
    },
    onError: console.log,
  });

  return (
    <Box
      d="flex"
      flexWrap="wrap"
      justifyContent="center"
      width={!isMobile ? undefined : '100%'}
    >
      {!data ? (
        <Box
          as="form"
          d="flex"
          flexWrap={isMobile ? 'wrap' : 'nowrap'}
          justifyContent="center"
          width={!isMobile ? undefined : '100%'}
          onSubmit={handleSubmit(data => {
            if (data.email) addToWaitlist({ variables: data });
          })}
        >
          <FormControl
            isInvalid={errors.email}
            width={!isMobile ? '300px' : '100%'}
          >
            <InputGroup>
              <InputLeftElement
                children={<Icon name="email" color="gray.300" />}
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="Enter your email..."
                // focusBorderColor="brand.purple.main"

                mr={!isMobile ? '10px' : undefined}
                ref={register}
                onChange={e => {
                  setValue('email', e.target.value);
                }}
                _focus={{
                  borderColor: 'brand.green',
                }}
              />
            </InputGroup>
          </FormControl>

          <Button
            // isLoading={loading}
            type="submit"
            size="md"
            mt={isMobile ? '10px' : '0px'}
            width={isMobile ? '100%' : undefined}
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
            Join waitlist
          </Button>
        </Box>
      ) : (
        <Text color="brand.pink.main" fontWeight="600" fontSize="18px">
          Thanks! We'll contact you soon.
        </Text>
      )}
    </Box>
  );
};
