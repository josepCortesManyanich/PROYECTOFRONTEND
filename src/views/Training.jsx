import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

export default function Training() {
    const[training, setTraining] = useState(null)

    useEffect(() =>{
        const data= async () =>{
            try {
                const response =  await axios.get('http://localhost:8000/api/v1/training')
                console.log(response)
                setTraining(response.data.data)
            } catch (error) {
                console.error(error) 
            }
        }
        data()
    },[])

    return(
        <div>
            {training&& training.map(elem =>{
                return <div key={elem._id}>
                            <img src={elem.image} alt={elem.name} />
                            <h1>{elem.date}</h1>
                        </div>
            })}
            <Outlet/>
        </div>
    )

}