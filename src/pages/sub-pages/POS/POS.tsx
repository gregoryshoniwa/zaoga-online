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
export const POS = () => {
    const [breadCrumText, setBreadCrumText] = useState("");
    const [showMenu, setShowMenu] = useState(true);

    const handleClick = (data:any) => {
        setBreadCrumText(data)
        setShowMenu(false)
    }
    const handleBack = () => {
        setBreadCrumText("")
        setShowMenu(true)
    }
    return(
        <>
            
            {
                showMenu 
                ?
                <div>
                    <h1>Point Of Sale {`${breadCrumText}`}</h1>
                    <div className="pos-section">
                <div className="pos" onClick={() => handleClick("Transact") }>
                        <div style={{textAlign: 'center'}}>
                            <img src={Transact} alt="Transaction" />
                            <h3>Transact</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Reports")}>
                         <div style={{textAlign: 'center'}}>
                            <img src={Reports} alt="Reports" />
                            <h3>Reports</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Profile")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Profile} alt="Profile" />
                            <h3>Profile</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Administraction")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Admin} alt="Administration" />
                            <h3>Admin</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Member Mamagment")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Members} alt="Members" />
                            <h3>Members</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("Church Office")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Office} alt="Office" />
                            <h3>Office</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Calendar")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Calendar} alt="Calendar" />
                            <h3>Calendar</h3>
                        </div>
                </div>
                <div className="pos" onClick={() => handleClick("My Indox")}>
                        <div style={{textAlign: 'center'}}>
                            <img src={Messaging} alt="Messaging" />
                            <h3>Messaging</h3>
                        </div>
                </div>
                </div>
                </div>
                
                :
            <div style={{display : 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                <h1>{`${breadCrumText}`}</h1>
                <Button onClick={() => handleBack()}>Back</Button>
            </div>
            }
           
                
            <br></br>
            <br></br>
        </>
        
    ) 
}