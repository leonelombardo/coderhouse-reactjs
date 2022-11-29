import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

import { ItemListContainer } from './containers/ItemListContainer'
import { ItemDetailContainer } from './containers/ItemDetailContainer'
import { Error404 } from './containers/Error404'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { Orders } from './pages/Orders'

export const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location} >
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/category" element={<ItemListContainer/>}/>
                    <Route exact path="/category/:categoryId" element={<ItemListContainer/>}/>
                    <Route path="/product/:category/:productId" element={<ItemDetailContainer/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/checkout" element={<Cart/>}/>
                    <Route path="/404" element={<Error404/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </AnimatePresence>
        </>
    )
}