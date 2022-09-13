import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateTraining(){
    const[training, setTraining] = useState({
        name:'',
        imageUrl:'',
        date:'',
        category:'',  
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log(training)
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
        } catch (error) {
          console.error(error);
        }
      }
      const handleFileUpload = async(e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        try {
          const response = await axios.post('http://localhost:8000/api/v1/training/upload', uploadData);
          console.log(response.data.fileUrl);
    
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
        <div>
      <form onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input type="text" name="name" placeholder="Nombre" value={training.name} onChange={handleChange}/>
        <label>Imagen</label>
        <input type="file" name="image"  value={training.image} onChange={handleFileUpload} />
        <label>Hora de entreno</label>
        <input type="text" name="date" placeholder="Hora " value={training.date} onChange={handleChange} />
        <label>Categoria</label>
        <select id="category" name="category" value={training.category} onChange={handleChange}>
            <option value="pads">Pads</option>
            <option value="airbyke">Air Byke</option>
            <option value="tabata">Tabata</option>
            <option value="sparring">Sparring</option>
        </select>              
        <button type="submit">Save</button>
      </form>
      </div>
    )
}