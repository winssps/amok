import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


require("../css/style.css");


export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : []
        };
        this.upLoadFile = this.upLoadFile.bind(this);
    }
    componentDidMount() {
    }
    upLoadFile(files) {
        var file = files[0];
        if (file) {
            let reg = /(?:doc|docx)$/;
            if (reg.test(file.name)) {
                let data = new FormData();
                data.append('file', file);
                request
                    .post('/upload')
                    .send(data)
                    .end(function (err, res) {
                        if (err || !res.ok) {
                        } else {
                            alert("上传成功！");
                        }
                }); 
            } else {
                alert("你的文件格式不合格！请重新上传。请上传.doc/.docx文件");
            }
        }
    } 
    render() {
        return (
            <div>
               <h2>选择你要上传的文件</h2>
                 <input type="file" name="files" onChange={ (e) => {
                    this.upLoadFile(e.target.files);
                 }} /> 

                    <div className="Grid">
                        <div className="Grid-cell u-lof4">
                            <div className="list">
                                <div className="folder">
                                    <p className="name">第一次实验</p>
                                </div>
                            </div>
                        </div>
                        <div className="Grid-cell u-lof4">
                            <div className="list">
                                <div className="folder">
                                    <p className="name">第一次实验</p>
                                </div>
                            </div>
                        </div>
                        <div className="Grid-cell u-lof4">
                            <div className="list">
                                <div className="folder">
                                    <p className="name">第一次实验</p>
                                </div>
                            </div>
                        </div>
                        <div className="Grid-cell u-lof4">
                            <div className="list">
                                <div className="folder">
                                    <p className="name">第一次实验</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
















