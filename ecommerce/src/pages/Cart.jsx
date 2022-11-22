import { useContext, useEffect, useState } from 'react'
import { Flex, Text, FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react'
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { ToastContainer } from 'react-toastify'

import { Context } from '../context'
import { db } from '../firebase/client'

import { Wrapper } from '../components/Wrapper'
import { Title } from "../components/Title"
import { CartCard } from '../components/CartCard'
import { formatPrice } from '../services/formatPrice'

import { notifyError, notifySuccess } from '../services/notifications'

export const Cart = () => {
    const context = useContext(Context)
    const { cart, setCart } = context
    const [items, setItems] = useState([])
    const totalPrice = cart?.reduce((total, product) => total + (product.price * product.quantity), 0)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [invalidName, setInvalidName] = useState(true)
    const [invalidPhone, setInvalidPhone] = useState(true)
    const [invalidEmail, setInvalidEmail] = useState(true)

    const phoneRegex = /^[0-9]{10}$/g
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const handleName = (event) => {
        if(!event.target.value){
            setInvalidName(true)
            return
        }

        setName(event.target.value)
        setInvalidName(false)
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)

        if(!phone || !phone.match(phoneRegex)){
            setInvalidPhone(true)
        }

        if(phone.match(phoneRegex)){
            setInvalidPhone(false)
        }
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)

        if(!email || !email.match(emailRegex)){
            setInvalidEmail(true)
        }

        if(email.match(emailRegex)){
            setInvalidEmail(false)
        }
    }

    const handleForm = async (event) => {
        event.preventDefault()

        
    }


    return (
        <>
            <Wrapper>
                <Title>CHECKOUT</Title>
                {
                    cart.length
                        ? <>
                            <Flex gap={16} flexDirection={{base: "column", md: "row"}} justifyContent="space-between" width="100%" padding={4}>
                                <Flex as="form" onSubmit={handleForm} display="flex" flexDirection="column" gap={8} minWidth={{base: "100%", md: "40%"}}>
                                    <FormControl isInvalid={invalidName}>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" onChange={handleName}/>
                                        { invalidName && <FormErrorMessage>Name is required.</FormErrorMessage> }
                                    </FormControl>
                                    <FormControl isInvalid={invalidPhone}>
                                        <FormLabel>Phone</FormLabel>
                                        <Input type="number" onChange={handlePhone}/>
                                        { invalidPhone && <FormErrorMessage>Phone is required.</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={invalidEmail}>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" onChange={handleEmail}/>
                                        { invalidEmail && <FormErrorMessage>Email is required.</FormErrorMessage>}
                                    </FormControl>
                                    <Button type="submit" /*disabled={invalidName || invalidPhone || invalidEmail}*/>Generate order</Button>
                                </Flex>
                                <Flex flexDirection="column" gap={4} minWidth={{base: "100%", md: "60%"}}>
                                    {
                                    cart.map(product => <CartCard key={product.id} product={product}/>)
                                    }
                                    <Text textAlign="center" fontSize={24} color="green" marginTop={4}>{formatPrice(totalPrice)}</Text>
                                </Flex>
                            </Flex>
                        </>
                        : <Text as="span" color="#9a9a9a">There are no products.</Text>
                    }
            </Wrapper>
            <ToastContainer/>
        </>
    )
}