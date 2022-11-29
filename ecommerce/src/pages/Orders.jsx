import { useState, useEffect } from "react"
import { getAllDocuments } from "../firebase/client"

import { Wrapper } from "../components/Wrapper"
import { Flex, Grid, Spinner, Text } from "@chakra-ui/react"

import { Title } from "../components/Title"
import { OrderCard } from "../components/OrderCard"

export const Orders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    
    useEffect(()=> {
        (async()=> {
            const response = await getAllDocuments("orders")
            
            response.forEach(document => {
                setOrders(previous => [...previous, { id: document.id, ...document.data() }])
            })
            
            console.log(orders)
            setIsLoading(false)
        })()

    }, [])

    if(isLoading){
        return <Spinner/>
    }
    
    return (
        <>
            <Wrapper>
                <Title>ORDERS</Title>
                <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={8} width="100%">
                    {
                        orders.length
                            ? orders.map(order => <OrderCard key={order.id} id={order.id} name={order.buyer.name} email={order.buyer.email} phone={order.buyer.phone} products={order.products} date={order.createdAt}/>)
                            : <Text as="span" color="#9a9a9a">There are no orders.</Text>
                    }
                </Grid>
            </Wrapper>
        </>
    )
}