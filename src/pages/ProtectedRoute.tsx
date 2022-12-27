import { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

interface ProtectedRouteProps {}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest}) =>{
    const userContext = useContext(UserContext)

    if(userContext?.user === null) return <Navigate to='/' />;
    return <Route {...rest} />;

}

export default ProtectedRoute