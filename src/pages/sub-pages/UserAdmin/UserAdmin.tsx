import "./UserAdmin.css";

import { Button, Input, Modal, Space } from "antd";
import { Tabs } from "antd";
import { UsersTab } from "./UsersTab/UsersTab";
import { useState } from "react";
import { useSelector } from "react-redux";

import userService from "../../../services/user.service";
import Swal from "sweetalert2";
import { Loader } from "../../../components/Loader/Loader";

const tabs = ["Users", "Members", "Pastors"];
export const UserAdmin = () => {
  const [openUsers, setOpenUsers] = useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);
  const [loadUsers, setLoadUsers] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

 

  enum tabsItems {
    Starter,
    Users,
    Members,
    Pastors,
  }

  const saveUser = () => {
    setLoading(true);
    setLoadingText("Adding New User ...")
    const postData = {
      name: "addUser",
      param: {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: "123456789",
        created_by: user.id,
      },
    };
    userService.addUser(postData).then(
      () => {
        setLoading(false);
        setOpenUsers(false);
        setLoadUsers(a => !a)
        setFirstName("")
        setLastName("")
        setUserName("")
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
                <Input placeholder={"First Name"} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input placeholder={"Last Name"} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <Input placeholder={"User Name"} value={userName} onChange={(e) => setUserName(e.target.value)}/>
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
