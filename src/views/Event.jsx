import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

export default function Event() {
    const[event, setEvent] = useState()

    useEffect(() =>{
        const data= async () =>{
            try {
                const response =  await axios.get('http://localhost:8000/api/v1/event')
                setEvent(response)
            } catch (error) {
                console.error(error) 
            }
        }
        data()
    },[])

    return(
        <div>
            {event&& event.map(elem =>{
                return <p key= {elem._id}>{elem.name}</p> 
            })}
            <Outlet/>
        </div>
    )

}