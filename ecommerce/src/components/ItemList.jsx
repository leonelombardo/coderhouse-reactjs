import { Grid, Text } from '@chakra-ui/react'

import { ItemCard } from './ItemCard'
import { Wrapper } from './Wrapper'
import { Title } from "./Title"

export const ItemList = ({category, products}) => {
    return (
        <Wrapper>
            <Title>{category.toUpperCase()}</Title>
                {
                    products?.length
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