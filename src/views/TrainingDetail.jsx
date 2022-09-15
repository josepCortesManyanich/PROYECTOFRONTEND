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


  useEffect(() => {
        const data = async () =>{
            try {
                const response =  await axios.get(`http://localhost:8000/api/v1/training/${id}`)
              setTraining(response.data.data);
              const filtered = response.data.data.usersAttending.filter(elem => elem._id == user._id);
              console.log(filtered);
              console.log(training)
              if (filtered.length > 0) {
                console.log('User is in array')
                setAttending(true)
              }
              console.log(isAttending)
            } catch (error) {
                console.error(error)
                 
            }
        }
        data()
    },[id, isAttending])

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
            await axios.get(`http://localhost:8000/api/v1/training/addUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
           toast.success('User added')
           setAttending(true)
        } catch (error) {
          console.error(error)
       }
    }

   const handleUserDeleted = async(e) => {
       e.preventDefault();
       try {
           await axios.get(`http://localhost:8000/api/v1/training/deleteUser/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } } )
           toast.success('User deleted')
            setAttending(false)
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
            <ul>
              {training.usersAttending && training.usersAttending.map(user => {
                return <li key={user._id}>{user.username}</li>
                  })}
            </ul>
            {!isAttending && <button onClick={handleUser}> ENTRENAR</button>}
            {isAttending && <button onClick={handleUserDeleted}> NO ASISTIR</button>}
               
            </div>   
          )}
        </div>
      )


}