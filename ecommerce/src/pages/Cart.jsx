import { useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import { Context } from '../context'

import { Wrapper } from '../components/Wrapper'
import { Title } from "../components/Title"
import { CartCard } from '../components/CartCard'

export const Cart = () => {
    const context = useContext(Context)
    const { cart } = context

    return (
        <>
            <Wrapper>
                <Title>CHECKOUT</Title>
                <Flex flexDirection="column" gap={4}>
                    {
                        cart.length
                            ? cart.map(product => <CartCard key={product.id} product={product}/>)
                            : <Text as="span" color="#9a9a9a">There are no products.</Text>
                    }
                </Flex>
            </Wrapper>
        </>
    )
}