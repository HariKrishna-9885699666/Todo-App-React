import React from "react";
import { FcBusinessman, FcCellPhone } from "react-icons/fc";
import {
  VscMention,
  VscGithubInverted,
  VscLink,
  VscPackage,
} from "react-icons/vsc";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Link,
} from "@chakra-ui/react";

function About(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        position="fixed"
        bottom="0"
        right="0"
        onClick={onOpen}
        cursor="pointer"
      >
        <FcBusinessman size={100} />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About App</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      About Me
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FcBusinessman} color="green.500" />
                      Hari Krishna Anem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FcCellPhone} color="green.500" />
                      9885699666
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscMention} color="green.500" />
                      anemharikrishna@gmail.com
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscGithubInverted} color="green.500" />
                      <Link
                        href="https://github.com/HariKrishna-9885699666"
                        isExternal
                      >
                        HariKrishna-9885699666
                      </Link>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscLink} color="green.500" />
                      <Link href="https://harikrishna.netlify.app/" isExternal>
                        Portfolio
                      </Link>
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscLink} color="green.500" />
                      <Link href="https://harikrishna.hashnode.dev/" isExternal>
                        Blog
                      </Link>
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Packages used in react
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={VscPackage} color="green.500" />
                      Chakra UI
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscPackage} color="green.500" />
                      Formik
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscPackage} color="green.500" />
                      Store.js
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscPackage} color="green.500" />
                      Moment
                    </ListItem>
                    <ListItem>
                      <ListIcon as={VscPackage} color="green.500" />
                      Yup
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default About;
