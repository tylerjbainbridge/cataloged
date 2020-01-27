import React from 'react';
import {
  Box,
  Button,
  InputLeftElement,
  Icon,
  Input,
  InputGroup,
  FormControl,
  useToast,
} from '@chakra-ui/core';
import { useMutation } from 'react-apollo';
import { useForm } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { SignOut } from './SignOut';

const ENTER_INVITE_CODE = gql`
  mutation enterInviteCode($code: String!) {
    enterInviteCode(code: $code) {
      id

      inviteCode {
        id
        code
      }
    }
  }
`;

export const EnterInviteCode = () => {
  const { register, handleSubmit, errors } = useForm();

  const toast = useToast();

  const [enterInviteCode, { loading }] = useMutation(ENTER_INVITE_CODE, {
    onError: () => {
      toast({
        title: 'Invalid code',
        status: 'error',
        duration: 2000,
        position: 'top',
      });
    },
  });

  return (
    <Box
      width="100%"
      height="80vh"
      d="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="fixed" right="0" top="0" p="20px">
        <SignOut />
      </Box>
      <form
        onSubmit={handleSubmit(data => {
          if (data.code) enterInviteCode({ variables: data });
        })}
      >
        <Box d="flex" flexWrap="wrap" justifyContent="center">
          <FormControl isInvalid={!!errors.email}>
            <InputGroup>
              <InputLeftElement
                children={<Icon name="view" color="gray.300" />}
              />
              <Input
                name="code"
                // @ts-ignore
                required
                placeholder="Enter code"
                // focusBorderColor="brand.purple"
                width="300px"
                mr="10px"
                ref={register}
              />
            </InputGroup>
          </FormControl>

          <Button
            isLoading={loading}
            type="submit"
            bg="brand.pink"
            color="white"
            size="md"
            mt={['20px', '0px']}
            _hover={{ bg: 'rgb(237, 108, 127, .5)' }}
          >
            Go
          </Button>
        </Box>
      </form>
    </Box>
  );
};
