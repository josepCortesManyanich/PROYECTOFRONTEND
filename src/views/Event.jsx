import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

export default function Event() {
    const[event, setEvent] = useState()

    useEffect(() =>{
        const data= async () =>{
            try {
                const response =  await axios.get('http://localhost:8000/api/v1/event')
                setEvent(response.data.data)
            } catch (error) {
                console.error(error) 
            }
        }
        data()
    },[])

    return(
        <div>
            {event&& event.map(elem =>{
                return <p key= {elem._id}><Link to={`${elem._id}`}><img src={elem.image} alt=""/>{elem.name}</Link></p> 
            })}
            <Outlet/>
        </div>
    )

}