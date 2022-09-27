import React , {useContext} from 'react'
import Logo from '../images/LOGO.jpg'
import { AuthContext } from '../context/AuthContext';



export default function Home() {
  
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div >
      <div className="relative ">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden"></div>
          <>
          <img className="h-full w-full object-cover object-center"src={Logo} alt=""/>
          </>
          <div className="relative mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
          {isLoggedIn ? <p>''</p> : <a
            href="/signup"
          >
           <button className='mx-auto items-center px-3.5 py-2 border border-transparent uppercase tracking-wide text-xl font-bold mb-2 text-white bg-red-700 hover:bg-red-700 ' > REGISTRATE</button>
          </a>}
          </div>
   
    
    </div>
    </div>
  )
}

