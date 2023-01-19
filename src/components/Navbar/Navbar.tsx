/* eslint-disable jsx-a11y/anchor-is-valid */
import './Navbar.css';
import Logo from '../../assets/logo2.png';
import Avator from '../../assets/avator.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from './Link';

import { Home } from '../../pages/sub-pages/Home/Home';
import { POS } from '../../pages/sub-pages/POS/POS';
import { Messages } from '../../pages/sub-pages/Messages/Messages';
import { Reports } from '../../pages/sub-pages/Reports/Reports';
import { UserAdmin } from '../../pages/sub-pages/UserAdmin/UserAdmin';
import { Settings } from '../../pages/sub-pages/Settings/Settings';
import { MeetingChats } from '../../pages/sub-pages/MeetingChats/MeetingChats';
import { Calendar } from '../../pages/sub-pages/Calendar/Calendar';
import { ConfigProvider, theme } from 'antd';
import { useDispatch } from 'react-redux';


import { logout } from "../../slices/auth";


enum Menus{
    Dashboard,
    POS,
    Messages,
    Reports,
    UserAdmin,
    MeetingChats,
    Calendar,
    Settings
}
export const Navbar = () =>{
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [menu, setMenu] = useState(0);
    const [themeState, setThemeState] = useState('light');

    
    
    
    
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
            icon: 'duo',
            title: 'Meeting-Chat'
        },
        {
            status: '',
            icon: 'calendar_month',
            title: 'Calendar'
        },
        {
            status: '',
            icon: 'settings',
            title: 'Settings'
        }
    ]
    

    

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

    const handleClose = () => {
        var sideMenu:any = document.querySelector("aside");
        sideMenu.style.display = "none";
    }
    const handleOpen = () => {
        var sideMenu:any = document.querySelector("aside");
        sideMenu.style.display = "block";
    }

    const handleToggle = async () => {
        var themeToggler:any = document.querySelector(".theme-toggler");
    
        document.body.classList.toggle('dark-theme-variables');

        themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
        themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');

        if(themeState === 'light'){
          await setThemeState('dark');
        }
        if(themeState === 'dark'){
          await setThemeState('light');
        }
    }

    
    const handleLogout = async () => {
        
           await dispatch(logout())
           await localStorage.removeItem("token");
           await navigate('/')
        
       
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

            case Menus.MeetingChats:
                    return <MeetingChats />

            case Menus.Calendar:
                    return <Calendar />
    
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
                        <h2>ZAOGA<span className="danger">Link</span></h2>
                    </div>
                    <div className="close" id="close-btn" onClick={handleClose}>
                        <span className="material-icons" >close</span>
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
                    
                    themeState === 'dark'
                    ?
                    <ConfigProvider
                        theme={{
                            algorithm : theme.darkAlgorithm
                        }}
                    >
                        {
                        SelectedMenu()
                        }
                    </ConfigProvider>
                    :
                    SelectedMenu()
                    
                }
                
            </main>

            <div className="right">
                <div className="top">
                    <button id="menu-btn" onClick={handleOpen}>
                        <span className="material-icons">menu</span>
                    </button>
                    
                    <div className="profile">
                        <div className="theme-toggler" onClick={handleToggle}>
                            <span className="material-icons active">light_mode</span>
                            <span className="material-icons">dark_mode</span>
                        </div>
                        <div className="profile-photo">
                            <img src={Avator} alt="avator" />
                        </div>
                    </div>
                </div>

                <div className="recent-updates">
                    <h2>Recent Updates</h2>
                    <div className="updates">
                        <div className="update">
                            <div className="profile-photo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="message">
                                <small><b>Blessing Shoniwa</b> received her order from Grebles Investments</small>
                                <p style={{fontSize:'10px'}} className="text-muted">2 minutes ago</p>
                            </div>
                        </div>
                   
                        <div className="update">
                            <div className="profile-photo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="message">
                                <small><b>Amon Gutu</b> received her order from Grebles Investments</small>
                                <p style={{fontSize:'10px'}} className="text-muted">3 minutes ago</p>
                            </div>
                        </div>
                    
                        <div className="update">
                            <div className="profile-photo">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className="message">
                                <small><b>Ryan Nash</b> received her order from Grebles Investments</small>
                                <p style={{fontSize:'10px'}} className="text-muted">5 minutes ago</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="sales-analytics">
                    <h2>Sales Analytics</h2>
                    <div className="item online">
                        <div className="profile-photo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="right">
                            <div className="info">
                                <h3>Tithes</h3>
                                <small className="text-muted">Last 24 hours</small>
                            </div>
                            <h5 className="success">+35%</h5>
                            <h3>3849</h3>
                        </div>
                    </div>
                    <div className="item online">
                        <div className="profile-photo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="right">
                            <div className="info">
                                <h3>Ministry</h3>
                                <small className="text-muted">Last 24 hours</small>
                            </div>
                            <h5 className="danger">-17%</h5>
                            <h3>1582</h3>
                        </div>
                    </div>
                    <div className="item online">
                        <div className="profile-photo">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="right">
                            <div className="info">
                                <h3>Offering</h3>
                                <small className="text-muted">Last 24 hours</small>
                            </div>
                            <h5 className="success">+35%</h5>
                            <h3>3849</h3>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}