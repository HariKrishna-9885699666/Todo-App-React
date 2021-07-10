import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure
  } from "@chakra-ui/react";
  
  function Header(props) {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="blue.500"
        color="white"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"tighter"}>
            To Do React App
          </Heading>
        </Flex>
      </Flex>
    );
  }
  
  export default Header;
  