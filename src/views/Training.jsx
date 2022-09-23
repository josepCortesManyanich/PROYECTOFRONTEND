import React, {useEffect, useState } from "react";
import {Link} from "react-router-dom";
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
        <ul  className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {training && training.map((elem) => (
          <li
            key={elem._id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
            <Link to={`${elem._id}`}><img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={elem.imageUrl} alt="Training image" /></Link>
              <h3 className="mt-6 text-sm font-medium text-gray-900">{elem.name}</h3>
            </div>
          </li>
        ))}
      </ul>
    )
}