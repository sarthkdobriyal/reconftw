import { useContext, useEffect, useState } from 'react'
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
            <Route path='' element={<ScansList />} />
            <Route path='/editprofile' element={<EditProfile />} />
            <Route path='/report/:id' element={<Report />} />
            <Route path='/apikeys' element={<ApiKeysSetting  />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </div>
      
  )
}

export default App
