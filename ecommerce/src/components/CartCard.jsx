import { useContext, useEffect } from "react"
import { Box, Button, Flex, Heading, Icon, Image, Text } from '@chakra-ui/react'

import { formatPrice } from '../services/formatPrice'
import { Context } from "../context"

import { MdAdd, MdRemove } from "react-icons/md"

export const CartCard = ({product}) => {
    const context = useContext(Context)
    const { cart, setCart } = context

    const removeProduct = (id) => {
        setCart(previous => {
                const thisProduct = previous.find(product => product.id === id ? product : "")

                if(thisProduct.quantity <= 1){
                    return previous.filter(product => product.id === id ? "" : product)
                }
                
                return previous.map(product => product.id === id ? {...product, quantity: product.quantity === 0 ? 0 : product.quantity - 1} : product)
            }    
        )
    }

    const addProduct = (id) => {
        setCart(previous => previous.map(product => product.id === id ? {...product, quantity: product.quantity >= product.stock ? product.quantity : product.quantity + 1} : product))
    }

    const deleteProduct = (id) => {
        setCart(previous => previous.filter(product => product.id === id ? "" : product))
    }

    return (
        <>
            <Box as="div" key={product.id} backgroundColor="secondary.500" borderBottom="2px" borderColor="#efefef" maxWidth="100%" paddingBottom={4}>
                <Flex gap={8} justifyContent="space-between" alignItems="center">
                    <Flex gap={8} alignItems="center">
                        <Image src={product.image} width={50} height={50} objectFit="cover" objectPosition="center" borderRadius={6}/>
                        <Flex flexDirection="column" gap={2}>
                            <Heading as="h2" fontSize={12}>{product.name.toUpperCase()}</Heading>
                            <Text as="span" fontSize={12}>{formatPrice(product.price)}</Text>
                            <Text as="span" fontSize={12}>Stock: {product.stock}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                        <Flex gap={2} flexDirection="column" alignSelf="center">
                            <Flex gap={2} alignItems="center">
                                <Button size="xs" onClick={() => removeProduct(product.id)}>
                                    <Icon as={MdRemove}/>
                                </Button>
                                <Text as="span" fontSize={12}>{product.quantity}</Text>
                                <Button size="xs" onClick={() => addProduct(product.id)} disabled={product.quantity >= product.stock}>
                                    <Icon as={MdAdd}/>
                                </Button>
                            </Flex>
                            <Text textAlign="center" fontSize={12}>{formatPrice(product.price * product.quantity)}</Text>
                        </Flex>
                        <Button variant="unstyled" size="xs" onClick={() => deleteProduct(product.id)}>
                            <Icon as={MdAdd} fontSize={24} color="#ccc" transform="rotate(45deg)"/>
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}