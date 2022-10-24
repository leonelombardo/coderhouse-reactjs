import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './theme'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/products" element={<Home/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  )
}