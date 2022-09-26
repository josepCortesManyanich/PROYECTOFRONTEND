import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


export default function EventDetail(){
    const[event, setEvent] = useState()
    const{id} = useParams()
    const storedToken = localStorage.getItem('authToken')
    const[isAttending, setAttending] = useState(false)
    const{user} = useContext(AuthContext)

    useEffect(() =>{
        const data = async () =>{
            try {
                const response =  await axios.get(`http://localhost:8000/api/v1/event/${id}`)
                setEvent(response.data.data)
                const filtered = response.data.data.usersAttending.filter(elem => elem._id === user._id);
              if (filtered.length > 0) {
                setAttending(true)
              }
            } catch (error) {
                console.error(error)
                  
            }
        }
        data()
    },[id,user._id])

   
    
      const handleUser = async(e) => {
        e.preventDefault();
         try {
             await axios.get(`http://localhost:8000/api/v1/event/addUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
            toast.success('User added')
            setAttending(true)
         } catch (error) {
           console.error(error)
        }
     }
 
    const handleUserDeleted = async(e) => {
        e.preventDefault();
        try {
            await axios.get(`http://localhost:8000/api/v1/event/deleteUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
            toast.success('User deleted')
             setAttending(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
      <>
      {event && 
      <>
      <h1 className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">{event.name}</h1>
      <img  src={event.imageUrl} alt="" />
      <h2 className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">{event.date}</h2></>}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {event && event.usersAttending.map((elem) => (
      <li
        key={elem._id}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
      >
        <div className="flex flex-1 flex-col p-8">
          <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={elem.imageUrl} alt="" />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{elem.username}</h3>
        </div>
        <div>
        </div>
      </li>
    ))}
  </ul>
  {!isAttending && <button className='mx-auto items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 ' onClick={handleUser}> ENTRENAR</button>}
  {isAttending && <button className='mx-auto items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 ' onClick={handleUserDeleted}> NO ASISTIR</button>}
  </>
         
      )


}
 
       

   





