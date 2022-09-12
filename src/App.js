import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import Training from './views/Training';
import CreateTraining from './views/Create-Training';
import CreateEvent from './views/Create-Event';
import Event from './views/Event';



function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
        <Route path="/trainings" element={<Training/>}/>
        <Route path="/training/create" element={<CreateTraining/>}/>
        <Route path="/event" element={<Event/>}/>
        <Route path="/event/create" element={<CreateEvent/>}/> 
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
