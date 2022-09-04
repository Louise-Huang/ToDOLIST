import React, { useState } from 'react'
import { Link, useNavigate  } from "react-router-dom"
import { useForm } from 'react-hook-form'
import axios from "axios"

function SignUp () {
  let navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [signUpError, setSignUpError] = useState('')
  const submit = data => {
    console.log(data)
    const url = 'https://todoo.5xcamp.us/users'
    const obj = {
      user: data
    }
    axios.post(url, obj, {
      headers: {
        "Content-Type": "application/json" ,
        "accept": "application/json"
      }
    })
    .then(res => {
      setSignUpError('')
    })
    .catch(err => {
      console.log(err.response.data.error)
      if (err.response.status === 422) {
        setSignUpError(err.response.data.error)
      }
    })
  }


  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="container signUpPage vhContainer">
          <div className="side">
            <Link to="/"><img className="logoImg" src={require('../assets/todo-logo2.png')} alt="" /></Link>
            <img className="d-m-n" src={require('../assets/todo-logo.png')} alt="workImg" />
          </div>
          <div>
            <form className="formControls" onSubmit={handleSubmit(submit)}>
              <h2 className="formControls_txt">Sign up</h2>
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
              <label className="formControls_label" htmlFor="name">Name</label>
              <input
                className="formControls_input"
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                {...register('nickname', {
                  required: { value: true, message: 'This field is required!'}
                })}
              />
              <span>{errors.nickname?.message}</span>
              <label className="formControls_label" htmlFor="pwd1">Password</label>
              <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd1"
                placeholder="Enter password"
                {...register('password', {
                  required: { value: true, message: 'This field is required!'}
                })}
              />
              <span>{errors.password?.message}</span>
              <label className="formControls_label" htmlFor="pwd2">Password again</label>
              <input
                className="formControls_input"
                type="password"
                name="pwd"
                id="pwd2"
                placeholder="Enter password again"
                {...register('password', {
                  required: { value: true, message: 'This field is required!'},
                  minLength: { value: 6, message: 'Password requires at least six characters.' }
                })}
              />
              <span>{errors.password?.message}</span>
              <span>{signUpError}</span>
              <input className="formControls_btnSubmit" type="submit" value="Sign up" />
              <Link to="/" className="formControls_btnLink">Login</Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;
