import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useAuth } from '../Context'
import axios from "axios"

function Login () {
  let navigate = useNavigate()
  const { setToken, setUserName } = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loginError, setLoginError] = useState('')
  const submit = data => {
    console.log(data)
    const url = 'https://todoo.5xcamp.us/users/sign_in'
    const obj = {
      user: data
    }
    axios.post(url, obj, {
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
    .then(res => {
      console.log('res', res)
      setToken(res.headers.authorization)
      setUserName(res.data.nickname)
      navigate('/todo')
    })
    .catch(err => {
      console.log(err)
      if (err.response.status === 401) {
        setLoginError('Email or password is incorrect.')
      }
    })
  }

  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="container loginPage vhContainer ">
          <div className="side">
            <Link to="/"><img className="logoImg" src={require('../assets/todo-logo2.png')} alt=""/></Link>
            <img className="d-m-n" src={require('../assets/todo-logo.png')} alt="workImg"/>
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(submit)}>
              <h2 className="formControls_txt">ToDOLIST</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input
                className="formControls_input"
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                {...register('email', {
                  required: { value: true, message: 'This field is required!'},
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email format is incorrect!'
                  }
                })}
              />
              <span>{errors.email?.message}</span>
              <label className="formControls_label" htmlFor="pwd">Password</label>
              <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd"
                placeholder="Enter password"
                {...register('password', {
                  required: { value: true, message: 'This field is required!'}
                })}
              />
              <span>{errors.password?.message}</span>
              <span>{loginError}</span>
              <input className="formControls_btnSubmit" type="submit" value="Login"/>
              <Link to="/signup" className="formControls_btnLink">Sign up</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
