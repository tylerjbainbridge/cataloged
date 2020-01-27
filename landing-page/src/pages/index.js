import React from "react"
import { useForm } from "react-hook-form"

import {
  Box,
  Input,
  InputGroup,
  Icon,
  InputLeftElement,
  Button,
  FormControl,
  Text,
} from "@chakra-ui/core"
import { useMutation } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

import "../typography.css"

import Layout, { client, customTheme } from "../components/layout"

const JOIN_WAITLIST = gql`
  mutation addToWaitlist($email: String!) {
    addToWaitlist(email: $email) {
      email
    }
  }
`

const IndexPage = () => {
  const { register, handleSubmit, watch, reset, errors } = useForm()

  const [addToWaitlist, { data, loading }] = useMutation(JOIN_WAITLIST, {
    client,
  })

  console.log(data)

  return (
    <Layout>
      <Box
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100%"
        // backgroundColor="brand.purple"
      >
        <Box position="relative" top="-100px" width="700px">
          <Box d="flex" justifyContent="center">
            <Box
              fontSize="120px"
              fontFamily="Cooper BT"
              color="brand.purple"
              textDecoration={`underline solid ${customTheme.colors.brand.yellow}`}
              textDecorationColor="brand.pink"
              padding="30px"
              fontSize={["60px", "120px"]}
              padding={["15px", "20px"]}
            >
              Cataloged
              {/* {"Cataloged".split("").map((letter, idx) => (
                <Box
                  as="span"
                  color={
                    ["brand.purple", "brand.pink", "brand.yellow"][idx % 3]
                  }
                >
                  {letter}
                </Box>
              ))} */}
            </Box>
          </Box>
          <Box d="flex" justifyContent="center">
            <Box
              fontSize={["20px", "30px"]}
              fontFamily="Cooper BT"
              color="gray.400"
            >
              Organize what's important to you
            </Box>
          </Box>
          <Box d="flex" justifyContent="center">
            <Box mt="50px">
              {data && data?.addToWaitlist?.email ? (
                <Text
                  // fontFamily="Cooper BT"
                  rounded="lg"
                  // border="5px solid"
                  // borderColor="brand.pink"
                  p="15px"
                  textAlign="center"
                  color="brand.purple"
                  fontSize="2xl"
                >
                  <Text fontFamily="Cooper BT" fontWeight="bold" pb={0}>
                    Thank you for your interest!
                  </Text>
                  ---
                  <br />
                  <strong>{data?.addToWaitlist?.email}</strong> was added to the
                  waitlist.
                </Text>
              ) : (
                <form
                  onSubmit={handleSubmit(data => {
                    if (data.email) addToWaitlist({ variables: data })
                  })}
                >
                  <Box d="flex" flexWrap="wrap" justifyContent="center">
                    <FormControl isInvalid={errors.email}>
                      <InputGroup>
                        <InputLeftElement
                          children={<Icon name="email" color="gray.300" />}
                        />
                        <Input
                          name="email"
                          type="email"
                          required
                          placeholder="Enter email"
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
                      mt={["20px", "0px"]}
                      _hover={{ bg: "rgb(237, 108, 127, .5)" }}
                    >
                      Join waitlist
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default IndexPage