/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {adminBaseUrl} from '../../utils/const'
import  './AdminLogin.css'
import { adminAxiosInstance } from "../../axios";

function Login() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [passErr, setpassErr] = useState('');
    const [emailErr, setemailErr] = useState('');

    console.log(email, password);

    const Navigate = useNavigate();

    const handleClick = ()=> {
        adminAxiosInstance.post(`${adminBaseUrl}`, {email: email, password: password}).then((response)=> {
            console.log(response);
            setemail('');
            setpassword('');
            if(response.data.success) {
                localStorage.setItem('admintoken', JSON.stringify(response.data.token));
                localStorage.setItem('admin', JSON.stringify(response.data));
                Navigate('/adminHome');
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

    useEffect(() => {
      if (localStorage.getItem('admintoken')) {
          Navigate('/admin');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="loginParentDiv">
        <h1 style={{color: '#fff'}}>ADMIN LOGIN</h1>
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
      </div>
    </div>
  )
}

export default Login
