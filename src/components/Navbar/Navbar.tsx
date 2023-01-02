/* eslint-disable jsx-a11y/anchor-is-valid */
import './Navbar.css';
import Logo from '../../assets/logo2.png';
import { UserContext } from '../../contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from './Link';
import { Home } from '../../pages/sub-pages/Home/Home';
import { POS } from '../../pages/sub-pages/POS/POS';
import { Messages } from '../../pages/sub-pages/Messages/Messages';
import { Reports } from '../../pages/sub-pages/Reports/Reports';
import { UserAdmin } from '../../pages/sub-pages/UserAdmin/UserAdmin';
import { MemberAdmin } from '../../pages/sub-pages/MemberAdmin/MemberAdmin';
import { Settings } from '../../pages/sub-pages/Settings/Settings';

enum Menus{
    Dashboard,
    POS,
    Messages,
    Reports,
    UserAdmin,
    MemberAdmin,
    Settings
}
export const Navbar = () =>{
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const [menu, setMenu] = useState(0);
    
    var NavBarList = [
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
            icon: 'face',
            title: 'Member Admin'
        },
        {
            status: '',
            icon: 'settings',
            title: 'Settings'
        }
    ]
    

    useEffect(() =>{
        
    },[])

    const handleClick = (e: number) => {
        var active:any = document.getElementsByClassName("active");
        var newActive:any = document.getElementById(`${e}`);
        for(active of active){
            active.classList.remove("active")
        }
        active.classList.remove("active");

        newActive.classList.add("active");
        
        setMenu(e)
    }
 
    const handleLogout = () => {
        if(userContext){
            userContext.setUser(null)
            localStorage.removeItem("token");
            navigate('/')
        }
       
    }

    const SelectedMenu = () =>{
        switch (menu) {
            case Menus.Dashboard:
                    return <Home />
                
            case Menus.POS:
                    return <POS />

            case Menus.Messages:
                    return <Messages />
                    
            case Menus.Reports:
                    return <Reports />

            case Menus.UserAdmin:
                    return <UserAdmin />

            case Menus.MemberAdmin:
                    return <MemberAdmin />
    
            case Menus.Settings:
                    return <Settings />     
        
            default:
                break;
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
                    NavBarList.map((item,i) => 
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
            <main>
                {
                  SelectedMenu()
                }
            </main>
        </>
    )
}