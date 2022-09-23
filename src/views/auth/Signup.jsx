import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/LOGO.jpg'

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    imageUrl:'',
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
      setErrorMessage("Las contraseñas no coinciden")
    } else {
      setErrorMessage(undefined)
    }
    
  }, [passwordControl])

  const handleSubmit = async (e) => {
    console.log(user)
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password, imageUrl: user.imageUrl });
      console.log(res)
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }
  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/upload`, uploadData);
      console.log(response)

      setUser(prev => {
        return {
          ...prev,
          imageUrl: response.data.fileUrl
        }
      })
    }
    catch(error){
      console.error(error)
    }
  }
  

  return (
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <form className= "h-100 flex flex-col align-center justify-around mt-3"onSubmit={handleSubmit}>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Nombre de usuario:</label>
        <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "
            required type="text" 
            name="username" 
            value={user.username} 
            onChange={handleChange} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Imagen</label>
        <input type="file" name="image" onChange={handleFileUpload} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Email:</label>
        <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "
            required type="email"
            name="email" 
            value={user.email} 
            onChange={handleChange} />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Contraseña:</label>
        <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "
            required type="password" 
            name="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value) } />
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Repite la contraseña:</label>
        <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " 
            required type="password" name="passwordControl" 
            value={passwordControl} 
            onChange={(e) => setPasswordControl(e.target.value)} />
        {errorMessage && <p className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">{errorMessage}</p>}
        <button 
            className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 ' 
            type="submit">Registrate</button>
      </form>
     <img src= {Logo} alt='' width='100%'/>
    </div>
  )
}
