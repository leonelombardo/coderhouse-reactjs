import { Container } from "@chakra-ui/react"
import { motion } from 'framer-motion'

export const Wrapper = ({children, ...props}) => {
    const pageVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        }
    }

    return (
        <Container as={motion.div} {...pageVariants} {...props} display="flex" flexDirection="column" alignItems="center" gap={16} maxWidth={1200} width="100%" minHeight="100vh" height="100%" backgroundColor="secondary.500" zIndex={1} paddingTop="160px" paddingBottom="48px" margin="0 auto">
            {children}
        </Container>
    )
}