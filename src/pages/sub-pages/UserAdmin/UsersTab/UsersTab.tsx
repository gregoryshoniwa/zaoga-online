import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  KeyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, InputRef, Space, Table, Tooltip } from "antd";
import { ColumnType } from "antd/es/table";
import { ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
import { useCallback, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";
import { Loader } from "../../../../components/Loader/Loader";
import { useSelector } from "react-redux";

import userService from "../../../../services/user.service";

interface DataType {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  active: number;
}

type DataIndex = keyof DataType;
export const UsersTab = () => {
  const [users, setUsers] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const { user } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    await setLoading(true);

    userService.getAllUsers({ name: "getAllUsers", param: {} }).then(
      (users) => {
        setUsers(users.data.response.result);
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
    getUsers();
  }, [getUsers]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleUserStatus = async (id: any, status: any) => {
    setLoading(true);

    let active = "0";
    if (status === "1") {
      active = "0";
    }
    if (status === "0") {
      active = "1";
    }

    if (id === user.id) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: "Sorry but you can not de-activate your own account.",
        icon: "error",
      });
    } else {
      const postData = {
        name: "updateStatus",
        param: {
          userId: id,
          active: active,
          updated_by: user.id,
        },
      };
      userService.updateStatus(postData).then(
        () => {
          getUsers();
          setLoading(false);
          Swal.fire({
            title: "Status Update",
            text: "You have successfully updated the selected user' status.",
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
          setLoading(false);
        }
      );
    }
  };

  const handleRestPassword = async (id: any) => {
    
    setLoading(true);
    const postData = {
      name: "restPassword",
      param: {
        userId: id,
        updated_by: user.id,
      },
    };
    userService.updateStatus(postData).then(
      () => {
        getUsers();
        setLoading(false);
        Swal.fire({
          title: "Password Rest",
          text: "You have successfully rest user password.",
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
        setLoading(false);
      }
    );
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",
      ...getColumnSearchProps("firstName"),

      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      ...getColumnSearchProps("lastName"),

      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",

      ...getColumnSearchProps("username"),

      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      dataIndex: "active",
      key: "active",
      width: "20%",
      render: (active, record) => (
        <Space size="middle">
          {active === "0" ? (
            <Tooltip title="activate">
              <Button
                onClick={() => handleUserStatus(record.id, record.active)}
                shape="circle"
                icon={
                  <CheckOutlined style={{ fontSize: "12px", color: "green" }} />
                }
              />
            </Tooltip>
          ) : (
            <Tooltip title="de-activate">
              <Button
                onClick={() => handleUserStatus(record.id, record.active)}
                shape="circle"
                icon={
                  <CloseOutlined style={{ fontSize: "12px", color: "red" }} />
                }
              />
            </Tooltip>
          )}
          <Tooltip title="edit">
            <Button
              shape="circle"
              icon={
                <EditOutlined style={{ fontSize: "12px", color: "#08c" }} />
              }
            />
          </Tooltip>

          <Tooltip title="rest password">
            <Button
              onClick={() => handleRestPassword(record.id)}
              shape="circle"
              icon={<KeyOutlined style={{ fontSize: "12px", color: "blue" }} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Loader text="Processing user data....." loading={loading} />
      <Table columns={columns} dataSource={users} />
    </>
  );
};
