import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


export default function EventDetail(){
    const[event, setEvent] = useState()
    const{id} = useParams()
    const[user, setUser] = useState()
    const storedToken = localStorage.getItem()
    const navigate = useNavigate()

    useEffect(() =>{
        const data = async () =>{
            try {
                const response =  await axios.get(`http://localhost:8000/api/v1/event/${id}`)
                setEvent(response.data.data)
            } catch (error) {
                console.error(error)
                  
            }
        }
        data()
    },[id])

    const handleChange = (e) => {
        setEvent(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
        console.log(event)
      }
    
    const handleUser = async(e) => {
        e.preventDefault();
        try {
            const newUser = await axios.get(`http://localhost:8000/api/v1/event/addUser/${id}`,event, { headers: { Authorization: `Bearer ${storedToken}` } } )
            toast.success('User added')
            navigate('/event')
            setUser(newUser)
        } catch (error) {
            console.error(error)
        }
    }

    const handleUserDeleted = async(e) => {
        e.preventDefault();
        try {
            const deletedUser = await axios.get(`http://localhost:8000/api/v1/training/addUser/${id}`,event, { headers: { Authorization: `Bearer ${storedToken}` } } )
            toast.success('toast deleted')
            navigate('/event')
            setUser(deletedUser)
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
                <button onChange={handleUser}>ASISTIR</button>
                <button onChange={handleUserDeleted}> NO ASISTIR</button>
            </div>   
          )}
        </div>
      )


}