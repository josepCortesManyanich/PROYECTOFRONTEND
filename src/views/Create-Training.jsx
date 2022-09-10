import React from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function CreateTraining(){
    const[training, setTraining] = useState({
        name:'',
        image:'',
        date:'',
        category:'',
        
    })
    const navigate = useNavigate()

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
          navigate(`/training/${newTraining.data.data._id}`)
        } catch (error) {
          console.error(error);
        }
      }


    

    return(
        <div>
      <form onSubmit={handleSubmit}>

        <label>Nombre</label>
        <input type="text" name="name" placeholder="Nombre" value={training.name} onChange={(e) => setTraining(e.target.value)}/>
        <input type="text" name="image" placeholder="URL de la imagen " value={training.image} onChange={(e) => setTraining(e.target.value)} />
        <label>Hora de entreno</label>
        <input type="text" name="date" placeholder="Hora " value={training.date} onChange={(e) => setTraining(e.target.value)} />
        <label>Categoria</label>
        <input type="text" name="image" placeholder="URL de la imagen " value={training.image} onChange={(e) => setTraining(e.target.value)} />
        <select id="category" name="category">
        {/*<option value={training.}>Pads</option>
            <option value="airbyke">Air Byke</option>
            <option value= "tabata"> Tabata</option>
    <option value= "sparring">  Sparring</option>*/}
        </select>              
        <button type="submit">Save</button>
      </form>
      </div>
    )
}