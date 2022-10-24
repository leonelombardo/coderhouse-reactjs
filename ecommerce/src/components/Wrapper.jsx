import { Container } from "@chakra-ui/react"

export const Wrapper = ({children}) => {
    return (
        <Container maxWidth="100vw" width="100%" minHeight="100vH" height="100%" backgroundColor="secondary.500" zIndex={1} paddingTop="80px">
            {children}
        </Container>
    )
}