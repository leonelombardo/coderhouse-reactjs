import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './theme'
import { Navbar } from './components/Navbar'

import { Context } from './context'
import { Wrapper } from './components/Wrapper'
import { AnimatedRoutes } from './AnimatedRoutes'

export const App = () => {
  const [cart, setCart] = useState([])

  const globalContext = {
    cart,
    setCart
  }

  useEffect(()=> {
    console.log(cart)
  }, [cart])

  return (
    <Context.Provider value={globalContext}>
      <ChakraProvider theme={theme}>
        <Router>
            <Navbar/>
            <Wrapper>
              <AnimatedRoutes/>
            </Wrapper>
        </Router>
      </ChakraProvider>
    </Context.Provider> 
  )
}