import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link, HashRouter ,Switch} from 'react-router-dom';


import Head from './components/head.js';
import Index from './components/index.js';
import Admin from './components/admin.js';





const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Index} />
      <Route path='/admin' component={Admin} />
    </Switch>
  </main>
);



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div style={{ width: "1200px", margin: "0 auto" }}>
                <Head />
                <Main />
            </div>
        );
    }
}

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter> 
    ), document.getElementById('root')
);









