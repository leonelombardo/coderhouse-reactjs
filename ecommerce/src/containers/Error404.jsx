import { Flex, Heading } from "@chakra-ui/react"

export const Error404 = () => {
    return (
        <>
            <Flex flexDirection="column" alignItems="center" gap={2}>
                <Heading fontSize={96}>404</Heading>
                <Heading fontSize={32}>Something went wrong</Heading>
            </Flex>
        </>
    )
}