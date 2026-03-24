import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../src/features/auth/pages/Login'
import Register from '../src/features/auth/pages/Register'
import Dashboard from '../src/features/items/pages/Dashboard'
import Itemdetail from '../src/features/items/pages/ItemDetail'
import GraphPage from '../src/features/graph/pages/GraphPage'
import SearchPage from '../src/features/search/pages/SearchPage'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/item/:id' element={<Itemdetail />} />
                <Route path='/graph' element={<GraphPage />} />
                <Route path='/search' element={<SearchPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes