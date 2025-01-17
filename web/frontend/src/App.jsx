import Header from './components/Header'
import ScansList from './components/ScansList'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";



import EditProfile from './pages/EditProfile';

import Report from './pages/Report';
import Login from './components/Login';

import  { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import ApiKeysSetting from './pages/ApiKeysSetting';
import Dashboard from './pages/Dashboard';
import CreateUser from './components/CreateUser';
import ManageUsers from './pages/ManageUsers';
import Checkout from './pages/Checkout';




function App() {

  const Layout = () => {

  return(
      <PrivateRoute>
      <Header />
      <Outlet />
      </PrivateRoute>
    )
  }

  


  return (
    <div className="w-full h-screen overflow-y-auto scrollbar-design ">
      <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route  path='/' element={
            <Layout />
          } >
            <Route path='' element={<Dashboard />} />
            <Route path='/scanslist' element={<ScansList />} />
            <Route path='/manageusers' element={<ManageUsers />} />
            <Route path='/createuser' element={<CreateUser />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/report/:id' element={<Report />} />
            <Route path='/apikeys' element={<ApiKeysSetting  />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
      
  )
}

export default App
