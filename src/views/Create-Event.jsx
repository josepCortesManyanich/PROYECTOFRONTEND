import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import Logo from '../images/LOGO.jpg'

export default function CreateEvent(){
    const[event, setEvent] = useState({
        name:'',
        imageUrl:'',
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
      const handleFileUpload = async(e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        try {
          const response = await axios.post('http://localhost:8000/api/v1/event/upload', uploadData);
          
          setEvent(prev => {
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
 
    return(
      <div  className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <h1 className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2"> ORGANIZA UN EVENTO</h1>
            <br/>
            <form className= "h-100 flex flex-col align-center justify-around mt-3" onSubmit={handleSubmit}>
              <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Nombre</label>
              <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " type="text" name="name" placeholder="Nombre" value={event.name} onChange={handleChange}/>
              <br/>
              <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Imagen</label>
              <input  type="file" name="image" onChange={handleFileUpload} />
              <br/>
              <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Hora del evento</label>
              <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " type="text" name="date" placeholder="Hora " value={event.date} onChange={handleChange} />
              <br/>
              <button  className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 '  type="submit">CREAR</button>
            </form>
            <img className="h-full w-full object-cover object-center"src={Logo} alt=""/>
        </div>
      </div>
        )
    }