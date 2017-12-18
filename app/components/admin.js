import React from 'react';
import ReactDOM from 'react-dom';

import request from 'superagent';

export default class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            passw:""
        };
    }
    componentDidMount() {
        this.handleChange = this.handleChange.bind(this);
        this.userChange = this.userChange.bind(this);
    }
    componentWillUnmount() {

    }
    userChange(value) {
        this.setState({
            user: value
        });
    }
    passwChange(value) {
        this.setState({
            passw: value
        });
    }
    handleChange() {
        if(this.state.user && this.state.passw) {
            request
                .post('/login')
                .send({user:this.state.user,password:this.state.passw})
                .end(function (err, res) {
                    if (err || !res.ok) {
                    } else {
                        console.log(res.body);
                    }
            }); 
        }
    }
    render() {
        return (
            <div>
             <h2>管理员登录</h2>
                <form>
                    <div className="form-group">
                        <input onChange={ (e)=> this.userChange(e.target.value)}  type="text" className="form-control" placeholder="账号" />
                    </div>
                    <div className="form-group">
                        <input onChange={(e) => this.passwChange(e.target.value)} type="password" className="form-control" placeholder="密码" />
                    </div>
                    <button onClick={this.handleChange}  className="btn btn-default">登录</button>
                </form>
            </div>
        );
    }
}
















