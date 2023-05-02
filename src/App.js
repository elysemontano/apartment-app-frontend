import { useState, useEffect } from 'react';
import './App.css';
import {  Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ApartmentEdit from "./pages/ApartmentEdit"
import ApartmentIndex from "./pages/ApartmentIndex"
import ApartmentNew from "./pages/ApartmentNew"
import ApartmentShow from "./pages/ApartmentShow"
import MyApartments from "./pages/MyApartments"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Signup from "./components/Signup"
import Login from "./components/Login"
import User from './components/User'

const App=()=>{
  const [apartments, setApartments] = useState([])
  const [currUser, setCurrUser]=useState(null)

  useEffect(() => {
    readApartments()
  }, [])

  const login = async (userInfo) => {
    const url="http://localhost:3000/login"
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const data = await response.json()
        if(!response.ok) 
        throw data.error
        localStorage.setItem("token", response.headers.get("Authorization"))
          setCurrUser(data)        
    }catch (error) {
        console.log("error", error)
    }
  }

  const signup = async (userInfo) => {
    const url="http://localhost:3000/signup"
    try{
        const response = await fetch(url, {
            method: 'post',
            headers: {
                "content-type": 'application/json',
                "accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        }) 
        const data = await response.json()
        if(!response.ok) throw data.error
        localStorage.setItem('token', response.headers.get("Authorization"))
        setCurrUser(data)
    } catch (error){
        console.log("error", error)
    }
  }

  const logout = async () => {
    try {
        const response=await fetch("http://localhost:3000/logout",{
            method: "delete",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("token")
            },
        })
        const data = await response.json()
        if(!response.ok) throw data.error
        localStorage.removeItem("token")
        setCurrUser(null)
    } catch (error) {
        console.log("error", error)
    }
  }

  const readApartments = () => {
    fetch("http://localhost:3000/apartments")
      .then((response) => response.json())
      .then((payload) => {
        setApartments(payload)
      })
      .catch((error) => console.log(error))
  }


  const createApartment = (apartment) => {
    fetch("http://localhost:3000/apartments", {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then((response) => response.json())
    .then(() => readApartments())
    .catch((errors) => console.log("Apartment create errors:", errors))
  }

  const editApartment = (apartment, id) => {
    fetch(`http://localhost:3000/apartments/${id}`, {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then((response) => response.json)
    .then(() => readApartments())
    .catch((errors) => console.log("Apartment update errors", errors))
  }

  const deleteApartment = (id) => {
    fetch(`http://localhost:3000/apartments/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then((response) => response.json())
    .then(() => readApartments())
    .catch((errors) => console.log("delete errors:", errors))
  }
  console.log(currUser)
  return (
    <>    
      <Header current_user={currUser} logout={logout} setCurrUser={setCurrUser}/>
      <Routes>
        <Route exact path="/" element={<Home current_user={currUser} />} />
        <Route path="/login" element={<Login login={login}/>} />
        <Route path="/signup" element={<Signup signup={signup}/>} />
       <Route path="/user" element={ <User currUser={currUser} setCurrUser={setCurrUser} />} />
        <Route path="/apartmentindex" element={<ApartmentIndex apartments={apartments} />} />
        <Route path="/myapartments" element={<MyApartments current_user={currUser} apartments={apartments} />} />
        <Route path="/apartmentshow/:id" element={<ApartmentShow current_user={currUser} apartments={apartments} deleteApartment={deleteApartment} editApartment={editApartment}/>} />
        <Route path="/apartmentnew" element={<ApartmentNew current_user={currUser} createApartment={createApartment} />} />
        <Route path="/apartmentedit/:id" element={<ApartmentEdit current_user={currUser} editApartment={editApartment} apartments={apartments} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;