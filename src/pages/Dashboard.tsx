import { useNavigate } from 'react-router-dom'
export const Dashboard = () => {
    const navigate = useNavigate()
    return (
        <>
            <div>Dashboard</div>
            <button onClick={() => navigate('/')}>logout</button>
        </>
    )
}