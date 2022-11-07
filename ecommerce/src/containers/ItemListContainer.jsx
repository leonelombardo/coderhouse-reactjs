import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

import { ItemList } from "../components/ItemList"

export const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()

    const containerVariants = {
        initial: {
            opacity: 0,
            y: "100vh"
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: "100vh"
        }
    }

    const wordVariants = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
        },
        exit: {
            scale: 0
        }
    }

    const getProducts = async (category) => {
        if(!category){
            return
        }

        try {
            const response = await fetch(`/src/api/${category}.json`)
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
        <Container as={motion.div} {...containerVariants} display="flex" alignItems="center">
            {
                categoryId === "skateboards"
                    ? <ItemList category={categoryId} products={products}/>
                    : categoryId === "clothing"
                        ? <ItemList category={categoryId} products={products}/>
                        : <Heading as={motion.p} fontSize={{base: 24, md: 48}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>{greeting}</Heading>
            }
        </Container>
    )
}