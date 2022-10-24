import { Container, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"

export const ItemListContainer = ({greeting}) => {

    const wordVariants = {
        initial: {
            y: -200,
            scale: 0,
        },
        animate: {
            y: 0,
            scale: 1,
            transition: {
                staggerChildren: 0.5
            }
        },
        exit: {
            y: -200,
            scale: 0
        }
    }
    
    // const letterVariants = {
    //     initial: {
    //         y: -200,
    //         scale: 0
    //     },
    //     animate: {
    //         y: 0,
    //         scale: 1
    //     },
    //     exit: {
    //         y: -200,
    //         scale: 0
    //     }
    // }

    return (
        <Container as={motion.div} display="flex" alignItems="center">
            <Text as={motion.p} fontSize={{base: 48, md: 96}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>
                {
                    greeting.split("").map(e => (<Text  as={motion.span} key={Math.random() * 10000}>{e === " " ? "\u00A0" : e}</Text>))
                }
            </Text>
        </Container>
    )
}