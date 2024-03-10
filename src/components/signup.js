import React,{useState} from 'react'
import './login.css'
import {Link } from 'react-router-dom';

const Signup = () => {

  const [lname, setName] = useState("");
  const [lemail, setEmail] = useState("");
  const [lpassword, setPassword] = useState("");

  const handlesignup=async(e)=>{
    e.preventDefault();

    const response=await fetch('http://localhost:5000/api/auth/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:lname,email:lemail, password:lpassword }),
    });
    const data=await response.json();
    if(data.ok){
      console.log(data.token);
    }

  }

  return (
    <div className="con">
        <div className="container">
            <div className="heading">Sign-up</div>
            <form className="form" onSubmit={handlesignup}>
                <input required="" className="input" type="text" name="name" id="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                <input required="" className="input" type="email" name="email" id="email" placeholder="E-mail" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input required="" className="input" type="password" name="password" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <span className="forgot-password"><Link to="/">Already have an account. Login</Link></span>
                <input className="login-button" type="submit" value="Signup"/>
            </form>
        </div>
    </div>
  )
}

export default Signup
