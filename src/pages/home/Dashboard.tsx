import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Navbar } from '../../components/Navbar/Navbar'

export const Dashboard = () => {
    const userContext = useContext(UserContext)
        
    return (
        <>
        {
            userContext?.user?.token 
            ?
            <div className="container">
                <Navbar />
                {/* <div>Dashboard</div>
                <div>Welcome {userContext?.user?.username}</div>
                <button onClick={ handleLogout }>logout</button> */}
            </div>
            
            :
            <Navigate to={'/'} />
        }
            
        </>
    )
}