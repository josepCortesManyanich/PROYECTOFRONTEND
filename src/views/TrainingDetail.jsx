import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function TrainingDetail(){
    const[training, setTraining] = useState()
    const{id} = useParams()

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
    

    //const handleSubmit = async (e) => {
       // e.preventDefault();
       //  try {
       //     const newTraining = await axios.put(`http://localhost:8000/api/v1/training/${id}`, training);
       //     navigate(`/training/${newTraining.data.data._id}`)
      //      setTraining(newTraining)
      //  } catch (error) {
      //      console.error(error);
      //  }
   // }

    return (
        <div>
          {training && (
            <div>
                <h1>{training.name}</h1>
                <img src={training.image} alt="" />
                <h2>{training.date}</h2>
            </div>   
          )}
        </div>
      )


}