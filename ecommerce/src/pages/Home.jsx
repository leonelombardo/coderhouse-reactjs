import { Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { Navbar } from "../components/Navbar"
import { Wrapper } from '../components/Wrapper'
import { ItemListContainer } from '../containers/ItemListContainer'

export const Home = () => {
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
        <Wrapper as={motion.div} {...pageVariants}>
            <ItemListContainer greeting="Welcome"/>
        </Wrapper>
    )
}