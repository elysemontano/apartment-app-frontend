import { useRef } from "react"
import {useNavigate} from "react-router-dom"

const Signup = ({ signup }) => {
const formRef = useRef()
const navigate = useNavigate()

const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
        "user":{ email: data.email, password: data.password }
    }
    signup(userInfo)
    e.target.reset()
    navigate("/")
}
return (
    <div className="auth-body">
        <h2 className="header">Sign Up</h2>
        <form className="form-div" ref={formRef} onSubmit={handleSubmit}>
            Email: <input className="field auth-flex" type="email" name='email' placeholder="email" />
            <br/>
            Password: <input className="field auth-flex" type="password" name='password' placeholder="password" />
            <br/>
            <input className="actions" type='submit' value="Submit" />
            <div className="links">Already registered?   
                <a href="/login" >  <u>Login</u></a>
            </div>
        </form>
    </div>
    )
}
export default Signup