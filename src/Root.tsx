import { FC } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router/immutable'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'react-redux'

import App from './app'
import Share from './share'

import store, { history } from './store'

const Root: FC = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/">
              <App/>
            </Route>
            <Route path="/share">
              <Share/>
            </Route>
          </Switch>
        </Router>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>
)

export default Root
