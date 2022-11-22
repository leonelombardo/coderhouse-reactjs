import { Flex, Heading, Text } from "@chakra-ui/react"

import { Wrapper } from "../components/Wrapper"

export const Home = () => {
    return (
        <>  
            <Wrapper justifyContent="start">
                <Flex justifyContent="end" alignItems="end" width="100vw" backgroundImage="url(/banner/luanoliveira.jpg)" backgroundPosition="center top" backgroundRepeat="no-repeat" backgroundAttachment="fixed" backgroundSize="cover" minHeight={500} padding={8} marginTop="-80px">
                    <Flex flexDirection="column" gap={4} textAlign="right" height="100%" width="100%" justifyContent="end"  alignItems="end">
                        <Heading as="h1" fontSize={{base: 32, lg: 48}} color="secondary.500" width="fit-content" borderBottom="1px solid" borderColor="secondary.500" paddingBottom={2}>CHALLENGE YOURSELF</Heading>
                        <Text as="span" fontSize={{base: 16, lg: 24}} color="secondary.500">START TODAY AND HUSTLE EVERYDAY</Text>
                    </Flex>
                </Flex>
            </Wrapper>
        </>
    )
}