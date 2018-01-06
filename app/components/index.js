import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


require('../css/style.css');

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : null,
            listnum : 0,
            talist : null
        };
        this.upLoadFile = this.upLoadFile.bind(this);
        this.getFileList = this.getFileList.bind(this);
        this.getFileSize = this.getFileSize.bind(this);
        this.mapFileDom = this.mapFileDom.bind(this);
    }
    componentDidMount() {
        this.getFileList();
    }
    getFileList() {
        var _that = this;
            request
                .get('/files')
                .end(function (err, res) {
                    if (err || !res.ok) {
                    } else {
                        var fileobjs = res.body.objects;
                        _that.setState({
                            file: res.body.objects
                        });
                    var filelist = _that.mapFileDom();     
                   _that.setState({
                       talist: filelist
                   });
                }
            });
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
    getFileSize(size) {
        if (!size) return "";
        var num = 1024.00; //byte
        if (size < num)return size + "B";
        if (size < Math.pow(num, 2))
            return (size / num).toFixed(2) + "K"; //kb
        if (size < Math.pow(num, 3))
            return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
        if (size < Math.pow(num, 4))
            return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
        return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
    }
    mapFileDom() {
        var _that = this;
        let tasks = this.state.file;
        var talist = null;
        var listnum = 0;
        if (tasks) {
            talist = this.state.file.map(function (item) {
                listnum++;
                return (
                    <li key={item.etag} className="fslist">
                        <div className="name">{item.name.substring(7)}</div>
                        <div className="size">{_that.getFileSize(item.size)}</div>
                        <div className="time">{item.lastModified}</div>
                    </li>
                )
            });
        }
        this.state.listnum = listnum;
        return talist;
    }
    render() {
        return (
            <div>
               <h2>选择你要上传的文件</h2>
                 <input type="file" name="files" onChange={ (e) => {
                    this.upLoadFile(e.target.files);
                 }} /> 

                 <div className="fsdiv">
                    <ul>
                        <li className="fslist">
                            <div className="name">文件名({this.state.listnum})</div>
                            <div className="size">大小</div>
                            <div className="time">时间</div>
                        </li>
                        {this.state.talist}
                    </ul>                     
                 </div>
            </div>
        );
    }
}
















