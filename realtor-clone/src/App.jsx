import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createBrowserRouter,
  RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Offers from './pages/Offers'
import Header from './components/Header'
import Footer from './components/Footer'




function App() {

  return (

    <>
     <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
      < Footer />
    </Router>
    
    </>
    
  )
}

export default App
