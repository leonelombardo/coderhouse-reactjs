import { useState, useEffect } from "react"
import { Grid, Text } from "@chakra-ui/react"

import { getAllDocuments } from "../firebase/client"
import { notifyError } from "../services/notifications"

import { Wrapper } from "../components/Wrapper"
import { Title } from "../components/Title"
import { OrderCard } from "../components/OrderCard"
import { Spinner } from "../components/Spinner"

export const Orders = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState([])
    
    useEffect(()=> {
        document.title = "FL!P | Orders"

        if(!orders.length){
            (async()=> {
                setIsLoading(true)
                try{
                    const response = await getAllDocuments("orders")
                    
                    response.forEach(document => {
                        setOrders(previous => [...previous, { id: document.id, ...document.data() }])
                    })
                }
                catch(error){
                    notifyError(error)
                }            
                finally{
                    setIsLoading(false)
                }
            })()
        }
    }, [])

    if(isLoading){
        return <Spinner/>
    }
    
    return (
        <>
            <Wrapper>
                <Title>ORDERS</Title>
                <Grid templateColumns={orders.length ? "repeat(auto-fill, minmax(300px, 1fr))" : "1fr"} gap={8} width="100%">
                    {
                        orders.length
                            ? orders
                                .sort((a, b) => {
                                    if(a.createdAt > b.createdAt) return -1
                                    if(a.createdAt < b.createdAt) return 1
                                    return 0
                                })
                                .map(order => <OrderCard key={order.id} id={order.id} name={order.buyer.name} email={order.buyer.email} phone={order.buyer.phone} products={order.products} date={order.createdAt}/>)
                            : <Text as="span" color="#9a9a9a" textAlign="center">There are no orders.</Text>
                    }
                </Grid>
            </Wrapper>
        </>
    )
}