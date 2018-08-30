import { Modal, Button, Input, message } from 'antd';
import { connect } from 'dva';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import copy from 'copy-to-clipboard';

const SharePage = ({ form, dispatch, sharepage }) => {



    function handleOk(e) {
        dispatch({
            type: 'sharepage/submit',
        });
    }
    function handleCancel(e) {
        dispatch({
            type: 'sharepage/cancel',
        });
    }
    function handleCopy() {
        copy(sharepage.link);
        dispatch({
          type: 'sharepage/cancel',
        });
        message.success("复制成功");
    }
    return (
            <Modal
                title="文件提交链接"
                visible={sharepage.visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <p>创建浏览链接,分享给别人后可以通过此链接来安全地浏览您的所有分组</p>
                <div style={{width:"100%",}}>
                    <Input value={sharepage.link}  placeholder="链接" style={{width:"85%",margin:"10px 0px"}}/>
                    <Button onClick={handleCopy} style={{marginLeft: "3px"}}>复制</Button>
                </div>
            </Modal>
    );
};

export default connect(({ sharepage }) => ({
    sharepage,
}))(SharePage);
