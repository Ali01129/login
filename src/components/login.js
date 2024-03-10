import React, { useState } from 'react';
import './login.css'
import {Link } from 'react-router-dom';


const Login = () => {
  
  const [lemail, setEmail] = useState("");
  const [lpassword, setPassword] = useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email:lemail, password:lpassword }),
    });
    const data=await response.json();
    if(data.ok){
      console.log(data.token)
    }
  }
  return ( 
    <div className="con">
        <div className="container">
            <div className="heading">Login</div>
            <form className="form" onSubmit={handleSubmit}>
                <input required="" className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input required="" className="input" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <span className="forgot-password"><Link to="/sign">New here. Sign-up</Link></span>
                <input className="login-button" type="submit" value="Login"/>
            </form>
        </div>
    </div>
  )
}

export default Login
