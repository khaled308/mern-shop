import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import userContext from './UserContext'

function AdminRoute({children}) {
    const user = useContext(userContext)
    if(!user.role) return <Navigate to='/' replace />
    return children
}

export default AdminRoute