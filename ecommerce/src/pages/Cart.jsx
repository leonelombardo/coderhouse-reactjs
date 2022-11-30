import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Text, FormControl, FormLabel, FormErrorMessage, Input, Button } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

import { Context } from '../context'
import { checkProductStock, createNewOrder, updateStock } from '../firebase/client'
import { notifyError } from '../services/notifications'
import { formatPrice } from '../services/formatPrice'

import { Wrapper } from '../components/Wrapper'
import { Title } from "../components/Title"
import { CartCard } from '../components/CartCard'

import { TbSkateboard } from "react-icons/tb"
import { IoShirtOutline } from "react-icons/io5"

export const Cart = () => {
    const context = useContext(Context)
    const { cart, setCart } = context
    const totalPrice = cart.length ? cart.reduce((total, product) => total + (product.price * product.quantity), 0) : cart

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [confirmedEmail, setConfirmedEmail] = useState("")
    const [purchasedProducts, setPurchasedProducts] = useState([])

    const [invalidName, setInvalidName] = useState(true)
    const [invalidPhone, setInvalidPhone] = useState(true)
    const [invalidEmail, setInvalidEmail] = useState(true)
    const [invalidConfirmedEmail, setInvalidConfirmedEmail] = useState(true)

    const phoneRegex = /^[0-9]{10}$/g
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const handleName = (event) => {
        setName(event.target.value)
        
        if(event.target.value === ""){
            return  setInvalidName(true)
        }

        setInvalidName(false)
    }
    
    const handleEmail = (event) => {
        setEmail(event.target.value)
        
        if(!event.target.value || !event.target.value.match(emailRegex)){
            return setInvalidEmail(true)
        }
        
        if(event.target.value.match(emailRegex)){
            return setInvalidEmail(false)
        }
    }
    
    const handleConfirmEmail = (event) => {
        setConfirmedEmail(event.target.value)
        
        if(event.target.value.toLowerCase() === email.toLowerCase()){
            return setInvalidConfirmedEmail(false)
        }else{
            return setInvalidConfirmedEmail(true)
        }
        
    }

    const handlePhone = (event) => {
        setPhone(event.target.value)

        if(!event.target.value || !event.target.value.match(phoneRegex)){
            return setInvalidPhone(true)
        }

        if(event.target.value.match(phoneRegex)){
            return setInvalidPhone(false)
        }
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const data = await checkProductStock(cart)
        const [products, errors] = data

        setCart(previous => previous.reduce((arr, product) => {
            const availableStock = products.find(item => item.id === product.id )
        
            if(availableStock){
                updateStock(product)
                setPurchasedProducts(previous => [...previous, product])
                return arr
            }else{
                return [...arr, product]
            }
        }, []))

        errors.forEach(error => notifyError(error))
    }

    useEffect(()=> {
        if(purchasedProducts.length){
            createNewOrder(name, email, phone, purchasedProducts)

            setPurchasedProducts([])
        }
    }, [purchasedProducts])

    useEffect(()=> {
        if(email !== confirmedEmail) return setInvalidConfirmedEmail(true)
        
        return setInvalidConfirmedEmail(false)
    }, [email])

    return (
        <>
            <Wrapper>
                <Title>CHECKOUT</Title>
                {
                    cart.length
                        ? <>
                            <Flex gap={16} flexDirection={{base: "column-reverse", md: "row"}} justifyContent="space-between" width="100%" padding={4}>
                                <Flex as="form" onSubmit={handleForm} display="flex" flexDirection="column" gap={8} minWidth={{base: "100%", md: "40%"}}>
                                    <FormControl isInvalid={invalidName}>
                                        <FormLabel>Name</FormLabel>
                                        <Input type="text" value={name} onChange={handleName}/>
                                        { invalidName && <FormErrorMessage>Name is required.</FormErrorMessage> }
                                    </FormControl>
                                    <FormControl isInvalid={invalidEmail}>
                                        <FormLabel>Email</FormLabel>
                                        <Input type="email" value={email} onChange={handleEmail}/>
                                        { invalidEmail && <FormErrorMessage>Email is required.</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={invalidConfirmedEmail}>
                                        <FormLabel>Confirm email</FormLabel>
                                        <Input type="email" value={confirmedEmail} onChange={handleConfirmEmail}/>
                                        { invalidConfirmedEmail && <FormErrorMessage>Email doesn't match.</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid={invalidPhone}>
                                        <FormLabel>Phone</FormLabel>
                                        <Input type="number" value={phone} onChange={handlePhone}/>
                                        { invalidPhone && <FormErrorMessage>Phone is required.</FormErrorMessage>}
                                    </FormControl>
                                    <Button type="submit" disabled={invalidName || invalidPhone || invalidEmail || invalidConfirmedEmail || (email !== confirmedEmail)}>Generate order</Button>
                                </Flex>
                                <Flex flexDirection="column" gap={4} minWidth={{base: "100%", md: "60%"}}>
                                    <Button type="button" width="fit-content" onClick={()=> setCart([])} alignSelf="flex-end" size="xs" marginBottom={4}>Clear all</Button>
                                    {
                                    cart.map(product => <CartCard key={product.id} product={product}/>)
                                    }
                                    <Text textAlign="center" fontSize={24} color="green" marginTop={4}>{formatPrice(totalPrice)}</Text>
                                </Flex>
                            </Flex>
                        </>
                        : <>
                            <Text as="span" color="#9a9a9a">There are no products.</Text>
                            <Flex flexDirection="column" alignItems="center">
                                <Link to="/category/skateboards">
                                    <Button variant="unstyled" leftIcon={<TbSkateboard/>} fontWeight={700} display="flex" alignItems="center" _hover={{textDecoration: "underline"}}>Skateboards</Button>
                                </Link>
                                <Link to="/category/clothing">
                                    <Button variant="unstyled" leftIcon={<IoShirtOutline/>} fontWeight={700} display="flex" alignItems="center" _hover={{textDecoration: "underline"}}>Clothing</Button>
                                </Link>
                            </Flex>
                        </> 
                    }
            </Wrapper>
            <ToastContainer/>
        </>
    )
}