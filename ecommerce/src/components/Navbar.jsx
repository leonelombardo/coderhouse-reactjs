import { useState } from 'react'
import { Container, Box, Flex, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { CgMenuRightAlt, CgClose } from 'react-icons/cg'
import { CartWidget } from './CartWidget'

export const Navbar = () => {
    const [isNavToggled, setIsNavToggled] = useState(false)

    const togglerVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1
        },
        exit: {
            scale: 0
        }
    }

    const hideNavbar = () => {
        setIsNavToggled(false)
    }

    return (
        <Container as={motion.div} maxWidth="100vw" display="flex" justifyContent="center" alignItems="center" backgroundColor="secondary.500" boxShadow="0px 0px 20px #00000010" margin={0} padding={0} overflow="hidden" zIndex={999} position="fixed" top={0} left={{base: isNavToggled ? 0 : "300%", md: 0}} transition="left .3s">
            <Container as="nav" display="flex" flexDirection={{base: "column", md: "row"}} alignItems="center" justifyContent={{base: "center", md: "space-between"}} width="100%" minHeight={{base: "100vh", md: "auto"}} height={{base: "100%", md: "auto"}} paddingY={4} paddingX={8} gap={{base: 24 , md: 8}}>
                <Link to="/" onClick={hideNavbar}>
                    <Text fontSize={{base: 64, md: 48}} fontWeight={900}>FL!P.</Text>
                </Link>
                <Flex as="ul" flexDirection={{base: "column", md: "row"}} alignItems="center" gap={8}>
                    <Flex as={motion.li} whileHover={{scale: 1.1}} alignItems="center" gap={2} fontSize={{base: 32, md: 20}}>
                        <Link to="/" onClick={hideNavbar}>
                            <Text fontWeight={700}>Home</Text>
                        </Link>
                    </Flex>
                    <Flex as={motion.li} whileHover={{scale: 1.1}} alignItems="center" gap={2} fontSize={{base: 32, md: 20}}>
                        <Link to="/category/skateboards" onClick={hideNavbar}>
                            <Text fontWeight={700}>Skateboards</Text>
                        </Link>
                    </Flex>
                    <Flex as={motion.li} whileHover={{scale: 1.1}} alignItems="center" gap={2} fontSize={{base: 32, md: 20}}>
                        <Link to="/category/clothing" onClick={hideNavbar}>
                            <Text fontWeight={700}>Clothing</Text>
                        </Link>
                    </Flex>
                    <Link to="/checkout" onClick={hideNavbar}>
                        <Flex as={motion.li} whileHover={{scale: 1.1}} alignItems="center" gap={2}>
                            <CartWidget/>
                        </Flex>
                    </Link>
                </Flex>
            </Container>
            <Box as={motion.button} {...togglerVariants} whileTap={{scale: 0.5}} position="fixed" right={5} top={5} fontSize={32} display={{base: "flex", md: "none"}}>
                {
                    isNavToggled
                        ? <CgClose onClick={() => setIsNavToggled(false)}/>
                        : <CgMenuRightAlt onClick={() => setIsNavToggled(true)}/>
                }
            </Box>
        </Container>
    )
}