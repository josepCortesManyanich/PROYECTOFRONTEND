import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/LOGO.jpg'

export default function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
      toast.success('Welcome back!')
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
    <div className="md:w-1/2 h-max px-3 mb-6 md:mb-0">
      <form onSubmit={handleSubmit}>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Email:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "required type="email" name="email" value={user.email} onChange={handleChange} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Contraseña:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "required type="password" name="password" value={user.password} onChange={handleChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700' type="submit">ENTRAR </button>
      </form>
      <img src={logo} alt=''/>
    </div>
    </div>
  )
}
