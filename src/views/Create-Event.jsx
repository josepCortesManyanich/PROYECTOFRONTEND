import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateEvent(){
    const[event, setEvent] = useState({
        name:'',
        image:'',
        date:'',
                
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setEvent(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newEvent = await axios.post('http://localhost:8000/api/v1/event', event)
          toast.success('Event created successfully')
          navigate('/event')
          setEvent(newEvent)
        } catch (error) {
          console.error(error);
        }
      }


    

    return(
        <div>
      <form onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input type="text" name="name" placeholder="Nombre" value={event.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="URL de la imagen " value={event.image} onChange={handleChange} />
        <label>Hora del evento</label>
        <input type="text" name="date" placeholder="Hora " value={event.date} onChange={handleChange} />
        </form>
        </div>
        )
    }