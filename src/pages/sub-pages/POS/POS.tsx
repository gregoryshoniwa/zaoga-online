import './POS.css'
import Transact from '../../../assets/refund.png';
import Reports from '../../../assets/bill.png';
import Members from '../../../assets/groups.png';
import Profile from '../../../assets/customer.png';
import Admin from '../../../assets/work.png';
import Office from '../../../assets/business.png';
import Messaging from '../../../assets/messaging.png';
import Calendar from '../../../assets/calendar.png';
export const POS = () => {
    return(
        <>
            <h1>Point Of Sale</h1>
            <div className="pos-section">
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Transact} alt="Transaction" />
                            <h3>Transact</h3>
                        </div>
                </div>
                <div className="pos">
                         <div style={{textAlign: 'center'}}>
                            <img src={Reports} alt="Reports" />
                            <h3>Reports</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Profile} alt="Profile" />
                            <h3>Profile</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Admin} alt="Administration" />
                            <h3>Admin</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Members} alt="Members" />
                            <h3>Members</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Office} alt="Office" />
                            <h3>Office</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Calendar} alt="Calendar" />
                            <h3>Calendar</h3>
                        </div>
                </div>
                <div className="pos">
                        <div style={{textAlign: 'center'}}>
                            <img src={Messaging} alt="Messaging" />
                            <h3>Messaging</h3>
                        </div>
                </div>
            </div>
                
            <br></br>
            <br></br>
        </>
        
    ) 
}