import React from 'react'
import { Button, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react"
import { FcPlus } from "react-icons/fc";


function Todo() {
    return (
        <Stack spacing={3} padding={30}>
            <InputGroup size="md">
            <Input variant="flushed" placeholder="enter task" />
            <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" leftIcon={<FcPlus />} colorScheme="blue" variant="solid">
                {"Add"}
                </Button>
            </InputRightElement>
            </InputGroup>
        </Stack>
    )
}

export default Todo;
