import { useNavigate, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export const Dashboard = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    
    const handleLogout = () => {
        if(userContext){
            userContext.setUser(null)
            localStorage.removeItem("token");
            navigate('/')
        }
       
    }
    return (
        <>
        {
            userContext?.user?.token 
            ?
            <div>
                <div>Dashboard</div>
                <div>Welcome {userContext?.user?.username}</div>
                <button onClick={ handleLogout }>logout</button>
            </div>
            
            :
            <Navigate to={'/'} />
        }
            
        </>
    )
}