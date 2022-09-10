import React from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateTraining(){
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
          toast.success('Project created successfully')
          navigate(`/event/${newEvent.data.data._id}`)
        } catch (error) {
          console.error(error);
        }
      }


    

    return(
        <div>
      <form onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input type="text" name="name" placeholder="Nombre" value={event.name} onChange={(e) => setEvent(e.target.value)}/>
        <input type="text" name="image" placeholder="URL de la imagen " value={event.image} onChange={(e) => setEvent(e.target.value)} />
        <label>Hora del evento</label>
        <input type="text" name="date" placeholder="Hora " value={event.date} onChange={(e) => setEvent(e.target.value)} />
        </form>
        </div>
        )
    }