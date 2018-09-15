import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

const app = dva({
  history: createHistory()
});

app.use(createLoading());

app.model(require('./models/app').default);

app.router(require('./pages/router').default);

app.start('#root');

registerServiceWorker();
