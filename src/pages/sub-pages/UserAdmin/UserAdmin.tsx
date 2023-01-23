import "./UserAdmin.css";

import { Button, Input, Modal, Select, Space } from "antd";
import { Tabs } from "antd";
import { UsersTab } from "./UsersTab/UsersTab";
import { MembersTab } from "./MembersTab/MembersTab";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import userService from "../../../services/user.service";
import Swal from "sweetalert2";
import { Loader } from "../../../components/Loader/Loader";
import memberService from "../../../services/member.service";
import type { SelectProps } from 'antd';
import authorizationsService from "../../../services/authorizations.service";


const tabs = ["Users", "Members", "Pastors"];
export const UserAdmin = () => {
  const [openUsers, setOpenUsers] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [loadUsers, setLoadUsers] = useState(false);
  const [loadMembers, setLoadMembers] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender_m, setGender_M] = useState("1");
  const [gender_u, setGender_U] = useState("1");
  const [nationaId, setNationalId] = useState("");
  const [position, setPosition] = useState("1");
  const [authorizations, setAuthorizations] = useState<string[]>(['1']);

  const [userName, setUserName] = useState("");

  const [options, setOptions] = useState<SelectProps['options']>([]);

  enum tabsItems {
    Starter,
    Users,
    Members,
    Pastors,
  }

  const saveUser = () => {
    setLoading(true);
    setLoadingText("Adding New User ...");
    const postData = {
      name: "addUser",
      param: {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        gender: gender_u,
        authorizations:JSON.stringify(authorizations),
        password: "123456789",
        created_by: user.id,
      },
    };
    userService.addUser(postData).then(
      () => {
        setLoading(false);
        setOpenUsers(false);
        setLoadUsers((a) => !a);
        setFirstName("");
        setLastName("");
        setUserName("");
        setGender_U("1")
        setAuthorizations(['1'])
        Swal.fire({
          title: "Adding New User",
          text: "You have successfully created a new user with the default password.",
          icon: "success",
        });
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(`Error: ${_content}`);
        Swal.fire({
          title: "Adding New User",
          text: "Sorry there was an error creating a new user.",
          icon: "error",
        });
        setLoading(false);
      }
    );
  };

  const saveMember = () => {
    setLoading(true);
    setLoadingText("Adding New Member ...");
    const postData = {
      name: "addMember",
      param: {
        firstName: firstName,
        lastName: lastName,
        gender: gender_m,
        national_id:nationaId,
        position_id:position,
        assembly_id : "1",
        created_by: user.id,
      },
    };
    memberService.addMember(postData).then(
      () => {
        setLoading(false);
        setOpenMembers(false);
        setLoadMembers((a) => !a);
        setFirstName("");
        setLastName("");
        setNationalId("");
        setGender_M("1");
        setPosition("1");
        Swal.fire({
          title: "Adding New Member",
          text: "You have successfully created a new member with the default district.",
          icon: "success",
        });
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(`Error: ${_content}`);
        Swal.fire({
          title: "Adding New Member",
          text: "Sorry there was an error creating a new member.",
          icon: "error",
        });
        setLoading(false);
      }
    );
  };

  const getUserTypes = useCallback(async () => {
    await setLoading(true);

    authorizationsService.getAllUserTypes({ name: "getAllUserTypesPaged", param: {page: '1'} }).then(
      (user_types) => {
        setOptions(user_types.data.response.result.user_types);
        
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(`Error: ${_content}`);
        setLoading(false);
      }
    );
   
  }, []);

  useEffect(() => {
    
    getUserTypes();
  }, [getUserTypes]);

  
  const handleChange = (value: string[]) => {
    setAuthorizations(value);
    
  };

  const SelectedTab = (id: any) => {
   
    switch (id) {
      case tabsItems.Users.toString():
        return (
          <>
            <Modal
              title="Add New User Form"
              centered
              open={openUsers}
              onOk={() => saveUser()}
              onCancel={() => setOpenUsers(false)}
              width={500}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Input
                  placeholder={"First Name"}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder={"Last Name"}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                  placeholder={"User Name"}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Select
                    defaultValue="1"
                    value={gender_u}
                    style={{ width: '100%' }}
                    onChange={(value1) => setGender_U(value1)}
                    options={[
                        { value: '1', label: 'Male' },
                        { value: '2', label: 'Female' }  
                    ]}
                    />
                <Select
                      mode="multiple"
                      allowClear
                      value={authorizations}
                      style={{ width: '100%' }}
                      placeholder="Please select"
                      onChange={handleChange}
                      options={options}
                    />
              </Space>
            </Modal>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Button onClick={() => setOpenUsers(true)}>Add User</Button>
              <UsersTab loader={loadUsers} />
            </Space>
          </>
        );
      case tabsItems.Members.toString():
        return (
          <>
             <Modal
                title="Add New Member Form"
                centered
                open={openMembers}
                onOk={() => saveMember()}
                onCancel={() => setOpenMembers(false)}
                width={500}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                  <Input placeholder={"First Name"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <Input placeholder={"Last Name"} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                  <Input placeholder={"Nationa Id"} value={nationaId} onChange={(e) => setNationalId(e.target.value)}/>
                  <Select
                    defaultValue="1"
                    style={{ width: '100%' }}
                    onChange={(value1) => setGender_M(value1)}
                    options={[
                        { value: '1', label: 'Male' },
                        { value: '2', label: 'Female' }  
                    ]}
                    />
                    <Select
                    defaultValue="1"
                    style={{ width: '100%' }}
                    onChange={(value2) => setPosition(value2)}
                    options={[
                        { value: '1', label: 'Member' },
                        { value: '2', label: 'Deacon' },
                        { value: '3', label: 'Elder' },
                        { value: '4', label: 'Pastor'}
                    ]}
                    />
                     
                </Space>
              </Modal>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Button onClick={() => setOpenMembers(true)}>Member User</Button>
              <MembersTab loader={loadMembers} />
            </Space>
          </>
        );

      default:
        break;
    }
  };

  return (
    <>
      <Loader text={loadingText} loading={loading} />
      <h1>User Administration</h1>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size="large"
        onChange={(key) => SelectedTab(key)}
        items={tabs.map((tab_data, i) => {
          const id = String(i + 1);
          return {
            label: tab_data,
            key: id,
            children: <div>{SelectedTab(id)}</div>,
          };
        })}
      />
    </>
  );
};
