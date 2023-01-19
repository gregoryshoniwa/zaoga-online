import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Loader } from '../../components/Loader/Loader'
import { useSelector } from 'react-redux'

export const Dashboard = () => {
    
    const { isLoggedIn } = useSelector((state:any) => state.auth);
   const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false) 
    }, []);
  
        
    return (
        <>
        <Loader text='Process Data .....' loading={loading} />
        {
           isLoggedIn
            ?
            <div className="container">
                <Navbar />
                <div>Dashboard</div>
               
            </div>
            
            :
            <Navigate to={'/'} />
        }
            
        </>
    )
}