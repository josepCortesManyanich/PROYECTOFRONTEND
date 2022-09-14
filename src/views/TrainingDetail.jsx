import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function TrainingDetail(){
    const[training, setTraining] = useState()
    const{id} = useParams()
    const storedToken = localStorage.getItem()

    useEffect(() =>{
        const data = async () =>{
            try {
                const response =  await axios.get(`http://localhost:8000/api/v1/training/${id}`)
                setTraining(response.data.data)
            } catch (error) {
                console.error(error)
                next(error)  
            }
        }
        data()
    },[id])

    const handleChange = (e) => {
        setTraining(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
        console.log(training)
      }
    
    const handleUser = async(e) => {
        e.preventDefault();
        try {
            const newUser = await axios.put(`http://localhost:8000/api/v1/training/addUser/${id}`,training, { headers: { Authorization: `Bearer ${storedToken}` } } )
            navigate(`/training/${newUser.data.data._id}`)
            setTraining(newTraining)
        } catch (error) {
            console.error(error)
        }
    }
   /// const handleDelete = async(e) => {
        //const deletedUser = Training.filter(elem => elem.name !== name)
        //setTask(deletedTask)
      //}
    //}
       

    return (
        <div>
          {training && (
            <div>
                <h1>{training.name}</h1>
                <img src={training.image} alt="" />
                <h2>{training.date}</h2>
                <button onChange={handleUser}>ENTRENAR</button>
            </div>   
          )}
        </div>
      )


}