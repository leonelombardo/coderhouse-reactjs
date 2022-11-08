import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { MdOutlineShoppingCart } from 'react-icons/md'

import { formatPrice } from "../services/formatPrice"
import { Wrapper } from "../components/Wrapper"

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState("")
    const [productQuantity, setProductQuantity] = useState(0)
    const navigateTo = useNavigate()

    const params = useParams()
    const { category, productId } = params

    const getProducts = async () => {
        const response = await fetch(`/api/${category}.json`)
        const data = await response.json()
        const product = data.find(product => product.id === +productId ? product : "")

        setProduct(product)
    }

    const addProduct = () => {
        setProductQuantity(previous => previous + 1)
    }

    const removeProduct = () => {
        setProductQuantity(previous => previous <= 0 ? 0 : previous - 1)
    }
    
    useEffect(()=> {
        getProducts()
    }, [category, productId])

    return (
        <>
            <Wrapper>
                {
                    product
                        ? <Flex gap={8} maxWidth={1000} minWidth={250} maxHeight={500} padding={8}>
                            <Image src={product.image} alt={product.name} maxWidth={350} height="auto" objectFit="contain" borderRadius={12}/>
                            <Flex flexDirection="column" justifyContent="space-between" gap={4}>
                                <Flex  flexDirection="column" gap={2}>
                                    <Heading as="h1" fontSize={32} fontWeight={1000}>{product.name.toUpperCase()}</Heading>
                                    <Text as="span" fontSize={24}>{formatPrice(product.price)}</Text>
                                </Flex>
                                <Flex flexDirection="column" gap={4} maxWidth={350}>
                                    <Flex width="100%" gap={4}>
                                        <Button onClick={removeProduct}>-</Button>
                                        <input type="number" value={productQuantity} style={{textAlign: "center", flex: 1}} />
                                        <Button onClick={addProduct}>+</Button>
                                    </Flex>
                                    <Button leftIcon={<MdOutlineShoppingCart/>}>Add to cart</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        : navigateTo("/404")
                }
            </Wrapper>
        </>
    )
}