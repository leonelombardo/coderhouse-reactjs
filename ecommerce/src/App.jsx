import { HashRouter as Router } from 'react-router-dom'
import { ChakraProvider, Container } from '@chakra-ui/react'

import { theme } from './theme'
import { Navbar } from './components/Navbar'
import { AnimatedRoutes } from './AnimatedRoutes'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar/>
            <AnimatedRoutes/>
          </Router>
        </div>
    </ChakraProvider>
  )
}