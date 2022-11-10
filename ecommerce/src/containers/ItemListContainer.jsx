import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Heading } from "@chakra-ui/react"

import { ItemList } from "../components/ItemList"
import { Wrapper } from "../components/Wrapper"

export const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()

    const getProducts = async (category) => {
        if(!category){
            return
        }

        try {
            const response = await fetch(`/api/${category}.json`)
            const data = await response.json()
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts(categoryId)
    }, [categoryId])

    return (
        <Wrapper>
            <Container display="flex" alignItems="center">
                {
                    categoryId === "skateboards"
                        ? <ItemList category={categoryId} products={products}/>
                        : categoryId === "clothing"
                            ? <ItemList category={categoryId} products={products}/>
                            : <Heading as={motion.p} fontSize={{base: 24, md: 48}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>Something went wrong</Heading>
                }
            </Container>
        </Wrapper>
    )
}