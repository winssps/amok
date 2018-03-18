import dva from 'dva';
import './index.css';


// 1. Initialize
 const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/getgroups').default);
app.model(require('./models/file').default);
app.model(require('./models/login').default);
app.model(require('./models/newgroups').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
