import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { collection, query, where, getDocs } from "firebase/firestore"

import { MdOutlineShoppingCart } from 'react-icons/md'
import { db } from "../firebase/client"

import { formatPrice } from "../services/formatPrice"
import { Wrapper } from "../components/Wrapper"
import { Error404 } from "./Error404"
import { Spinner } from "../components/Spinner"

import { Context } from "../context"

import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState("")
    const [productQuantity, setProductQuantity] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const context = useContext(Context)
    const { cart, setCart } = context
    
    const params = useParams()
    const { category, productId } = params
    
    const notifyError = (message) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }

    const notifySuccess = (message) => {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
    }

    const getProduct = async (category, id) => {
        const q = query(collection(db, category), where("id", "==", +id));
        
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setProduct({id: doc.id, ...doc.data()});
            })

            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    }
    
    const removeProduct = () => {
        setProductQuantity(previous => previous <= 0 ? 0 : previous - 1)
    }

    const addProduct = () => {
        setProductQuantity(previous => previous + 1)
    }

    const addToCart = (id) => {
        if(!productQuantity){
            return notifyError("Please select a valid quantity before adding a product.")
        }

        setCart(previous => {
            if(previous){
                const total = [...previous, {...product, quantity: productQuantity}]
                const reduced = total.reduce((arr, item) => {
                    const repeated = arr.find(element => element.id === item.id)

                    if(repeated){
                        const newArray = arr.map(element => element.id === item.id ? {...item, quantity: productQuantity} : element)
                        return newArray
                    }else{
                        return [...arr, item]
                    }
                }, [])
                
                return reduced
            }else{
                return [...previous, {...product, quantity: productQuantity}]
            }
        })

        return notifySuccess(`Product added successfully.`)
    }

    const handleInputQuantity = (event) => setProductQuantity(+event.target.value)

    useEffect(()=> {
        getProduct(category, productId)
    }, [category, productId])

    if(isLoading){
        return <Spinner/>
    }

    return (
        <>
            {
                product
                    ? <Wrapper>
                        <Flex gap={24} maxWidth={1000} minWidth={250} padding={8} flexWrap={{base: "wrap", md: "nowrap"}} justifyContent="center">
                            <Image src={product?.image} alt={product?.name} maxWidth={350} maxHeight={350} objectFit="contain" borderRadius={12}/>
                            <Flex flexDirection="column" justifyContent="space-between" alignItems="center" gap={16} maxWidth={{base: 350, md: 500}}>
                                <Flex flexDirection="column" gap={2}>
                                    <Heading as="h1" fontSize={32} fontWeight={1000}>{product?.name?.toUpperCase()}</Heading>
                                    <Text as="span" fontSize={24}>{formatPrice(product?.price)}</Text>
                                </Flex>
                                <Flex flexDirection="column" gap={4} maxWidth={350}>
                                    <Flex width="100%" gap={4}>
                                        <Button onClick={removeProduct}>-</Button>
                                        <input type="number" value={productQuantity} onChange={handleInputQuantity} readOnly style={{textAlign: "center", flex: 1, outline: "none", border: "none"}}/>
                                        <Button onClick={addProduct}>+</Button>
                                    </Flex>
                                    <Button leftIcon={<MdOutlineShoppingCart/>} onClick={() => addToCart(product.id)}>Add to cart</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        <ToastContainer/>
                    </Wrapper>
                    : <Error404/>
            }
        </>
    )
}