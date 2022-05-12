import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import UserContext from './util/UserContext'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Auth from './auth/Auth'
import Admin from './auth/Admin'
import User from './auth/User'
import CreateCategory from './admin/CreateCategory'
import CreateProduct from './admin/CreateProduct'
import Shop from './pages/Shop'

function App() {
    const [user , setUser] = useState({})
    return (
        <UserContext.Provider value={[user , setUser]}>
            <Navbar />
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/user/dashboard' element={
                    <Auth>
                        <User>
                            <Dashboard />
                        </User>
                    </Auth>
                } />
                <Route path='/admin/dashboard'>
                    <Route path='' element={
                    <Auth>
                        <Admin>
                            <Dashboard />
                        </Admin>
                    </Auth>} />
                    <Route path='category/create' element={<CreateCategory />} />
                    <Route path='product/create' element={<CreateProduct />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App