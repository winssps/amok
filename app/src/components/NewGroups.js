import { Modal, Button, Input, TimePicker, DatePicker } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { getCookie } from '../utils/helper';

const format = 'HH:mm';


const NewGroups = ({form, dispatch, newgroups}) =>  {

    const newvalues = {
        name: null,
        date: null,
        time: null,
    };
    function showModal(){
        if (getCookie("token") !== null) {
            dispatch({
                type: 'newgroups/show',
            });
        } else {
            dispatch(
                routerRedux.push({
                    pathname: '/login',
            })); 
        }
    };
    function handleOk(e)  {
        dispatch({
            type: 'newgroups/submit',
            payload: newvalues,
        });
    };
    function handleCancel(e) {
        dispatch({
            type: 'newgroups/cancel',
        });
    };
     function onChangeinput(e) {
         newvalues.name =  e.target.value;
    }
    function onChangedate(date, dateString) {
        newvalues.date = date;
    }
   
    function onChangetime(time, dateString) {
        newvalues.time = time;
    }
    return (
        <div>
            {/*
                <Button style={{marginBottom:"30px"}} type="primary" onClick={showModal}>新建</Button>
            */}
            
            <Modal
                title="新建分组"
                visible={newgroups.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input onChange={onChangeinput} placeholder="名称" style={{marginBottom:"30px",}} />
                <DatePicker onChange={onChangedate} />
                <p style={{marginTop:"10px"}}><TimePicker onChange={onChangetime} format={format}  /></p>
            </Modal>
        </div>
    );
};

export default connect(({ newgroups }) => {
    return {newgroups };
}
)(NewGroups);
