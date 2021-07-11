import React, { useReducer, useState } from "react";
import {
  Button,
  InputGroup,
  InputRightElement,
  Stack,
  Wrap,
  LinkBox,
  Heading,
  Spacer,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure,
  Checkbox,
  List,
  ListItem,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import { FcPlus } from "react-icons/fc";
import moment from "moment";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputControl } from "formik-chakra-ui";
import { timeAgo } from "../utils/handlers";
var store = require("store");

function Todo() {
  // eslint-disable-next-line no-unused-vars
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const colors = [
    "red",
    "green",
    "cyan",
    "orange",
    "yellow",
    "purple",
    "blue",
    "teal",
    "gray",
    "pink",
  ];
  let cl = 0;
  const getColor = () => {
    if (colors[cl]) {
      let rclr = colors[cl];
      cl++;
      return rclr;
    } else {
      cl = 0;
      return getColor();
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [taskTitle, setTaskTitle] = useState(null);
  const [taskItem, setTaskItem] = useState("");
  const [taskItemArr, setTaskItemArr] = useState([]);
  const [taskId, setTaskId] = useState(null);
  return (
    <>
      <Formik
        initialValues={{
          task: "",
          taskList: [],
        }}
        validationSchema={Yup.object({
          task: Yup.string().required(),
        })}
        onSubmit={(values, formikBag) => {
          formikBag.setFieldValue("task", "");
          formikBag.setFieldTouched("task", false);

          const storeTasksList = store.get("taskList") || [];
          const objToPush = {
            id: uuid(),
            title: values.task,
            time: moment().format("YYYY-MM-DD h:mm:ss a"),
            items: [],
          };
          storeTasksList.unshift(objToPush);
          store.set("taskList", storeTasksList);
        }}
      >
        {({ setFieldValue, setValues, handleSubmit: onSubmit }) => {
          return (
            <Stack spacing={3} padding={30}>
              <Form noValidate>
                <InputGroup size="md">
                  <InputControl name="task" placeholder="enter task" />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      mr="5px"
                      leftIcon={<FcPlus />}
                      colorScheme="blue"
                      variant="solid"
                      type="submit"
                    >
                      {"Add"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Form>

              <Wrap>
                {store.get("taskList") &&
                  store.get("taskList").map((item, index) => {
                    let clr = colors[index] || getColor();
                    return (
                      <LinkBox
                        key={item.id}
                        as="article"
                        width="190px"
                        height="150px"
                        p="2"
                        borderWidth="1px"
                        rounded="md"
                        bg={`${clr}.200`}
                        display="flex"
                        flexDirection="column"
                      >
                        <Heading size="md" my="2">
                          {item.title.length > 25
                            ? item.title.slice(0, 25) + "..."
                            : item.title}
                        </Heading>
                        <Flex
                          mb="3"
                          marginTop="auto"
                          justify="flex-end"
                          fontSize="12px"
                        >
                          {timeAgo(item.time)}
                        </Flex>
                        <Flex
                          color="brown.400"
                          justify="flex-end"
                          cursor="pointer"
                          marginTop="0"
                        >
                          <FaEdit
                            onClick={() => {
                              setTaskTitle(item.title);
                              setTaskId(item.id);
                              setTaskItemArr(item.items);
                              onOpen();
                              return false;
                            }}
                          />
                          <Spacer></Spacer>
                          <FaTrashAlt
                            onClick={() => {
                              const allTasks = store.get("taskList");
                              const foundIndex = allTasks.findIndex(
                                (obj) => obj.id === item.id
                              );
                              allTasks.splice(foundIndex, 1);
                              store.set("taskList", allTasks);
                              forceUpdate();
                              return false;
                            }}
                          />
                        </Flex>
                      </LinkBox>
                    );
                  })}
              </Wrap>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="task title"
                        value={taskTitle}
                        onChange={(e) => {
                          setTaskTitle(e.target.value);
                        }}
                      />
                    </FormControl>
                    <br />
                    <FormControl>
                      <Form noValidate>
                        <InputGroup size="md">
                          <Input
                            name="item"
                            placeholder="enter item"
                            onChange={(e) => {
                              setTaskItem(e.target.value);
                            }}
                            value={taskItem}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              mr="5px"
                              leftIcon={<FcPlus />}
                              colorScheme="blue"
                              variant="solid"
                              type="button"
                              onClick={() => {
                                const taskItemObj = {
                                  id: uuid(),
                                  item: taskItem,
                                  status: "open",
                                };
                                setTaskItemArr((prevItems) => [
                                  ...prevItems,
                                  taskItemObj,
                                ]);
                                const allTasks = store.get("taskList");
                                const foundIndex = allTasks.findIndex(
                                  (obj) => obj.id === taskId
                                );
                                allTasks[foundIndex].items = [
                                  ...taskItemArr,
                                  taskItemObj,
                                ];
                                store.set("taskList", allTasks);
                                setTaskItem("");
                              }}
                            >
                              {"Add"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <br />
                        <List spacing={3}>
                          {taskItemArr.map((item, index) => {
                            return (
                              <ListItem key={uuid()}>
                                <Checkbox
                                  colorScheme="red"
                                  defaultChecked={
                                    item.status === "completed" ? true : false
                                  }
                                  textDecoration={
                                    item.status === "completed"
                                      ? "line-through"
                                      : "none"
                                  }
                                  onChange={(e) => {
                                    const allTasks = store.get("taskList");
                                    const foundIndex = allTasks.findIndex(
                                      (obj) => obj.id === taskId
                                    );
                                    const foundIndexOfTaskItems = allTasks[
                                      foundIndex
                                    ].items.findIndex(
                                      (obj) => obj.id === item.id
                                    );
                                    allTasks[foundIndex].items[
                                      foundIndexOfTaskItems
                                    ].status = e.target.checked
                                      ? "completed"
                                      : "open";
                                    store.set("taskList", allTasks);
                                    setTaskItemArr(allTasks[foundIndex].items);
                                  }}
                                >
                                  {item.item}
                                </Checkbox>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Form>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        const allTasks = store.get("taskList");
                        const foundIndex = allTasks.findIndex(
                          (obj) => obj.id === taskId
                        );
                        allTasks[foundIndex].title = taskTitle;
                        allTasks[foundIndex].items = taskItemArr;
                        store.set("taskList", allTasks);
                        forceUpdate();
                        onClose();
                      }}
                    >
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          );
        }}
      </Formik>
    </>
  );
}

export default Todo;
