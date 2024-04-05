import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.username.length >= 3 && data.password.length >= 4) {
      axios.put(`http://localhost:3000/user`, data)
        .then(response => {
          console.log(response);
          navigate("/");

          login(data)
        })
        .catch(error => {
          console.log(error);
        });

    }
    return;
  }



  return (
    <div className=' p-5 container '>
<h1 className='text-center'>Are you registered? </h1>
<h3 className='text-center text-danger'>register to access</h3>
      <form className='p-5 w-50 bg-warning mx-auto rounded-pill ' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='form-label text-light' htmlFor="username">Username</label>
          <input type="text" className='form-control' placeholder='Username' id='username'
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />

        </div>
        <div className='mb-4'>
          <label className='form-label text-light' htmlFor="password">Password</label>
          <input type="password" typeof="number" className='form-control ' placeholder='Password' id='password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />

        </div>
        <div className='text-center'>

          <button disabled={!data.username || !data.password} className='btn btn-sm btn-light btn-outline-success    w-50' type='submit'

          > Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login