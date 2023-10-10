import React, { useState } from "react";
import './SignupStyles.css'
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (login.name === '' || login.email === '' || login.password === '') {
            alert("Please enter all required fields");
        } else if (login.password !== login.confirmPassword) {
            setPasswordError("Passwords do not match");
        } else if (!isPasswordValid(login.password)) {
            setPasswordError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
        } else {
            localStorage.setItem("info", JSON.stringify(login));
            navigate('/');
        }
    }

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return password.match(passwordRegex) !== null;
    }

    return (
        <div className="mainDiv">
            <div>
                <h1 className="display">Registration Page</h1>
            </div>
            <form className="signuppage" onSubmit={handleSubmit}>
                <div className="form-main">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label label-name">Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" value={login.name} required className="form-control name" placeholder="Enter your name" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                        </div>
                        <br /><br />
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label label-name">Email</label>
                        <div className="col-sm-10">
                            <input type="email" name="email" value={login.email} required className="form-control email" placeholder="Enter your mail id" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                        </div>
                        <br /><br />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label label-name">Password</label>
                        <div className="col-sm-10">
                            <input type="password" name="password" value={login.password} required className="form-control password" placeholder="Password" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                        </div>
                        <br /><br />
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label label-name">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" name="confirmPassword" value={login.confirmPassword} required className="form-control password" placeholder="Confirm Password" onChange={(e) => {
                                setLogin({ ...login, [e.target.name]: e.target.value });
                            }} />
                            <br/><br/>
                            <p className="error"><center>{passwordError}</center></p>
                        </div>
                    </div>
                    <div className='button'>
                        <input type='submit' value="Submit" className="btn btn-outline-primary" />
                    </div>
                    <p className="para">Already have an account <Link to="/">Login</Link> here</p>
                </div>
            </form>
        </div>
    )
}

export default Signup;
