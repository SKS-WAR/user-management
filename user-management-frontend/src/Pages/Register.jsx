import React,{useState} from 'react'
import Auth from '../Services/Auth';
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';
const Register = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [fullName,setFullName] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [sendHomePage,setSendHomePage] = useState(Auth.isAuthenticated);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(email === '' || password === '' || fullName === ''){
            setError('Please enter all fields');
        }
        else{
            setError('');
            // Auth.login(email,password)
            axios.post('http://localhost:1337/user',{fullName,email,password})
            .then(res => {
              axios.post('http://localhost:1337/login',{email,password})
              .then(res => {
                  console.log(res);
                  localStorage.setItem('token',res.data.token);
                  localStorage.setItem('user',JSON.stringify(res.data.user));
                  console.log(Auth)
                  Auth.authenticate(res.data.token,res.data.user);
                  // Navigate('/');
                  setSendHomePage(true);
                  // Auth.isAuthenticated = true;
              })
              .catch(err => {
                  console.log(err);
              })
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.message);
            })
        }
    }

  if(sendHomePage){
    return <Navigate to='/' />
  }

  return (
    <div >
        <div class="container mt-5">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6">
                    <div class="card px-5 py-5" id="form1">
                        <div class="form-data">
                            {error && <div class="alert alert-danger">{error}</div>}
                            <div class="forms-inputs mb-4"> <span>Full Name</span> <input type="text" className='form-control' value={fullName} onChange={e => setFullName(e.target.value)}/>
                                {/* <div class="invalid-feedback">A valid email is required!</div> */}
                            </div>
                            <div class="forms-inputs mb-4"> <span>Email</span> <input type="text" className='form-control' value={email} onChange={e => setEmail(e.target.value)}/>
                                {/* <div class="invalid-feedback">A valid email is required!</div> */}
                            </div>
                            <div class="forms-inputs mb-4"> <span>Password</span> <input type="password" className='form-control' value={password} onChange={e => setPassword(e.target.value)}/>
                                {/* <div class="invalid-feedback">Password must be 8 character!</div> */}
                            </div>
                            <div class="mb-3"> <button  class="btn btn-dark w-100" onClick={handleSubmit}>Register</button> </div>
                            If old user <Link to='/login'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register