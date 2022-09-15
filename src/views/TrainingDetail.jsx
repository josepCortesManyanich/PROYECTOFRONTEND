import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";

export default function TrainingDetail(){
    const[training, setTraining] = useState()
    const{id} = useParams()
    const storedToken = localStorage.getItem('authToken')
  const navigate = useNavigate();
  const [isAttending, setAttending] = useState(false);
    const { user } = useContext(AuthContext)


    useEffect(() =>{
        const data = async () =>{
            try {
                const response =  await axios.get(`http://localhost:8000/api/v1/training/${id}`)
             setTraining(response.data.data);
             console.log(training)
             if( training.usersAttending.includes(user._id)){
                setAttending(true)
                console.log(setAttending)   
             }
             
              // KATA: si el user._id ya está en userAttending
              // Actualizo el estado
            } catch (error) {
                console.error(error)
                 
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
            const newUser = await axios.get(`http://localhost:8000/api/v1/training/addUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
           toast.success('User added')
           navigate('/training')
           setTraining(newUser)
        } catch (error) {
          console.error(error)
       }
    }

   const handleUserDeleted = async(e) => {
       e.preventDefault();
       try {
           const deletedUser = await axios.get(`http://localhost:8000/api/v1/training/addUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
           toast.success('User deleted')
           setTraining(deletedUser)
       } catch (error) {
           console.error(error)
       }
   }
 
       

    return (
        <div>
          {training && (
            <div>
                <h1>{training.name}</h1>
                <img src={training.image} alt="" />
                <h2>{training.date}</h2>
                <p>{training.usersAttending}</p>
            {!isAttending && <button onClick={handleUser}> ENTRENAR</button>}
            {isAttending && <button onClick={handleUserDeleted}> NO ASISTIR</button>}
               
            </div>   
          )}
        </div>
      )


}