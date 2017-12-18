import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link} from 'react-router-dom';


export default class Head extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">文件上传</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li >
                                <Link to='/'>上传</Link>
                            </li>
                            <li>
                                <Link to='/admin'>登录</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
















