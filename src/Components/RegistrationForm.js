// RegistrationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const RegistrationForm = ({ onRegistration }) => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [firstname, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');

  // const handleRegistration = async () => {
  //   try {
  //     const response = await axios.post('/register', { username, password, firstname, lastname });
  //     onRegistration(response.data.token);
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //   }
  // };

  const [formData, setFormData] = useState({
    fname: '',
    Lname: '',
    email: '',
    password: '',
    confirmpassword:''
  })

  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {}
    if(formData.fname === "" || formData.fname === null){
      isvalid = false;
      validationErrors.fname = "First Name is required"
    }

    if(formData.Lname === "" || formData.Lname === null){
      isvalid = false;
      validationErrors.Lname = "Last Name is required"
    }

    if(formData.email === "" || formData.email === null){
      isvalid = false;
      validationErrors.password = "Email is Required"
    }else if(!/\S+@\S+\.\S+/.test(formData.email)){
      isvalid = false;
      validationErrors.password = "Email is not valid"
    }

    if(formData.password === "" || formData.password === null){
      isvalid = false;
      validationErrors.password = "Password is Required"
    }else if(formData.password.length < 6){
      isvalid = false;
      validationErrors.password = "Password Length should be atleast 6 characters"
    }

    if(formData.confirmpassword !== formData.password){
      isvalid = false;
      validationErrors.confirmpassword = "Passwords don't match"
    }

    setErrors(validationErrors)
    setValid(isvalid)

    if(Object.keys(validationErrors).length === 0){
      axios.post('http://localhost:8000/users',formData)
      .then(result => {
        alert("Registered Successfully")
        navigate('/login')
      })
      .catch(err => console.log(err))

    }

  } 
  return (
    // <div>
    //   <h2>Registration</h2>
    //   <form>
    //   <label>
    //       First Name:
    //       <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
    //     </label>
    //     <br />
    //     <label>
    //       Last Name:
    //       <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
    //     </label>
    //     <br />
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
    //     <button type="button" onClick={handleRegistration}>Register</button>
    //   </form>
    // </div>

    <div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="signup-form">
                <form class="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
                    <h4 class="mb-5 text-secondary">Create Your Account</h4>
                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label>First Name<span class="text-danger">*</span></label>
                            <input type="text" name="fname" class="form-control" placeholder="Enter First Name" onChange={(event) => setFormData({...formData, fname: event.target.value})} />
                            { valid ? <></> : <span className="text-danger">{errors.fname}</span> }
                        </div>

                        <div class="mb-3 col-md-6">
                            <label>Last Name<span class="text-danger">*</span></label>
                            <input type="text" name="Lname" class="form-control" placeholder="Enter Last Name" onChange={(event) => setFormData({...formData, Lname: event.target.value})}/>
                            { valid ? <></> : <span className="text-danger">{errors.Lname}</span> }
                        </div>

                        <div class="mb-3 col-md-12">
                            <label>Email<span class="text-danger">*</span></label>
                            <input type="email" name="email" class="form-control" placeholder="Enter email" onChange={(event) => setFormData({...formData, email: event.target.value})}/>
                            { valid ? <></> : <span className="text-danger">{errors.email}</span> }
                        </div>

                        <div class="mb-3 col-md-12">
                            <label>Password<span class="text-danger">*</span></label>
                            <input type="password" name="password" class="form-control" placeholder="Enter Password" onChange={(event) => setFormData({...formData, password: event.target.value})}/>
                            { valid ? <></> : <span className="text-danger">{errors.password}</span> }
                        </div>
                        <div class="mb-3 col-md-12">
                            <label>Confirm Password<span class="text-danger">*</span></label>
                            <input type="password" name="confirmpassword" class="form-control" placeholder="Confirm Password" onChange={(event) => setFormData({...formData, confirmpassword: event.target.value})}/>
                            { valid ? <></> : <span className="text-danger">{errors.confirmpassword}</span> }
                        </div>
                        <div class="col-md-12">
                           <button class="btn btn-primary float-end">Signup Now</button>
                        </div>
                    </div>
                </form>
                <p class="text-center mt-3 text-secondary">
                  If you have account, Please <Link to="/login">Login Now</Link></p>
            </div>
        </div>
    </div>
</div>
  );
};

export default RegistrationForm;
