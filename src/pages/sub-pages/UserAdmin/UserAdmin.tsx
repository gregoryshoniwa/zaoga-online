import './UserAdmin.css'

import { Button, Space } from 'antd';
import { Tabs } from 'antd';
import { UsersTab } from './UsersTab/UsersTab';

  
 
const tabs = ['Users','Members','Pastors']
export const UserAdmin = () => {

      enum tabsItems{
        Starter,
        Users,
        Members,
        Pastors
      }
      
      const SelectedTab = (id:any) =>{
        
        switch (id) {
            case tabsItems.Users.toString():
                    return (
                      <>
                      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Button>Add User</Button>
                        <UsersTab />
                      </Space>
                      </>
                    
                    )
                
            default:
                break;
        }
      }
      
    
      return (
        <>
        
          <h1>User Administration</h1>
          <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={tabs.map((tab_data, i) => {
                const id = String(i + 1);
                return {
                    label: tab_data,
                    key: id,
                    children: <div>
                      {
                       SelectedTab(id)
                      }
                        
                    </div>,
                };
                })}
            />
          
        </>
      
      );
}