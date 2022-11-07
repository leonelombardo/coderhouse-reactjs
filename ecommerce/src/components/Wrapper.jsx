import { Container } from "@chakra-ui/react"
import { motion } from 'framer-motion'

export const Wrapper = ({children}) => {
    const pageVariants = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        },
        exit: {
            scale: 0
        }
    }

    return (
        <Container as={motion.div} display="flex" flexDirection="column" alignItems="center" gap={16} maxWidth="100vw" width="100%" minHeight="100vH" height="100%" backgroundColor="secondary.500" zIndex={1} paddingTop="80px">
            {children}
        </Container>
    )
}