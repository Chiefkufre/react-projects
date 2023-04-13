import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  // Pages imports
import './App.css'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute';




function App() {

  return (

    <>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={ <PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
      < Footer />
    </Router>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    </>
    
  )
}

export default App
