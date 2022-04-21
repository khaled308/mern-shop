import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home'
import Navbar from './core/Navbar'
import AdminRoute from './user/AdminRoute'
import Dashboard from './user/Dashboard'
import Login from './user/Login'
import Signup from './user/Signup'
import userContext from './user/UserContext'

function App() {
    const [user , setUser] = useState([])
    return (
        <userContext.Provider value={[user , setUser]}>
            <Navbar />
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='user/dashboard' element={<Dashboard />} />
                <Route path='admin/dashboard' element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                } />
                <Route path='*' element={<Home />} />
            </Routes>
        </userContext.Provider>
    )
}

export default App