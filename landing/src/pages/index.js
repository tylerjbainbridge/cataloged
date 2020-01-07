import React from "react"
import Helmet from "react-helmet"

import favicon from "../images/favicon.png"

import styled, { createGlobalStyle } from "styled-components"

import "../typography.css"

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: white;
  }
`

export const HorizantalCenter = styled.div`
  display: flex;
  justify-content: center;
`

export const VerticalCenter = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

export const Main = styled.div`
  position: relative;
  top: -100px;
  width: 700px;
`

const Title = styled.div`
  font-size: 120px;
  font-family: "Cooper BT";
  color: black;
  padding: 30px;
  border: 10px solid #000;

  @media (max-width: 425px) {
    font-size: 60px;
    padding: 15px;

    border: 5px solid #000;
  }
`

const Desctription = styled.div`
  font-size: 30px;
  font-family: "Cooper BT";
  color: black;

  margin-top: 20px;

  @media (max-width: 425px) {
    font-size: 20px;
  }
`

const InputContainer = styled.div`
  margin-top: 50px;
`

const Button = styled.a`
  color: white;
  background-color: #ffcc5b;
  font-family: "Cooper BT";
  font-size: 25px;
  padding: 10px 30px;
  cursor: pointer;

  margin-top: 60px;

  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`

const Input = styled.input`
  border: none;
  border-bottom: 5px dotted #000;
  padding: 10px;
  font-size: 20px;
  width: 400px;
  outline: none;
  font-family: "Courier New";
  letter-spacing: 3px;
  font-weight: 600;
`

const IndexPage = () => (
  <>
    <Helmet
      title="Cataloged"
      link={[{ rel: "shortcut icon", type: "image/png", href: `${favicon}` }]}
    />
    <GlobalStyles />
    <Container>
      <Main>
        <HorizantalCenter>
          <Title>Cataloged</Title>
        </HorizantalCenter>
        <HorizantalCenter>
          <Desctription>Organize what's important to you</Desctription>
        </HorizantalCenter>
        <HorizantalCenter>
          {/* <InputContainer>
            <Input placeholder="Enter email" />
            <Button>Join waitlist</Button>
          </InputContainer> */}
          <Button href="https://app.cataloged.co/">Enter</Button>
        </HorizantalCenter>
      </Main>
    </Container>
  </>
)

export default IndexPage
