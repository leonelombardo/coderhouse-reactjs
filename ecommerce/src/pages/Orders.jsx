import { useState, useEffect } from "react"
import { getAllDocuments } from "../firebase/client"

import { Wrapper } from "../components/Wrapper"
import { Flex, Spinner, Text } from "@chakra-ui/react"

import { Title } from "../components/Title"
import { OrderCard } from "../components/OrderCard"

export const Orders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    
    useEffect(()=> {
        (async()=> {
            const response = await getAllDocuments("orders")
            
            response.forEach(document => {
                setOrders(previous => [...previous, document.data()])
            })
            
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
                <Flex>
                    {
                        orders.length
                            ? orders.map(order => <OrderCard key={order.id} id={order.id} name={order.buyer.name} email={order.buyer.email} phone={order.buyer.phone} products={order.products}/>)
                            : <Text as="span" color="#9a9a9a">There are no orders.</Text>
                    }
                </Flex>
            </Wrapper>
        </>
    )
}