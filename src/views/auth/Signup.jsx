import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
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

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])

  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      console.log(res)
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  

  return (
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <form onSubmit={handleSubmit}>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Username:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "required type="text" name="username" value={user.username} onChange={handleChange} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Email:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "required type="email" name="email" value={user.email} onChange={handleChange} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Password:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Repeat the password:</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">{errorMessage}</p>}
        <button className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2' type="submit">Register</button>
      </form>
    </div>
  )
}
