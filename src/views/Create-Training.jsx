import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import Logo from '../images/LOGO.jpg'

export default function CreateTraining(){
    const[training, setTraining] = useState({
        name:'',
        imageUrl:'',
        date:'',
        category:'',  
    })
    const navigate = useNavigate()

    useEffect(() => {
      
    }, [training])

    const handleChange = (e) => {
       
        setTraining(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
      }
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newTraining = await axios.post('http://localhost:8000/api/v1/training', training)
          toast.success('Project created successfully')
          navigate(`/training`)
          setTraining(newTraining)
        } catch (error) {
          console.error(error);
        }
      }
      const handleFileUpload = async(e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        try {
          const response = await axios.post('http://localhost:8000/api/v1/training/upload', uploadData);
          
          setTraining(prev => {
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
      <h1 className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2"> ORGANIZA UN ENTRENO!</h1>
      <br/>
      <form className= "h-100 flex flex-col align-center justify-around mt-3" onSubmit={handleSubmit}>

        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Nombre</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " type="text" name="name" placeholder="Nombre" value={training.name} onChange={handleChange}/>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Imagen</label>
        <input  type="file" name="image" onChange={handleFileUpload} />
        <br/>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Hora de entreno</label>
        <input className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " type="text" name="date" placeholder="Hora " value={training.date} onChange={handleChange} />
        <br/>
        <label className="uppercase tracking-wide text-red-700 text-xl font-bold mb-2">Categoria</label>
        <select className="mb-3 w-full rounded-lg border shadow-xl h-12 pl-4 " id="category" name="category" value={training.category} onChange={handleChange}>
            <option className="uppercase tracking-wide text-red-700 text-lg font-bold mb-2" value="pads">Paos</option>
            <option className="uppercase tracking-wide text-red-700 text-lg font-bold mb-2" value="airbyke">AirByke</option>
            <option className="uppercase tracking-wide text-red-700 text-lg font-bold mb-2" value="tabata">Tabata</option>
            <option className="uppercase tracking-wide text-red-700 text-lg font-bold mb-2" value="sparring">Sparring</option>
        </select>  
        <br/>            
        <button  className='inline-flex items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 '  type="submit">CREAR</button>
      </form>
      <img className="h-full w-full object-cover object-center"src={Logo} alt=""/>
      </div>
      </div>
    )
}