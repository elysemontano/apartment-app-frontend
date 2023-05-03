# Setup Process
First we need to create a react app

`$ yarn create react-app apartment-app-frontend`
`$ cd apartment-app-frontend`

## Configure Port (optional)
We can setup a specific port to start in development for React by creating a .env file and adding:

```javascript
// .env
PORT=3001
```
This will start the server on localhost:3001 and will not conflict with Rails

## Reactstrap
```
$ yarn add bootstrap
$ yarn add reactstrap
Add to src/index.js: import 'bootstrap/dist/css/bootstrap.min.css'
```

## React Router
First we need to add the necessary packages to our application using a yarn command. This adds the React Router dependencies to the package.json file.

`$ yarn add react-router-dom`

Add to src/index.js
```javascript
// src/index.js

import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { App } from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom" // add this import

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

Now we can add the appropriate routing components to App.js. First the components will need to be imported.

```javascript
// src/App.js
import { Routes, Route } from "react-router-dom"
```

Scaffold out the components and pages:
Components:
- Footer.js
- Header.js
- Login.js
- Navigation.js
- Signup.js

Pages:
- ApartmentEdit.js
- ApartmentIndex.js
- ApartmentNew.js
- ApartmentShow.js
- Home.js
- MyApartment.js
- NotFound.js

```javascript
return (
    <>    
      <Header />
      <Routes>
        <Route exact path="/" element={<Home  />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apartmentindex" element={<ApartmentIndex />} />
        <Route path="/myapartments" element={<MyApartments />} />
        <Route path="/apartmentshow/:id" element={<ApartmentShow />} />
        <Route path="/apartmentnew" element={<ApartmentNew />} />
        <Route path="/apartmentedit/:id" element={<ApartmentEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
```

## Setup User
We will first need to setup a state variable that will store the current user in with the default value set to null.  Later, this will be updated with a fetch call.

```javascript
#frontend/src/App.js
import { useState } from 'react';
import './App.css';

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  return (
    <>
      <h1>Apartment App</h1>
    </>
  );
}
export default App;
```

Next we need to setup views for Signup and Login inside components.

Signup:
```javascript
// src//components/Signup.js
import { useRef } from "react"
import {useNavigate} from "react-router-dom"

const Signup = () => {
    const formRef = useRef()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)
        const userInfo = {
            "user":{ email: data.email, password: data.password }
        }
    }

    return(
        <div>
        <form ref={formRef} onSubmit={handleSubmit}>
            Email: <input type="email" name='email' placeholder="email" />
            <br/>
            Password: <input type="password" name='password' placeholder="password" />
            <br/>
            <input type='submit' value="Submit" />
        </form>
        <br />
        <div>Already registered, <a href="/login">Login</a> here.</div>
    </div>
    )
}
export default Signup
```


Login:
```javascript
import { useRef } from "react"
import {useNavigate} from "react-router-dom"

const Login = () => {
  const formRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
      const formData = new FormData(formRef.current)
      const data = Object.fromEntries(formData)
      const userInfo = {
        "user":{ email: data.email, password: data.password }
      }
  }
  return(
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name='email' placeholder="email" />
        <br/>
        Password: <input type="password" name='password' placeholder="password" />
        <br/>
        <input type='submit' value="Login" />
      </form>
      <br />
      <div>Not registered yet, <a href="/signup">Signup</a> </div>
    </div>
  )
}
export default Login
```

## Fetching User
Let's now setup our fetch calls for user in App.js

```javascript
const url = "http://localhost:3000"
  const login = async (userInfo) => {
    try{
        const response = await fetch(`${url}/login`, {
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
    try{
        const response = await fetch(`${url}/signup`, {
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
        const response = await fetch(`${url}/logout`,{
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
```

We can now check if we the fetch call is working by throwing a console log of currUser. 

## Apartments
Now that we have working authentication, we can finish setting up the rest of the Apartment App. 

Note: we will be using currUser as a reference point to conditionally render certain parts of our application.  

## Deployment
Make sure to update the url for the fetch calls to the relative url used for API.