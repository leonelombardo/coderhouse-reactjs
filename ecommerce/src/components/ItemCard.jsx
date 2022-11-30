import { GridItem, Flex, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { formatPrice } from '../services/formatPrice'

export const ItemCard = ({product, category}) => {
    const checkCategory = category.includes("skateboards") ? "skateboards" : "clothing"

    return (
        <Link to={`/product/${checkCategory}/${product.id}`}>
            <GridItem key={product.id} maxWidth={300} minHeight={250} height="100%" display="flex" flexDirection="column" gap={6} alignItems="center" flex={1} backgroundColor="#f9f9f9" borderRadius={12} margin="0 auto" _hover={{boxShadow: "10px 10px 0px #efefef"}} transition="box-shadow .3s">
                <Image src={product.image} alt={product.name} title={product.name} maxWidth={225} width="100%" maxHeight={225} height="100%" objectFit="contain" objectPosition="center" borderRadius={8} marginTop={6} backgroundColor="#fff"/>
                <Flex flexDirection="column" flex={1} justifyContent="space-between" gap={8} padding={8} backgroundColor="#f9f9f9" borderRadius={15}>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h1" fontSize={18} fontWeight={1000}>{product.name.toUpperCase()}</Heading>
                        {
                            product.stock
                                ? <Text as="span" fontSize={12} color="secondary.500" backgroundColor="primary.500" width="fit-content" padding={1} borderRadius={4}>STOCK: {product.stock}</Text>
                                : <Text as="span" fontSize={12} color="secondary.500" backgroundColor="red.500" width="fit-content" padding={1} borderRadius={4}>NO STOCK</Text>
                                
                        }
                        {
                            product.stock
                                ? <Text as="span" fontSize={14}>{formatPrice(product?.price)}</Text>
                                : ""    
                        }
                    </Flex>
                </Flex>
            </GridItem>
        </Link>
    )
}