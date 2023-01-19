import { Modal, Spin } from 'antd'
import './Loader.css'

type LoaderTextProps = {
    text: string,
    loading: boolean
}
export const Loader = (props : LoaderTextProps) => {
   
    return (
        <>
            <Modal
                closable={false}
                destroyOnClose
                centered
                open={props.loading}
                width={220}
                footer={null}
                bodyStyle={{display: 'flex',justifyContent: 'center',alignItems: 'center',padding:'10px'}}
            >

                <Spin size="large" tip={props.text}  />
            </Modal>
            
        </>
    )
}