/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import logoImage from './../../logo copy.svg';
import {userBaseUrl} from '../../utils/const'
import './Signup.css'
import { axiosInstance } from "../../axios";
import { useNavigate } from 'react-router-dom';


function Signup() {

  console.log(userBaseUrl,"sasasas")
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
    const [err, seterr] = useState('')
    const Navigate = useNavigate();


    const handleSubmit =()=> {

      axiosInstance.post(`${userBaseUrl}/signup`, {email: email, password: password, phone: phone, name: name}).then((response)=> {
        console.log(response);
        setname('')
        setpassword('');
        setemail('');
        setphone('');
        const token = response.data.token;
        console.log(token, "Signup token");
        Navigate('/login');

        if(response.data.err){
          seterr(response.data.err);
        }
      }).catch((err)=> {
        console.log(err, 'Signup post error')
      })
    }

    const handleClick = ()=> {
      Navigate('/login');
    }

    useEffect (()=> {
      const timer = setTimeout(()=> {
        seterr('');
      }, 3000);
      return ()=> {
        clearTimeout(timer);
      }
    }, [err])

    useEffect(()=>{
      if(localStorage.getItem('token')){
          Navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
    <div className="signupParentDiv">
    <img width='200px' height='200px' src={logoImage} alt="Logo"/>
      <form >
        <label htmlFor="fname">Username</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e)=> setname(e.target.value)}
          id="fname"
          name="name"
        />
        <br />
        <label htmlFor="fname">Email</label>
        <br />
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e)=> setemail(e.target.value)}
          id="fname"
          name="email"
        />
        <br />
        <label htmlFor="lname">Phone</label>
        <br />
        <input
          className="input"
          type="number"
          value={phone}
          onChange={(e)=> setphone(e.target.value)}
          id="lname"
          name="phone"
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
        <div className='text-danger ml-5'>{err ? err : ""}</div>
        <button onClick={handleSubmit} type='button' >Signup</button>
      </form>
      <a style={{color: "#fff"}} onClick={handleClick}>Login</a>
    </div>
  </div>
  )
}

export default Signup;