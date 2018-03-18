import { Upload, Button, Icon, message  } from 'antd';
import { connect } from 'dva';
import { getLocalStorage } from '../utils/helper';

const UpLoadFile = ({dispatch, upload }) => {

    const props = {
        name: 'file',
        action: 'http://localhost:4535/upload?id=' + getLocalStorage('groupsname'),
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
              //  console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                dispatch({
                    type: 'showinfo/query',
                    payload: getLocalStorage('groupsname')
                });
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Upload {...props} >
            <Button>
                <Icon type="upload" /> 点击上传文件
             </Button>
        </Upload>
    );
};



export default connect(({ upload }) => {
    return { upload };
}
)(UpLoadFile);
