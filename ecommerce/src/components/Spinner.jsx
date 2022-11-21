import { Icon } from '@chakra-ui/react'
import { RiLoader4Fill } from 'react-icons/ri'
import { Wrapper } from './Wrapper'

export const Spinner = () => {
    return (
        <>
            <Wrapper>
                <Icon as={RiLoader4Fill} color="primary.500" fontSize={96} className="spinner"/>
            </Wrapper>
        </>
    ) 
}