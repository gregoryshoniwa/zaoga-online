import './UserAdmin.css'

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { InputRef, Tooltip } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import Swal from 'sweetalert2';
import { Tabs } from 'antd';
import { UserContext } from '../../../contexts/UserContext';
import { Loader } from '../../../components/Loader/Loader';

interface DataType {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    active: number;
  }
  
  type DataIndex = keyof DataType;
  
 
const tabs = ['Users','Members','Pastors']
export const UserAdmin = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState<DataType[]>([]);
    const userContext = useContext(UserContext)

    const getUsers = useCallback(async () => {
      setLoading(true)
      const postData = {
        name: "getAllUsers",
        param: {
         
        }
      };
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", userContext?.user?.token || " ");
        myHeaders.append("Content-Type", "application/json");
        const res = await fetch(`http://zaoga-online.co.zw/api/`, {
            method: "post",
            headers: myHeaders,
            body: JSON.stringify(postData),
          }); 
          const data = await res.json();
          await setUsers(data.response.result);
          setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }, [userContext?.user?.token])

    useEffect(() => {
      
     
      getUsers()
        
      
      
    },[getUsers]);

    

    const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleUserStatus = async (id:any,status:any) => {
      setLoading(true)
      let active = '0';
      if(status === '1'){
        active = '0';
      }
      if(status === '0'){
        active = '1';
      }

      if(id === userContext?.user?.id){
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Sorry but you can not de-activate your own account.',
          icon: 'error'
        })
      }else{
        const postData = {
          "name": "updateStatus",
          "param": {
              "userId" : id,
              "active": active,
              "updated_by" : userContext?.user?.id
              
          }
        };
        try {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", userContext?.user?.token || " ");
          myHeaders.append("Content-Type", "application/json");
          const res = await fetch(`http://zaoga-online.co.zw/api/`, {
              method: "post",
              headers: myHeaders,
              body: JSON.stringify(postData),
            }); 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const data = await res.json();
            // console.log(data);
            await getUsers();
           
        } catch (error) {
          
          console.log(error);
        }
      }

    }
  
    
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              
              
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                close
              </Button>
            </Space>
          </div>
        ),
        
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const columns: ColumnsType<DataType> = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          ...getColumnSearchProps('id'),
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
          width: '20%',
          ...getColumnSearchProps('firstName'),
          
          sorter: (a, b) => a.firstName.length - b.firstName.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
          width: '20%',
          ...getColumnSearchProps('lastName'),
          
          sorter: (a, b) => a.lastName.length - b.lastName.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'User Name',
          dataIndex: 'username',
          key: 'username',
          
          ...getColumnSearchProps('username'),
          
          sorter: (a, b) => a.username.length - b.username.length,
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'Actions',
          dataIndex: 'active',
          key: 'active',
          width: '20%',
          render: (active,record) => (
            <Space size="middle">
              {
                active === '0'
                ?
                <Tooltip title="activate">
                  <Button onClick={() => handleUserStatus(record.id,record.active)} shape="circle" icon={<CheckOutlined style={{ fontSize: '12px', color: 'green' }}/>} />
                </Tooltip>
                :
                <Tooltip title="de-activate">
                  <Button onClick={() => handleUserStatus(record.id,record.active)} shape="circle" icon={<CloseOutlined style={{ fontSize: '12px', color: 'red' }}/>} />
                </Tooltip>
              }
              <Tooltip title="edit">
                <Button shape="circle" icon={<EditOutlined style={{ fontSize: '12px', color: '#08c' }} />} />
              </Tooltip>
              <Tooltip title="delete">
                <Button shape="circle" icon={<DeleteOutlined  style={{ fontSize: '12px', color: 'red' }} />} />
              </Tooltip>
            </Space>
          ),
        },
      ];

      
      enum tabsItems{
        Starter,
        Users,
        Members,
        Pastors
      }
      
      const SelectedTab = (id:any) =>{
        
        switch (id) {
            case tabsItems.Users.toString():
                    return <Table columns={columns} dataSource={users} />
                
            default:
                break;
        }
      }
      
    
      return (
        <>
        {loading && <Loader text='Loading user data.....' />}
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