import { Button } from "@chakra-ui/react"
import { MdOutlineShoppingCart } from 'react-icons/md'

export const CartWidget = () => {
    return (
        <Button variant="unstyled" fontSize={{base: 40, md: 28}}>
            <MdOutlineShoppingCart/>
        </Button>
    )
}