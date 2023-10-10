import React, { useState } from "react";
import './LoginStyles.css'
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleLogin = (e) => {
        e.preventDefault()
        const storedUser = JSON.parse(localStorage.getItem("info"))
        if (storedUser && login.email === storedUser.email && login.password === storedUser.password) {
            localStorage.setItem("loggedin", true)
            navigate("/dashboard")
        } else {
            alert("Check your credentials")
        }
    }

    return (
        <div className="mainDiv">
            <div>
                <h1 className="display">Login Page</h1>
            </div>

            <form className="loginpage" onSubmit={handleLogin}>
                <div className="form-main">

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" name='email' value={login.email} required className="form-control email" placeholder="Enter your mail id" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                        </div>
                        <br /><br />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" name='password' value={login.password} required className="form-control password" placeholder="Password" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                        </div>
                        <br /><br />
                    </div>

                    <div className='button'>
                        <input type='submit' value="Login" className="btn btn-outline-primary btn-primary" />
                    </div>
                    <p className="para">Don't have an account <Link to="/signup">Signup</Link> here</p>

                </div>
            </form>
        </div>
    )
}

export default Login;
