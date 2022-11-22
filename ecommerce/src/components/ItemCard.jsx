import { GridItem, Flex, Image, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { formatPrice } from '../services/formatPrice'

export const ItemCard = ({product, category}) => {
    return (
        <Link to={`/product/${category}/${product.id}`}>
            <GridItem key={product.id} maxWidth={300} minHeight={250} height="100%" display="flex" flexDirection="column" alignItems="center" flex={1} backgroundColor="#fff" border="2px" borderColor="#efefef" borderRadius={12} margin="0 auto" _hover={{boxShadow: "10px 10px 0px #efefef"}} transition="box-shadow .3s">
                <Image src={product.image} alt={product.name} title={product.name} width={250} height={250} objectFit="contain" objectPosition="center"/>
                <Flex flexDirection="column" flex={1} justifyContent="space-between" gap={8} padding={8} backgroundColor="#fff" borderRadius={15}>
                    <Flex flexDirection="column" gap={2}>
                        <Heading as="h1" fontSize={18} fontWeight={1000}>{product.name.toUpperCase()}</Heading>
                        <Text as="span" fontSize={12}>Stock: {product.stock}</Text>
                        <Text as="span" fontSize={14}>{formatPrice(product?.price)}</Text>
                    </Flex>
                </Flex>
            </GridItem>
        </Link>
    )
}