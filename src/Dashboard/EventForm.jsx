import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { updateDoc,doc,arrayUnion } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {IoCloseSharp} from 'react-icons/io5'

const EventForm = (props) => {
    const Auth = getAuth();
    const user = Auth.currentUser;
    const navigate=useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    

    
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };
  
    const handleDateChange = (e) => {
      setDate(e.target.value);
    };

  


    const handleSubmit = async (e) => {
      e.preventDefault();
      
      props.onClose();
      if (!title || !date) {
        alert('Please fill in all fields');
        return;
      }

      try {
        const eventRef=doc(db,'users',`${user?.email}`)
        // Get current user
        if (!user) {
          // If user is not logged in, show an alert and return
          alert('Please log in to add events');
          return;
        }
        if(user?.email){
            await updateDoc(eventRef, {
              events: arrayUnion({
                title,
                date,
                uuid:uuidv4(),
              }),
            });
          } else {
            alert('Please log in to save a movie');
          }        
          setTitle('');
          setDate('');
      } catch (error) {
        console.error('Error adding event:', error);
      }
    };
  
    return (
    <div className='flex absolute w-full h-[100vh] bg-gray-800 bg-opacity-60 justify-center items-center'>
      <div className='flex w-auto bg-white p-10 rounded-lg h-auto'> 
      <form onSubmit={handleSubmit}>
        <div className="flex w-full justify-between">
        <h1 className='text-2xl mb-4 font-bold'>Add Reminder</h1> 
        <IoCloseSharp onClick={()=>props.onClose()} size='1.5rem'/>
        </div>
      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={handleTitleChange}
        className="mb-3 p-2 w-full border-gray-400 border rounded-md"
      />
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="mb-3 p-2 w-full  border-gray-400 border rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Add Event
      </button>
    </form>
    </div>
    </div>
    );
  };
  
  export default EventForm;