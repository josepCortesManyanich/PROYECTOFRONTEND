import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

export default function Training() {
    const[training, setTraining] = useState()

    useEffect(() =>{
        const data= async () =>{
            try {
                const response =  await axios.get('http://localhost:8000/api/v1/training')
                setTraining(response)
            } catch (error) {
                console.error(error) 
            }
        }
        data()
    },[])

    return(
        <div>
            {training&& training.map(elem =>{
                return <p key= {elem._id}>{elem.name}</p> 
            })}
            <Outlet/>
        </div>
    )

}