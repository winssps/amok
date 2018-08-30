import { Modal, Input, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';


const NewGroups = ({form, dispatch, newgroups}) =>  {

    const newvalues = {
        name: null,
        date: null
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
    function disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }
    /*function disabledDateTime() {
      return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    function range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }*/
    function onhandleDatePicker(date) {
        newvalues.date = date;
    }
    return (
        <div>
            <Modal
                title="新建分组"
                visible={newgroups.visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input onChange={onChangeinput} placeholder="名称" style={{marginBottom:"30px",}} />
                <DatePicker
                  format="YYYY-MM-DD HH:mm:ss"
                  disabledDate={disabledDate}
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  onChange={onhandleDatePicker}
                />
            </Modal>
        </div>
    );
};

export default connect(({ newgroups }) => ({
    newgroups,
}))(NewGroups);
