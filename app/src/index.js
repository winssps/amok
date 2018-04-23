import dva from 'dva';
import './index.css';


// 1. Initialize
 const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/getgroups').default);
app.model(require('./models/showinfo').default);
app.model(require('./models/login').default);
app.model(require('./models/newgroups').default);
app.model(require('./models/register').default);
app.model(require('./models/sharepage').default);
app.model(require('./models/shareview').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
