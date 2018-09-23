import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import userModel from './models/user';
import routerModel from './models/router';

const app = dva({
  history: createHistory()
});

app.use(createLoading());

app.model(userModel);
app.model(routerModel);

app.router(require('./pages/router').default);

app.start('#root');

registerServiceWorker();
