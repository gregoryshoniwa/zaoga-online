
import { Button, Input, Modal, Select, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader } from "../../../../../components/Loader/Loader";
import transactionService from "../../../../../services/transaction.service";
import "./TransactPOS.scss"
import Logo from '../../../../../assets/logo.png';
import ReactToPrint from "react-to-print";


interface DataType {
    id: number;
    district_product: string;
    form_id: string;
    currency: string;
    amount: string
    member : string;
    assembly : string
    
  }
export const TransactPOS = () => {

    const [transaction, setTransaction] = useState<DataType[]>([]);
    const [open, setOpen] = useState(false);

    
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

    
    const addTransaction = () => {
      setLoading(true);
      
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
        
        
        setLoading(false);
        setOpenTransaction(false)
        setAmount("")
        setSelectedProduct("");
        setSelectedMember("");
        setCurrency("");
        getTransactions();
        showModal()
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

    const getTransactions = useCallback(async () => {
      await setLoading(true);
      const d = new Date();

      transactionService.getAllTractionsByFormId({ name: "getAllDistrictTransactionsByFormId", param: {form_id: `${d.getMonth()+1}-${d.getFullYear()}_${user.id}_${user.assembly_id}`} }).then(
        (form) => {
          setTransaction(form.data.response.result);
          
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
     
    }, [user.assembly_id, user.id]);

    useEffect(() => {
      getTransactions();
      
    }, [getTransactions]);
  
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
          responsive: ["sm"]
        },
        {
          title: "Assembly",
          dataIndex: "assembly",
          key: "assembly",
          responsive: ["sm"]
          
        }
      ];

      const showModal = () => {
        setOpen(true);
      };
    
      
    
      const handleCancel = () => {
        setOpen(false);
        Swal.fire({
          title: "Adding New Transaction",
          text: "You have successfully created a new transaction.",
          icon: "success",
        });
      };

    const componentRef = useRef<HTMLInputElement | null>(null);;

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

        <Modal
            open={open}
            onOk={handleCancel}
            onCancel={handleCancel}
            footer={[
                
              ]}
            >

            <ReactToPrint
              trigger={() => <Button key="back">Print Member Recepts</Button>}
              content={() => componentRef.current}
              onAfterPrint={handleCancel}
            />
             
             <div ref={componentRef} >

                  <br />
                <div id="invoice-POS">

                      <center id="top">
                        <img width="50" alt="zaoga-logo" src={Logo}/>
                        <div className="info"> 
                          <h2>Member Recept : #10001</h2>
                        </div>
                      </center>


                      <div id="mid">
                        <div className="info">
                          <h2>Contact Info</h2>
                          <p> 
                            Address : 13A Pawell Road, Park town<br />
                            Email   : info@fifmi.org<br />
                            Phone   : +263 8677 004035<br />
                          </p>
                        </div>
                      </div>

                      <div id="mid">
                        <div className="info">
                          <h2>Member Info</h2>
                          <p> 
                            Full Name : Gregory Shoniwa<br />
                            Position : Elder<br />
                            District : Ezekiel Centre<br />
                          </p>
                        </div>
                      </div>


                      <div id="bot">

                          <div id="table">
                            <table>
                            <tbody>
                                <tr className="tabletitle">
                                  <td className="item"><h2>Item</h2></td>
                                  <td className="Hours"><h2></h2></td>
                                  <td className="Rate"><h2>Amount</h2></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Communication</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Asset Gathering</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$225.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Design Development</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Animation</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$1500.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Animation Revisions</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$750.00</p></td>
                                </tr>


                                

                                <tr className="tabletitle">
                                  <td></td>
                                  <td className="Rate"><h2>Total</h2></td>
                                  <td className="payment"><h2>$3,644.25</h2></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div id="legalcopy">
                            <p className="legal"><strong>Thank you and may the God of our father truly bless you!</strong> 
                            </p>
                          </div>

                      </div>


                </div>
                  <br />
                <div id="invoice-POS">

                      <center id="top">
                        <img width="250" alt="zaoga-logo" src={Logo}/>
                        <div className="info"> 
                          <h2>Office Recept : #10001</h2>
                        </div>
                      </center>


                      <div id="mid">
                        <div className="info">
                          <h2>Contact Info</h2>
                          <p> 
                            Address : 13A Pawell Road, Park town<br />
                            Email   : info@fifmi.org<br />
                            Phone   : +263 8677 004035<br />
                          </p>
                        </div>
                      </div>

                      <div id="mid">
                        <div className="info">
                          <h2>Member Info</h2>
                          <p> 
                            Full Name : Gregory Shoniwa<br />
                            Position : Elder<br />
                            District : Ezekiel Centre<br />
                          </p>
                        </div>
                      </div>


                      <div id="bot">

                          <div id="table">
                            <table>
                            <tbody>
                                <tr className="tabletitle">
                                  <td className="item"><h2>Item</h2></td>
                                  <td className="Hours"><h2></h2></td>
                                  <td className="Rate"><h2>Amount</h2></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Communication</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Asset Gathering</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$225.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Design Development</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$375.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Animation</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$1500.00</p></td>
                                </tr>

                                <tr className="service">
                                  <td className="tableitem"><p className="itemtext">Animation Revisions</p></td>
                                  <td className="tableitem"><p className="itemtext"></p></td>
                                  <td className="tableitem"><p className="itemtext">$750.00</p></td>
                                </tr>   

                                <tr className="tabletitle">
                                  <td></td>
                                  <td className="Rate"><h2>Total</h2></td>
                                  <td className="payment"><h2>$3,644.25</h2></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div id="legalcopy">
                            <p className="legal"><strong>Thank you and may the God of our father truly bless you!</strong> 
                            </p>
                          </div>

                      </div>


                </div>

             </div>
              
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