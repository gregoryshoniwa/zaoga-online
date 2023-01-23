import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
  import { Button, Input, InputRef, Modal, Select, Space, Table, Tooltip } from "antd";
  import { ColumnType } from "antd/es/table";
  import { ColumnsType, FilterConfirmProps } from "antd/es/table/interface";
  import { useCallback, useEffect, useRef, useState } from "react";
  import Highlighter from "react-highlight-words";
  import Swal from "sweetalert2";
  import { Loader } from "../../../../components/Loader/Loader";
  import { useSelector } from "react-redux";
  
  import memberService from "../../../../services/member.service";

  

  
  interface DataType {
    id: number;
    firstName: string;
    lastName: string;
    gender_code: string;
    position: string
    assembly_name : string;
    national_id : string;
    active : string;
    created_by : string;
  }
  
  
  type DataIndex = keyof DataType;
  export const MembersTab = ({ loader } : any) => {
    const [members, setMembers] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [selectedPage, setSelectedPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    const searchInput = useRef<InputRef>(null);
    const { user } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);
  
    const getMembers = useCallback(async () => {
      await setLoading(true);
  
      memberService.getAllMembers({ name: "getAllMembersPaged", param: {page: selectedPage} }).then(
        (members) => {
          setMembers(members.data.response.result.members);
          setTotalPages(members.data.response.result.totalPages * 7)
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
     
    }, [selectedPage]);
  
    useEffect(() => {
      getMembers();
    }, [getMembers,loader,selectedPage]);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: (param?: FilterConfirmProps) => void,
      dataIndex: DataIndex
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleMemberStatus = async (id: any, status: any) => {
      setLoading(true);
  
      let active = "0";
      if (status === "1") {
        active = "0";
      }
      if (status === "0") {
        active = "1";
      }
  
        const postData = {
          name: "updateMemberStatus",
          param: {
            memberId: id,
            active: active,
            updated_by: user.id,
          },
        };
        memberService.updateMemberStatus(postData).then(
          () => {
            getMembers();
            setLoading(false);
            Swal.fire({
              title: "Status Update",
              text: "You have successfully updated the selected member' status.",
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
        width: "25%",
        ...getColumnSearchProps("firstName"),
  
        sorter: (a, b) => a.firstName.length - b.firstName.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        width: "25%",
        ...getColumnSearchProps("lastName"),
  
        sorter: (a, b) => a.lastName.length - b.lastName.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "G",
        dataIndex: "gender_code",
        key: "gender_code",
  
        ...getColumnSearchProps("gender_code"),
  
        sorter: (a, b) => a.gender_code.length - b.gender_code.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Id",
        dataIndex: "national_id",
        key: "national_id",
  
      },
      {
        title: "Assembly",
        dataIndex: "assembly_name",
        key: "assembly_name",
  
        ...getColumnSearchProps("assembly_name"),
  
        sorter: (a, b) => a.assembly_name.length - b.assembly_name.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Post",
        dataIndex: "position",
        key: "position",
  
        ...getColumnSearchProps("position"),
  
        sorter: (a, b) => a.position.length - b.position.length,
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
                  onClick={() => handleMemberStatus(record.id, record.active)}
                  shape="circle"
                  icon={
                    <CheckOutlined style={{ fontSize: "12px", color: "green" }} />
                  }
                />
              </Tooltip>
            ) : (
              <Tooltip title="de-activate">
                <Button
                  onClick={() => handleMemberStatus(record.id, record.active)}
                  shape="circle"
                  icon={
                    <CloseOutlined style={{ fontSize: "12px", color: "red" }} />
                  }
                />
              </Tooltip>
            )}
            <Tooltip title="edit">
              <Button
                onClick={() => handleUpdateMember(record)}
                shape="circle"
                icon={
                  <EditOutlined style={{ fontSize: "12px", color: "#08c" }} />
                }
              />
            </Tooltip>
  
            
          </Space>
        ),
      },
    ];
  
    const [openMembers, setOpenMembers] = useState(false);
    const [selectedMember, setSelectedMember] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("1");
    const [nationaId, setNationalId] = useState("");
    const [position, setPosition] = useState("");
  
    const handleUpdateMember = (data: any) =>{
      console.log(data);
        setSelectedMember(data.id)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setGender(data.gender)
        setNationalId(data.national_id)
        setPosition(data.position_id)
        setOpenMembers(true);
    }
  
    const updateMember = () => {
      setLoading(true);
      const postData = {
        name: "updateMember",
        param: {
          memberId : selectedMember,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          national_id:nationaId,
          position_id:position,
          updated_by: user.id,
        },
      };
      memberService.updateMember(postData).then(
        () => {
          setLoading(false);
          setOpenMembers(false);
          getMembers();
          Swal.fire({
            title: "Updating Member",
            text: "You have successfully updated the selected member data.",
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
              title: "Updating Member",
              text: "Sorry there was an error updating member data.",
              icon: "error",
            });
            setLoading(false);
        }
      );
    };

    
  
  
    return (
      <>
        <Loader text="Processing member data....." loading={loading} />
        <Modal
                title="Update Member Form"
                centered
                open={openMembers}
                onOk={() => updateMember()}
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
                    value={gender}
                    style={{ width: '100%' }}
                    onChange={(value1) => setGender(value1)}
                    options={[
                        { value: '1', label: 'Male' },
                        { value: '2', label: 'Female' },
                        
                    ]}
                    />
                    <Select
                    defaultValue="1"
                    value={position}
                    style={{ width: '100%' }}
                    onChange={(value2) => setPosition(value2)}
                    options={[
                        { value: '1', label: 'Member' },
                        { value: '2', label: 'Deacon' },
                        { value: '3', label: 'Elder' },
                        { value: '4', label: 'Pastor'},
                    ]}
                    />
                    
                </Space>
              </Modal>
        <Table rowKey={record => record.id} columns={columns} dataSource={members} pagination={{pageSize:7,total:totalPages,onChange:(page) =>{setSelectedPage(page)}}}  />
      </>
    );
  };
  