import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Logo from '../images/LOGO.jpg';

export default function Profile() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('authToken');
  const { user, logOutUser } = useContext(AuthContext);

  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    imageUrl: user.imageUrl,
  })

  const handleChange = (e) => {
    setUserData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/user/edit`, userData, { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('User edited successfully. Please log in again.');
      logOutUser();
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }
  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/upload`, uploadData);
      setUserData(prev => {
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
    <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
      <h1 className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">EDITAR PERFIL</h1>
      <form className= "h-100 flex flex-col align-center justify-around mt-3"onSubmit={handleSubmit}>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Nombre de usuario:</label>
            <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "
            required type="text" 
            name="username" 
            value={userData.username} 
            onChange={handleChange} />
        <br/>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2"> IMAGEN</label>
            <input type="file" name="image"  onChange={handleFileUpload} />
            <br/>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Email:</label>
        <input 
            className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 "
            required type="email" 
            name="email" 
            value={userData.email} 
            onChange={handleChange} />

        <button 
            className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 ' 
            type="submit">EDITA TU PERFIL</button>
      </form>
      <img src= {Logo} alt='' width='100%'/>
    </div>
  )
}

   





