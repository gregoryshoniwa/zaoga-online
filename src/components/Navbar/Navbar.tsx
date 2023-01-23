/* eslint-disable jsx-a11y/anchor-is-valid */
import './Navbar.css';
import Logo from '../../assets/logo2.png';
import Avator from '../../assets/avator.jpg';
import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';


import { logout } from "../../slices/auth";
import { setTheme } from '../../slices/theme';
import { LocalHome } from '../../pages/sub-pages/LocalHome/LocalHome';


enum Menus{
    Dashboard,
    LocalHome,
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
    // const [themeState, setThemeState] = useState('light');

    const { themeState } = useSelector((state:any) => state.theme);
    const { user } = useSelector((state:any) => state.auth);
    
    var NavBarList = [
        {
            authorizations: ['4','5'],
            id:0,
            status: 'active',
            icon: 'dashboard',
            title: 'Dashboard'
        },
        {
            authorizations: ['2','3'],
            id:1,
            status: 'active',
            icon: 'dashboard',
            title: 'Dashboard'
        },
        {
            authorizations: ['1','5'],
            id:2,
            status: '',
            icon: 'receipt_long',
            title: 'Point of Sale'
        },
        {
            authorizations: ['2','3','5'],
            id:3,
            status: '',
            icon: 'mail',
            title: 'Messages'
        },
        {
            authorizations: ['4','5'],
            id:4,
            status: '',
            icon: 'insights',
            title: 'Reports'
        },
        {
            authorizations: ['5'],
            id:5,
            status: '',
            icon: 'person',
            title: 'User Admin'
        },
        {
            authorizations: ['2','3','4','5'],
            id:6,
            status: '',
            icon: 'duo',
            title: 'Meeting-Chat'
        },
        {
            authorizations: ['2','3','4','5'],
            id:7,
            status: '',
            icon: 'calendar_month',
            title: 'Calendar'
        },
        {
            authorizations: ['5'],
            id:8,
            status: '',
            icon: 'settings',
            title: 'Settings'
        },
        
    ]
    

    useEffect(() => {
        user.authorizations.forEach((e: any) => {
            if(e === '1'){
                setMenu(2)
            }
            if(e === '2' || e === '3'){
                setMenu(1)
            }
            if(e === '4' || e === '5'){
                setMenu(0)
            }
        });
      }, [user.authorizations]);

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
          dispatch(setTheme('dark'));
        }
        if(themeState === 'dark'){
          dispatch(setTheme('light'));
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
            case Menus.LocalHome:
                    return <LocalHome />
                
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
                    NavBarList.filter((item:any) => {
                        var filtered = [];
                        for(var arr in item.authorizations){
                            for(var filter in user.authorizations){
                                if(item.authorizations[arr] === user.authorizations[filter]){
                                    filtered.push(item.authorizations[arr].userid);
                                }
                            }
                        }
                        if(filtered.length > 0){
                            return true;
                        }else{
                            return false;
                        }
                    }).map((item,i) => 
                            
                            <a key={item.id} id={`${item.id}`} href="#" className={item.status} onClick={() => handleClick(item.id)}>
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