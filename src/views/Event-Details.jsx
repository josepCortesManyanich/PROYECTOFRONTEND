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
    },[id])

   
    
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
        <div>
          {event && (
            <div>
                <h1>{event.name}</h1>
                <img src={event.image} alt="" />
            <h2>{event.date}</h2>
            <p>{event.description}</p>
            <ul>
              {event.usersAttending && event.usersAttending.map(user => {
                return <li key={user._id}>{user.username}</li>
                  })}
            </ul>
            {!isAttending && <button onClick={handleUser}> ASISTIR</button>}
            {isAttending && <button onClick={handleUserDeleted}> NO ASISTIR</button>}
               
            </div>   
          )}
        </div>
      )


}
 
       

   





