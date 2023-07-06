/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logoImage from './../../logo copy.svg';
import {userBaseUrl} from '../../utils/const'
import { axiosInstance } from "../../axios";
import  './Login.css'

function Login() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passErr, setpassErr] = useState('');
    const [emailErr, setemailErr] = useState('');




    const Navigate = useNavigate();

    const handleClick = ()=> {
      axiosInstance.post(`${userBaseUrl}/login`, {email: email, password: password}).then((response)=> {
            console.log(response);
            if(response.data.success) {
                localStorage.setItem('jwtToken', JSON.stringify(response.data.token));
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.href ='/'
            }
            
            if(response.data.emailErr){
                setemailErr(response.data.emailErr)
            }

            if(response.data.passErr){
                setpassErr(response.data.passErr);
            }
        }).catch((err)=> {
            console.log(err, "Login error")
        })
    }

    useEffect(()=>{
      if(localStorage.getItem('jwtToken')){
          Navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={logoImage}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br/>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setemail(e.target.value)}
            id="fname"
            name="email"
           />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setpassword(e.target.value)}
            id="lname"
            name="password"
            />
          <br/>
          <br/>
          <div className='text-danger ml-5'>{passErr ? passErr : ""}</div>
          <div className='text-danger ml-5'>{emailErr ? emailErr : ""}</div>
          <button onClick={handleClick} type='button'>Login</button>
        </form>
        <a href='' style={{color: "#fff",textDecoration: 'none'}} onClick={()=> Navigate('/signup')}>Signup</a>
      </div>
    </div>
  )
}

export default Login
