import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './theme'
import { Navbar } from './components/Navbar'

import { Context } from './context'
import { AnimatedRoutes } from './AnimatedRoutes'

export const App = () => {
  const [cart, setCart] = useState([])

  const globalContext = {
    cart,
    setCart
  }

  return (
    <Context.Provider value={globalContext}>
      <ChakraProvider theme={theme}>
        <Router>
            <Navbar/>
            <AnimatedRoutes/>
        </Router>
      </ChakraProvider>
    </Context.Provider> 
  )
}