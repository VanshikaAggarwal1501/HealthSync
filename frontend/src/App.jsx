import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Doctors from "./Pages/Doctors"
import Login from "./Pages/Login"
import About from "./Pages/About"
import MyProfile from "./Pages/MyProfile"
import MyAppointments from "./Pages/MyAppointments"
import Contact from "./Pages/Contact"
import Appointment from "./Pages/Appointment"
import Footer from "./Components/Footer"
import Navbar from "./Components/Navbar"
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <>
    <div className="mx-4 sm: mx-[10%]">
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path= "/" element= {<Home/>} />
        <Route path= "/doctors" element= {<Doctors/>} />
        <Route path= "/doctors/:speciality" element= {<Doctors/>} />
        <Route path= "/Login" element= {<Login/>} />
        <Route path= "/about" element= {<About/>} />
        <Route path= "/my-profile" element= {<MyProfile/>} />
        <Route path= "/my-appointments" element= {<MyAppointments/>} />
        <Route path= "/contact" element= {<Contact/>} />
         <Route path= "/appointment/:docId" element= {<Appointment/>} />
      </Routes>
      <Footer/>
       
    </div>
      
    </>
  )
}

export default App
