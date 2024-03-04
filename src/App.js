import {Switch, Route} from 'react-router-dom'

import './App.css'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Jobs from './components/Jobs'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/Jobs" component={Jobs} />
    <Route exact path="/not-found" component={NotFound} />
  </Switch>
)

export default App
