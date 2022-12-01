import { Grid, Text } from '@chakra-ui/react'
import { useEffect } from "react"
import { useLocation } from 'react-router-dom'

import { ItemCard } from './ItemCard'
import { Title } from "./Title"

export const ItemList = ({category, products}) => {
    const { pathname } = useLocation()
    const categoryFormatted = category.charAt(0).toUpperCase().concat(category.slice(1).toLowerCase())

    useEffect(()=> {
        if(pathname === "/") return
        document.title = `FL!P | ${categoryFormatted}`
    }, [])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
                {
                    products?.length
                        ? <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={8} width="100%">
                            {
                                products
                                    .sort((a, b) => {
                                        if(a.stock > b.stock) return -1
                                        if(a.stock < b.stock) return 1
                                        return 0
                                    })
                                    .map(product => (
                                    <ItemCard key={product.id} product={product} category={category}/>
                                    ))
                            }
                        </Grid>
                        : <Text as="span" width="100%" textAlign="center" color="gray.400">There are no products</Text>
                }
        </>
    )
}