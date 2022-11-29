import { Flex } from "@chakra-ui/react"

export const OrderCard = ({name, phone, email, products}) => {
    return (
        <>
            <Flex flexDirection="column" gap={4}>
                <h1>Name: {name}</h1>
                <h1>Phone: {phone}</h1>
                <h1>Email: {email}</h1>
            </Flex>
        </>
    )
}