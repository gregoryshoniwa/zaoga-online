
import { useNavigate } from 'react-router-dom'
export const NoPage = () => {
    const navigate = useNavigate()
    return ( 
        <>
            <div>You are lost please go back</div>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
     );
}
