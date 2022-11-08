import { Flex, Heading } from "@chakra-ui/react"

import { Wrapper } from "../components/Wrapper"

export const Error404 = () => {
    return (
        <>
            <Wrapper>
                <Flex flexDirection="column" alignItems="center" gap={2}>
                    <Heading fontSize={96}>404</Heading>
                    <Heading fontSize={32}>Something went wrong</Heading>
                </Flex>
            </Wrapper>
        </>
    )
}