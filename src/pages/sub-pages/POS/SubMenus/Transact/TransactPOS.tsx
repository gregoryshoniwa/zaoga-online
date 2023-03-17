import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader } from "../../../../../components/Loader/Loader";
import transactionService from "../../../../../services/transaction.service";


interface DataType {
    id: number;
    district_product: string;
    district_product_id: string;
    currency_id: string;
    currency: string;
    amount: string
    member_id : string;
    assembly_id : string
    member: string;
    assembly : string
  }
export const TransactPOS = () => {

    const [transaction, setTransaction] = useState([]);
    const [members, setMembers] = useState([
        { value: '1', label: 'Gregory Shoniwa' },
        { value: '2', label: 'Michael Shoniwa' },
        { value: '3', label: 'Isabel Shoniwa' },
        { value: '4', label: 'Brian Shoniwa' },
        { value: '5', label: 'Luke Shoniwa' },
        { value: '6', label: 'Peter Shoniwa' },
        { value: '7', label: 'James Shoniwa' },
        { value: '8', label: 'Ryan Shoniwa' },
        { value: '9', label: 'Blessing Shoniwa' },
        { value: '10', label: 'Raphael Shoniwa' },
        { value: '11', label: 'Kuda Shoniwa' },
        { value: '12', label: 'Constent Shoniwa' },
        { value: '13', label: 'Matthew Shoniwa' },
        { value: '14', label: 'Truth Shoniwa' },
        { value: '15', label: 'Mark Shoniwa' },
        { value: '16', label: 'John Shoniwa' },
    ]);
    const [selectedMember, setSelectedMember] = useState("1");
    const [openTransaction, setOpenTransaction] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    const [currency, setCurrency] = useState("1");
    const [amount, setAmount] = useState("");
    const [districtProducts, setDistrictProducts] = useState(
        [
            { value: '1', label: 'Tithes' },
            { value: '2', label: 'Offerings' },
            { value: '3', label: 'Ministry' },
            { value: '4', label: 'Talents' },
            
        ]
    );
    const [selectedProduct, setSelectedProduct] = useState("1");
    const { user } = useSelector((state: any) => state.auth);

    const handleEditTransaction = (data:any) => {}
    const handleDeleteTransaction = (data:any) => {}

    const addTransaction = () => {
      setLoading(true);
      setLoadingText("Adding New Transaction ...");
      const d = new Date();

      const postData = {
        name: "addDistrictTransaction",
        param: {
          user_id: user.id,
          assembly_id : user.assembly_id,
          member_id: selectedMember,
          district_product_id: selectedProduct,
          currency : currency,
          amount : amount,
          form_id : `${d.getMonth()+1}-${d.getFullYear()}_${user.id}_${user.assembly_id}`
        },
      };

    transactionService.addTransaction(postData).then(
      () => {
        
        Swal.fire({
          title: "Adding New Transaction",
          text: "You have successfully created a new transaction.",
          icon: "success",
        });
        setLoading(false);
        setOpenTransaction(false)
        setAmount("")
        setSelectedProduct("");
        setSelectedMember("");
        setCurrency("");
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
          title: "Adding New Transaction",
          text: "Sorry there was an error creating a new transaction.",
          icon: "error",
        });
        setLoading(false);
      }
    );
    }
    const openTransactionForm = () => {
        setOpenTransaction(true);
    }
    const columns: ColumnsType<DataType> = [
        
        {
          title: "Item",
          dataIndex: "district_product",
          key: "district_product",
          width: "25%",
         
        },
        {
          title: "Currency",
          dataIndex: "currency",
          key: "currency"
          
        },
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
    
        },
        {
          title: "Member",
          dataIndex: "member",
          key: "member",
    
        },
        {
          title: "Assembly",
          dataIndex: "assembly_name",
          key: "assembly_name",
    
          
        },
        {
          title: "Actions",
          dataIndex: "active",
          key: "active",
          width: "20%",
          render: (record) => (
            <Space size="middle">
              
              <Tooltip title="edit">
                <Button
                  onClick={() => handleEditTransaction(record)}
                  shape="circle"
                  icon={
                    <EditOutlined style={{ fontSize: "12px", color: "#08c" }} />
                  }
                />
              </Tooltip>
              <Tooltip title="edit">
                <Button
                  onClick={() => handleDeleteTransaction(record)}
                  shape="circle"
                  icon={
                    <DeleteOutlined style={{ fontSize: "12px", color: "#08c" }} />
                  }
                />
              </Tooltip>
    
              
            </Space>
          ),
        },
      ];
    
    return(
        <>
        <Loader text="Processing transaction data....." loading={loading} />
        <Modal
                title="Add Tranction Form"
                centered
                open={openTransaction}
                onOk={() => addTransaction()}
                onCancel={() => setOpenTransaction(false)}
                width={500}
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ display: "flex" }}
                >
                 <Select
                    defaultValue="1"
                    showSearch
                    value={selectedProduct}
                    style={{ width: '100%' }}
                    onChange={(value1) => setSelectedProduct(value1)}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={districtProducts}
                    />

                    <Select
                    defaultValue="1"
                    value={currency}
                    style={{ width: '100%' }}
                    onChange={(value2) => setCurrency(value2)}
                    options={[
                        { value: '1', label: 'ZWL' },
                        { value: '2', label: 'USD' },
                        
                    ]}
                    />
                    <Select
                  
                    showSearch
                    style={{ width: '100%' }}
                    value={selectedMember}
                    onChange={(value3) => setSelectedMember(value3)}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={members}
                    />
                    
                    
                    <Input placeholder={"Amount"} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                  
                    
                </Space>
              </Modal>

            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
                <div>
                <Tooltip placement="bottom" title="Add New Transaction">
                    <Button style={{ margin: "10px"}} onClick={() => openTransactionForm()}>Add</Button>
                </Tooltip>
                <Tooltip placement="bottom" title="Submit transaction to office">
                    <Button>Submit</Button>
                </Tooltip>
                    
                    
                </div>
              
              <Table rowKey={record => record.id} columns={columns} dataSource={transaction}  />
            </Space>
        </>
        
    )
}