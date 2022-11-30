import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Heading } from "@chakra-ui/react"
import { collection, query, getDocs } from "firebase/firestore"

import { db } from "../firebase/client"

import { ItemList } from "../components/ItemList"
import { Wrapper } from "../components/Wrapper"
import { Spinner } from "../components/Spinner"

export const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const getSkateboards = async (category) => {
        if(!category){
            return
        }

        const q = query(collection(db, category));

        try{
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => setProducts(previous => [...previous, {id: doc.id, ...doc.data()}]))
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        getSkateboards()
    }, [])

    useEffect(() => {
        getSkateboards(categoryId)
    }, [categoryId])

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            <Wrapper>
                {
                    categoryId === "skateboards"
                        ? <ItemList category={categoryId} products={products}/>
                        : categoryId === "clothing"
                            ? <ItemList category={categoryId} products={products}/>
                            : <Heading as={motion.p} fontSize={{base: 24, md: 48}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>Something went wrong.</Heading>
                }
            </Wrapper>
        </>
    )
}