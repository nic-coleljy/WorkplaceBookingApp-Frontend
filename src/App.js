import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ForgetPassword = React.lazy(() => import('./views/pages/login/forgetPassword'))
const UpdatePassword = React.lazy(() => import('./views/pages/login/updatePassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const CheckIn = React.lazy(() => import('./views/checkIn'))

class App extends Component {

  render() {

    return (

      <BrowserRouter>

        <React.Suspense fallback={loading}>

          <Route exact path="/Login" name="Login Page" render={(props) => <Login {...props} />} />

          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
          <Route exact path="/CheckIn" name="CheckIn" render={(props) => <CheckIn{...props} />} />

          <Route exact path="/ForgetPassword" name="ForgetPassword" render={(props) => <ForgetPassword{...props} />} />
          <Route exact path="/UpdatePassword" name="UpdatePassword" render={(props) => <UpdatePassword{...props} />} />
          <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />

        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
