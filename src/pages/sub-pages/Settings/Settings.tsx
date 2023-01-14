
import { Tabs } from 'antd';

import './Settings.css'
export const Settings = () => {
    const tabs = ['Assemblies','Districts','Provinces','Countries']
    return(
        <>
            <h1>Settings</h1> 
            <Tabs
                defaultActiveKey="1"
                type="card"
                size="large"
                items={tabs.map((data, i) => {
                const id = String(i + 1);
                return {
                    label: data,
                    key: id,
                    children: `Content of card tab ${id}`,
                };
                })}
            />
        </>
       
    )
}