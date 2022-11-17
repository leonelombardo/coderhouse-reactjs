import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"

import { MdOutlineShoppingCart } from 'react-icons/md'
import { db } from "../firebase/client"

import { formatPrice } from "../services/formatPrice"
import { Wrapper } from "../components/Wrapper"
import { Error404 } from "./Error404"

export const ItemDetailContainer = () => {
    const [product, setProduct] = useState("")
    const [productQuantity, setProductQuantity] = useState(0)
    
    const params = useParams()
    const { category, productId } = params
    
    const getProduct = async (category, id) => {
        const q = query(collection(db, category), where("id", "==", +id));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProduct({id: doc.id, ...doc.data()});
        });
    }
    
    const removeProduct = () => {
        setProductQuantity(previous => previous <= 0 ? 0 : previous - 1)
    }

    const addProduct = () => {
        setProductQuantity(previous => previous + 1)
    }

    const handleInputQuantity = (event) => setProductQuantity(+event.target.value)

    useEffect(()=> {
        getProduct(category, productId)
    }, [category, productId])

    return (
        <>
            {
                product
                    ? <Wrapper>
                        <Flex gap={24} maxWidth={1000} minWidth={250} maxHeight={500} padding={8}>
                                <Image src={product?.image} alt={product?.name} maxWidth={350} height="auto" objectFit="contain" borderRadius={12}/>
                                <Flex flexDirection="column" justifyContent="space-between" gap={4}>
                                    <Flex  flexDirection="column" gap={2}>
                                        <Heading as="h1" fontSize={32} fontWeight={1000}>{product?.name?.toUpperCase()}</Heading>
                                        <Text as="span" fontSize={24}>{formatPrice(product?.price)}</Text>
                                    </Flex>
                                    <Flex flexDirection="column" gap={4} maxWidth={350}>
                                        <Flex width="100%" gap={4}>
                                            <Button onClick={removeProduct}>-</Button>
                                            <input type="number" value={productQuantity} onChange={handleInputQuantity} readOnly style={{textAlign: "center", flex: 1, outline: "none", border: "none"}}/>
                                            <Button onClick={addProduct}>+</Button>
                                        </Flex>
                                        <Button leftIcon={<MdOutlineShoppingCart/>}>Add to cart</Button>
                                    </Flex>
                                </Flex>
                            </Flex>
                    </Wrapper>
                    : <Error404/>
            }
        </>
    )
}