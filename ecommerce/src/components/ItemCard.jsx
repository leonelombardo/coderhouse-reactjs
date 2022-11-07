import { GridItem, Flex, Image, Heading, Text, Box, Button } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { MdOutlineShoppingCart } from 'react-icons/md'

import { formatPrice } from '../services/formatPrice'
import { Context } from '../context'

export const ItemCard = ({product, category}) => {
    const context = useContext(Context)
    const { cart, setCart } = context

    const [productQuantity, setProductQuantity] = useState(0)

    const removeProduct = () => {
        setProductQuantity(previous => previous === 0 ? 0 : --previous)
    }

    const addProduct = () => {
        setProductQuantity(previous => ++previous)
    }

    const addToCart = (id) => {

    }

    return (
        <Link to={`/product/${category}/${product.id}`}>
            <GridItem key={product.id} maxWidth={300} minHeight={250} height="100%" display="flex" flexDirection="column" alignItems="center" flex={1} backgroundColor="#fff" border="2px" borderColor="#efefef" borderRadius={12} margin="0 auto" _hover={{boxShadow: "10px 10px 0px #efefef"}} transition="box-shadow .3s">
                <Image src={product.image} alt={product.name} title={product.name} width={250} height={250} objectFit="contain" objectPosition="center"/>
                <Flex flexDirection="column" flex={1} justifyContent="space-between" gap={8} padding={8} backgroundColor="#fff" borderRadius={15}>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h1" fontSize={18} fontWeight={1000}>{product.name.toUpperCase()}</Heading>
                        <Text as="span" fontSize={14}>{formatPrice(product?.price)}</Text>
                    </Flex>
                    <Flex flexDirection="column" gap={4}>
                        <Box width="100%" display="flex" justifyContent="space-between" flexWrap="nowrap" gap={4}>
                            <Button onClick={removeProduct}>-</Button>
                            <input type="number" value={productQuantity} readOnly style={{width: "100%", textAlign: "center"}}/>
                            <Button onClick={addProduct}>+</Button>
                        </Box>
                        <Button leftIcon={<MdOutlineShoppingCart/>} onClick={() => addToCart(product.id)}>Add to cart</Button>
                    </Flex>
                </Flex>
            </GridItem>
        </Link>
    )
}