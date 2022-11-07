import { Grid, Heading } from '@chakra-ui/react'
import { ItemCard } from './ItemCard'
import { Wrapper } from './Wrapper'

export const ItemList = ({category, products}) => {
    return (
        <Wrapper>
            <Heading as="h1" fontSize={{base: 32, md: 64}} fontWeight={1000}>{category.toUpperCase()}</Heading>
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8} width="100%">
                {
                    products.map(product => (
                        <ItemCard key={product.id} product={product} category={category}/>
                    ))
                }
            </Grid>
        </Wrapper>
    )
}