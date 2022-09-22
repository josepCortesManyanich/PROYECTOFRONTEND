import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [showNavbar, setShowNavbar] = useState(false)
  const navigate = useNavigate();
  const handleNavbar = () => setShowNavbar(prev => !prev)
  return (
    <div className='flex items-center uppercase tracking-wide text-red-700 text-xl font-bold mb-2'>
    
      {user && <p>Hello {user.username}</p> }
      <FontAwesomeIcon icon={faBars} className={`text-3xl ${!showNavbar && "text-red"}`} onClick={handleNavbar}/>
      <nav className={"flex w-full justify-around  uppercase tracking-wide text-red-700 text-xl font-bold mb-2 " + (!showNavbar ? "hidden" : "")}>
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink>}
        {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/private">Private view</NavLink>}
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
        <button onClick={() => navigate(-1)}>Go back</button>
      </nav>
    </div>
   
  )
}
