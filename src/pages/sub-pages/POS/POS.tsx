import './POS.css'
import Transact from '../../../assets/refund.png';
import Reports from '../../../assets/bill.png';
import Members from '../../../assets/groups.png';
import Profile from '../../../assets/customer.png';
import Admin from '../../../assets/work.png';
import Office from '../../../assets/business.png';
import Messaging from '../../../assets/messaging.png';
import Calendar from '../../../assets/calendar.png';
import { useState } from 'react';
import { Button } from 'antd';
import { TransactPOS } from './SubMenus/Transact/TransactPOS';
import { ReportsPOS } from './SubMenus/Reports/ReportsPOS';
import { ProfilePOS } from './SubMenus/Profile/ProfilePOS';
import { AdminPOS } from './SubMenus/Admin/AdminPOS';
import { MembersPOS } from './SubMenus/Members/MembersPOS';
import { OfficePOS } from './SubMenus/Office/OfficePOS';
import { CalendarPOS } from './SubMenus/Calender/CalendarPOS';
export const POS = () => {

    enum Menus{
        Transact,
        Reports,
        Profile,
        Admin,
        Members,
        Office,
        MeetingChats,
        Calendar,
        Blank
        
    }

    const [breadCrumText, setBreadCrumText] = useState("");
    const [showMenu, setShowMenu] = useState(true);
    const [menu, setMenu] = useState(Menus.Blank);

    const handleClick = (data:any,menuItem:number) => {
        setBreadCrumText(data)
        setMenu(menuItem)
        setShowMenu(false)
    }
    const handleBack = () => {
        setBreadCrumText("")
        setShowMenu(true)
    }

   

    const SelectedMenu = () =>{
        switch (menu) {
            case Menus.Transact:
                    return <TransactPOS/>
            case Menus.Reports:
                    return <ReportsPOS/>
                
            case Menus.Profile:
                    return <ProfilePOS />

            case Menus.Admin:
                    return <AdminPOS />
                    
            case Menus.Members:
                    return <MembersPOS />

            case Menus.Office:
                    return <OfficePOS />

            case Menus.MeetingChats:
                    return <MembersPOS />

            case Menus.Calendar:
                    return <CalendarPOS />
          
            default:
                break;
        }
    }
    return(
        <>
            
            {
                showMenu 
                ?
                <div>
                    <h1>Point Of Sale {`${breadCrumText}`}</h1>
                    <div className="pos-section">
                <div className="pos" onClick={() => handleClick("Transact",Menus.Transact) }>
                        <div style={{textAlign: 'center'}}>
                            <img src={Transact} alt="Transaction" />
                            <h3>Transact</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Reports",Menus.Reports)}>
                         <div style={{textAlign: 'center'}}>
                            <img src={Reports} alt="Reports" />
                            <h3>Reports</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Profile",Menus.Profile)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Profile} alt="Profile" />
                            <h3>Profile</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Administraction",Menus.Admin)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Admin} alt="Administration" />
                            <h3>Admin</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Member Mamagment",Menus.Members)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Members} alt="Members" />
                            <h3>Members</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Church Office",Menus.Office)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Office} alt="Office" />
                            <h3>Office</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Calendar",Menus.Calendar)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Calendar} alt="Calendar" />
                            <h3>Calendar</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Indox",Menus.Members)}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Messaging} alt="Messaging" />
                            <h3>Messaging</h3>
                        </div>
                </div>
                </div>
                </div>
                
                :
            <div>
                <div style={{display : 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <h1>{`${breadCrumText}`}</h1>
                    <Button onClick={() => handleBack()}>Back</Button>
                </div>
                {SelectedMenu()}
            </div>
            
            }
           
                
            <br></br>
            <br></br>
        </>
        
    ) 
}