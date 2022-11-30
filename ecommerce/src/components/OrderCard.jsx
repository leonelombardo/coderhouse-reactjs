import { Link } from "react-router-dom"
import { useState } from "react"
import { Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { BiChevronDown, BiPhone, BiUser } from "react-icons/bi"
import { HiOutlineCalendar, HiOutlineMail, HiOutlineTicket } from "react-icons/hi"

import { formatPrice } from "../services/formatPrice"

export const OrderCard = ({name, email, phone, products, date, id}) => {
    const [showProducts, setShowProducts] = useState(false)

    const showProductsVariants = {
        initial: {
            height: 0
        },
        animate: {
            height: "auto"
        },
        exit: {
            height: 0
        }
    }

    const handleShowProducts = () => {
        setShowProducts(previous => !previous)
    }

    return (
        <>
            <Flex flexDirection="column" gap={8} padding={8} backgroundColor="#f9f9f9" borderRadius={12} minWidth={250} width="100%" position="relative">
                <Flex flexDirection="column" gap={4}>
                    <Flex gap={2} alignItems="center">
                        <Icon as={BiUser}/>
                        <Text as="h2" fontSize={14}>{name.charAt(0).toUpperCase().concat(name.slice(1).toLowerCase())}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                        <Icon as={HiOutlineMail}/>
                        <Text as="h4" fontSize={14}>{email.toLowerCase()}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                        <Icon as={BiPhone}/>
                        <Text as="h4" fontSize={14}>{phone}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                        <Icon as={HiOutlineCalendar}/>
                        <Text as="h4" fontSize={14}>{date}</Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                        <Icon as={HiOutlineTicket}/>
                        <Text as="h4" fontSize={14}>{id}</Text>
                    </Flex>
                </Flex>
                <Button variant="outline" width="100%" alignSelf="center" size="sm" onClick={handleShowProducts}>
                    <Icon as={BiChevronDown} fontSize={24} transform={showProducts ? "rotate(180deg)" : "rotate(0deg)"} transition="transform .3s"/>
                </Button>
                {
                    showProducts &&
                        <Flex flexDirection="column" gap={4} position="absolute" top="95%" left="0%" backgroundColor="#f9f9f9" padding={8} zIndex={999} boxShadow="0px 6px 0px #00000015" borderRadius="0 0 12px 12px">
                            {
                                products.map(product => (
                                    <AnimatePresence mode="wait" key={product.id}>
                                        <Flex as={motion.div} {...showProductsVariants} gap={4} alignItems="center" paddingBottom={4} borderBottom="2px" borderColor="#efefef">
                                            <Link to={`/product/${product.category}/${product.id}`}>
                                                <Image src={product.image} maxWidth={50} maxHeight={50} backgroundColor="#fff" borderRadius={6}/>
                                            </Link>
                                            <Link to={`/product/${product.category}/${product.id}`}>
                                                <Heading as="h2" fontSize={12}>{product.name.toUpperCase()}</Heading>
                                            </Link>
                                            <Flex flexDirection="column" gap={2} minWidth="fit-content">
                                                <Text as="h2" fontSize={12} textAlign="right" paddingBottom={2} borderBottom="2px" borderColor="#efefef">{product.quantity} x {formatPrice(product.price)}</Text>
                                                <Text as="h2" fontSize={12} textAlign="right">{formatPrice(product.price * product.quantity)}</Text>
                                            </Flex>
                                        </Flex>
                                    </AnimatePresence>
                                ))
                            }
                            <Text textAlign="right" fontSize={14} color="green.500">{formatPrice(products.reduce((total, product) => total + (product.price * product.quantity), 0))}</Text>
                        </Flex>
                }
            </Flex>
        </>
    )
}