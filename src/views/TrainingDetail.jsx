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
}