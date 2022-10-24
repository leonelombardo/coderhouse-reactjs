import { Container, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const ItemListContainer = ({greeting}) => {
    const wordVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
        },
        exit: {
            scale: 0
        }
    }

    return (
        <Container as={motion.div} display="flex" alignItems="center">
            <Text as={motion.p} fontSize={{base: 48, md: 96}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>{greeting}</Text>
        </Container>
    )
}