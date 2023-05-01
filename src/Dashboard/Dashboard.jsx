import { useEffect, useState } from 'react';
import EventForm from './EventForm';
import EventList from './EventList';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Dashboard = () => {
  const [isPopUp,setIsPopUp]=useState(false);
  const navigate=useNavigate();
  const Auth = getAuth();
  const user = Auth.currentUser;

  useEffect(() => {
    if(!user){navigate('/');}
    }, [user]);


    const logout = async() => {
    await signOut(Auth);
      navigate('/');
    };


  return (
  <div className='flex flex-col w-full min-h-[100vh]'>
  <div className='flex w-full justify-between items-center p-10 h-20 bg-black '>
    <h2 className='text-white text-4xl '>Reminder App</h2>
    <div>
    <button type="submit" className='bg-blue-400 text-white text-lg p-2 font-bold rounded-md mr-4' onClick={()=>setIsPopUp(true)}>Add Reminder</button>
    <button onClick={()=>logout()} className='bg-blue-400 text-white text-lg p-2 font-bold rounded-md'>Logout</button>
  </div>
  </div>
  {isPopUp&&<EventForm onClose={()=>setIsPopUp(false)}/>}
  <EventList/>
  </div>

  )
}

export default Dashboard
