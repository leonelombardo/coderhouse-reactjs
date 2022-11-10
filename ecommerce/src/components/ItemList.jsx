import { Grid, Heading, Text } from '@chakra-ui/react'
import { ItemCard } from './ItemCard'
import { Wrapper } from './Wrapper'

export const ItemList = ({category, products}) => {
    return (
        <Wrapper>
            <Heading as="h1" fontSize={{base: 32, md: 64}} fontWeight={1000}>{category.toUpperCase()}</Heading>
                {
                    products.length
                        ? <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8} width="100%">
                            {
                            products.map(product => (
                                <ItemCard key={product.id} product={product} category={category}/>
                            ))
                            }
                        </Grid>
                        : <Text as="span" width="100%" textAlign="center" color="gray.400">There are no products</Text>
                }
        </Wrapper>
    )
}