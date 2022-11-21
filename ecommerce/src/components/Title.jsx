import { Heading } from "@chakra-ui/react"

export const Title = ({children}) => {
    return (
        <Heading as="h1" fontSize={{base: 32, md: 64}} fontWeight={1000}>{children}</Heading>
    )
}