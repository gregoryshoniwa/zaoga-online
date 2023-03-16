import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Loader } from "../../../../../components/Loader/Loader";


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
    ]);
    const [selectedMember, setSelectedMember] = useState("1");
    const [openTransaction, setOpenTransaction] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleEditTransaction = (data:any) => {}
    const handleDeleteTransaction = (data:any) => {}
    const addTransaction = () => {}
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
                    
                    style={{ width: '100%' }}
                    onChange={(value1) => setSelectedProduct(value1)}
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
                    defaultValue="1"
                    
                    style={{ width: '100%' }}
                    onChange={(value3) => setSelectedMember(value3)}
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