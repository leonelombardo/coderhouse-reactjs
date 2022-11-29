import { useContext } from "react"
import { Button, Flex, Text } from "@chakra-ui/react"

import { MdOutlineShoppingCart } from 'react-icons/md'
import { Context } from "../context"

export const CartWidget = () => {
    const { cart }= useContext(Context)

    return (
        <Button variant="unstyled" fontSize={{base: 40, md: 28}}>
            <MdOutlineShoppingCart/>
            {
                cart.length
                    ? <Flex justifyContent="center" alignItems="center" position="absolute" top={0} right="8px" backgroundColor="red.500" width={18} height={18} borderRadius="50%">
                        <Text textAlign="center" color="secondary.500" fontSize={12}>{cart.reduce((total, product) => total + product.quantity, 0)}</Text>
                    </Flex>
                    : <></> 
            }
        </Button>
    )
}