import React, {useEffect, useState } from "react";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

export default function Training() {
    const [training, setTraining] = useState(null);

    useEffect(() =>{
        const data= async () =>{
            try {
                const response = await axios.get('http://localhost:8000/api/v1/training');
                setTraining(response.data.data)
            } catch (error) {
                console.error(error) 
            }
        }
        data()
    },[])

    return (
        <div>
            <h3>Trainings</h3>
            {training&& training.map(elem =>{
                return <div key={elem._id}><Link to={`${elem._id}`}><img src={elem.imageUrl} alt=""/></Link></div>
            })}
            <Outlet/>
        </div>
    )

}