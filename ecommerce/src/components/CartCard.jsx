import { useContext } from "react"
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { formatPrice } from '../services/formatPrice'
import { Context } from "../context"

export const CartCard = ({product}) => {
    const context = useContext(Context)
    const { cart, setCart } = context

    const removeProduct = (id) => {
        console.log(cart)
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
        setCart(previous => previous.map(product => product.id === id ? {...product, quantity: product.quantity + 1} : product))
    }

    const deleteProduct = (id) => {
        setCart(previous => previous.filter(product => product.id === id ? "" : product))
    }

    return (
        <>
            <Box as="div" backgroundColor="secondary.500" border="2px" borderColor="#efefef" padding={4} borderRadius={12} maxWidth={500}>
                <Flex gap={8} justifyContent="space-between" alignItems="center">
                    <Flex gap={8}>
                        <Image src={product.image} width={100} height={100} objectFit="cover" borderRadius={6}/>
                        <Flex flexDirection="column" gap={2}>
                            <Heading as="h2" fontSize={16}>{product.name.toUpperCase()}</Heading>
                            <Text as="span" fontSize={12}>{formatPrice(product.price)}</Text>
                            <Text as="span" fontSize={12}>Quantity: {product.quantity}</Text>
                        </Flex>
                    </Flex>
                    <Flex gap={4} flexDirection="column" alignSelf="center">
                        <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
                        <Flex gap={2}>
                            <Button onClick={() => removeProduct(product.id)}>-</Button>
                            <Button onClick={() => addProduct(product.id)}>+</Button>
                        </Flex>
                        <Text>{formatPrice(product.price * product.quantity)}</Text>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}