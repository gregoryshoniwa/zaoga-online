
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const navigate = useNavigate()
    return ( 
        <>
            <div>Login Page</div>
            <button onClick={() => navigate('home')}>login</button>
        </>
     );
}
