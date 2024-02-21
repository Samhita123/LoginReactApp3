// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = ({ onLogin }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('/login', { username, password });
  //     onLogin(response.data.token);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {}
    
    if(formData.email === "" || formData.email === null){
      isvalid = false;
      validationErrors.email = "Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
      isvalid = false;
      validationErrors.email = "Email is not valid"
    }

    if(formData.password === "" || formData.password === null){
      isvalid = false;
      validationErrors.password = "Password is Required"
    }else if(formData.password.length < 6){
      isvalid = false;
      validationErrors.password = "Password Length should be atleast 6 characters"
    }

    axios.get('http://localhost:8000/users')
    .then(result => {
      result.data.map(user => {
        if(user.email === formData.email){
          if(user.password === formData.password){
            alert("Login successful")
            navigate("/")
          }else{
            isvalid = false;
            validationErrors.password = "Wrong Password"
          }
        } 
      })
      setErrors(validationErrors)
      setValid(isvalid)
    })
    .catch(err => console.log(err))
  }

  return (
    // <div>
    //   <h2>Login</h2>
    //   <form>
    //     <label>
    //       Username:
    //       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Password:
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //     </label>
    //     <br />
    //     <button type="button" onClick={handleLogin}>Login</button>
    //   </form>
    // </div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="signup-form">
            <form class="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
              <h4 class="mb-5 text-secondary">Create Your Account</h4>
              <div class="row">
                <div class="mb-3 col-md-12">
                  <label>Email<span class="text-danger">*</span></label>
                  <input type="email" name="email" class="form-control" placeholder="Enter email" onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
                  {valid ? <></> : <span className="text-danger">{errors.email}</span>}
                </div>
                <div class="mb-3 col-md-12">
                  <label>Password<span class="text-danger">*</span></label>
                  <input type="password" name="password" class="form-control" placeholder="Enter Password" onChange={(event) => setFormData({ ...formData, password: event.target.value })} />
                  {valid ? <></> : <span className="text-danger">{errors.password}</span>}
                </div>
                <div class="col-md-12">
                  <button class="btn btn-primary float-end">Login</button>
                </div>
              </div>
            </form>
            <p class="text-center mt-3 text-secondary">
              If you don't have account, Please <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
