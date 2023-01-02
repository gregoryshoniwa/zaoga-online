/* eslint-disable jsx-a11y/anchor-is-valid */
import './Navbar.css';
import Logo from '../../assets/logo2.png';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from './Link';

type LinkProps = {
    status: 'active' | '' ,
    icon:string,
    title:string,
}
export const Navbar = () =>{
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const [list, setList] = useState<LinkProps[]>([]);

    

    useEffect(() =>{
        setList([
        {
            status: 'active',
            icon: 'dashboard',
            title: 'Dashboard'
        },
        {
            status: '',
            icon: 'receipt_long',
            title: 'Point of Sale'
        },
        {
            status: '',
            icon: 'mail',
            title: 'Messages'
        },
        {
            status: '',
            icon: 'insights',
            title: 'Reports'
        },
        {
            status: '',
            icon: 'person',
            title: 'User Admin'
        },
        {
            status: '',
            icon: 'person',
            title: 'Member Admin'
        },
        {
            status: '',
            icon: 'settings',
            title: 'Settings'
        }
    ]);
    },[])

    const handleClick = (e: number) => {
        var active:any = document.getElementsByClassName("active");
        var newActive:any = document.getElementById(`${e}`);
        for(active of active){
            active.classList.remove("active")
        }
        active.classList.remove("active");

        newActive.classList.add("active");
        
      
    }
 
    const handleLogout = () => {
        if(userContext){
            userContext.setUser(null)
            localStorage.removeItem("token");
            navigate('/')
        }
       
    }

    return (
        
        <>
            <aside>
                <div className="top">
                    <div className="logo">
                        <img src={Logo} alt="logo" />
                        <h2>ZAOGA<span className="danger">Online</span></h2>
                    </div>
                    <div className="close" id="close-btn">
                        <span className="material-icons">close</span>
                    </div>
                </div>
                <div className="sidebar">
                    {
                    list.map((item,i) => 
                            <a key={i} id={`${i}`} href="#" className={item.status} onClick={() => handleClick(i)}>
                                <Link title={item.title} icon={item.icon} />
                            </a>
                        )
                    }
                    
                    
                    <a href="#" onClick={ handleLogout }>
                        <span className="material-icons">logout</span>
                        <h3>Logout</h3>
                    </a>
                </div>
            </aside>
        </>
    )
}