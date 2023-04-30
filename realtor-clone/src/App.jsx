import { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  // Pages imports
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';




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
        <Route path="/create-listing" element={ <PrivateRoute />}>
           <Route path="/create-listing" element={<CreateListing />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
      < Footer />
    </Router>
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick
    rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
    
  )
}

export default App
