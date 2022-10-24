import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence  } from 'framer-motion'

import { Home } from './pages/Home'

export const AnimatedRoutes = () => {
    const location = useLocation()
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/home" element={<Home/>}/>
            </Routes>
        </AnimatePresence>
    )
}