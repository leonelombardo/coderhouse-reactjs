import { useState, useEffect } from "react"
import { Flex, Heading, Text } from "@chakra-ui/react"

import { getAllDocuments } from "../firebase/client"

import { Wrapper } from "../components/Wrapper"
import { Spinner } from "../components/Spinner"
import { ItemList } from "../components/ItemList"

export const Home = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        (async()=> {
            setIsLoading(true)
            try{
                const random = Math.floor((Math.random() * 10)) > 5 ? "skateboards" : "clothing"
                const response = await getAllDocuments(random)
                
                response.forEach(document => {
                    setProducts(previous => [...previous, { id: document.id, ...document.data() }])
                })

                setCategory(random)
            }
            catch(error){
                notifyError(error)
            }            
            finally{
                setIsLoading(false)
            }
        })()
    }, [])

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>  
            <Wrapper justifyContent="start">
                <Flex justifyContent="end" alignItems="end" width="100vw" backgroundImage="url(/banner/luanoliveira.jpg)" backgroundPosition="center top" backgroundRepeat="no-repeat" backgroundAttachment="fixed" backgroundSize="cover" minHeight="90vh" padding={8} marginTop="-80px">
                    <Flex flexDirection="column" gap={4} textAlign="right" height="100%" width="100%" justifyContent="end"  alignItems="end">
                        <Heading as="h1" fontSize={{base: 32, lg: 48}} color="secondary.500" width="fit-content" borderBottom="1px solid" borderColor="secondary.500" paddingBottom={2}>CHALLENGE YOURSELF</Heading>
                        <Text as="span" fontSize={{base: 16, lg: 24}} color="secondary.500">START TODAY AND HUSTLE EVERYDAY</Text>
                    </Flex>
                </Flex>
                {
                    products.length
                        ? <ItemList category={`CHECK OUR ${category}`} products={products}/>
                        : ""
                }
            </Wrapper>
        </>
    )
}