import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from "framer-motion"

import { ItemListContainer } from './containers/ItemListContainer'
import { ItemDetailContainer } from './containers/ItemDetailContainer'
import { Error404 } from './containers/Error404'

export const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location} >
                    <Route exact path="/" element={<ItemListContainer greeting="Welcome"/>}/>
                    <Route exact path="/category" element={<ItemListContainer/>}/>
                    <Route exact path="/category/:categoryId" element={<ItemListContainer greeting="Category not found"/>}/>
                    <Route path="/product/:category/:productId" element={<ItemDetailContainer/>}/>
                    <Route path="/404" element={<Error404/>}/>
                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </AnimatePresence>
        </>
    )
}