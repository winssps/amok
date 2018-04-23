import { Modal, Button, Input } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { getCookie } from '../utils/helper';

const format = 'HH:mm';


const SharePage = ({ form, dispatch, sharepage }) => {


    function showModal() {
        if (getCookie("token") !== null) {
            dispatch({
                type: 'sharepage/show',
            });
        } else {
            dispatch(
                routerRedux.push({
                    pathname: '/login',
                }));
        }
    }
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
    function inputChange(e) {

    }
   // this.refs.userlink.input.value = "hello";
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
                    <Input value={sharepage.link} onChange={inputChange} placeholder="链接" style={{width:"85%",margin:"10px 0px"}}/>
                    <Button >复制</Button>
                </div>
            </Modal>
    );
};

export default connect(({ sharepage }) => {
    return { sharepage };
}
)(SharePage);
