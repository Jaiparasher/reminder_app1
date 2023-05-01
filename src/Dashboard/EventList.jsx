import React, { useState, useEffect} from 'react';
import { db } from '../firebase';
import {  doc, onSnapshot, updateDoc } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import {MdDelete} from 'react-icons/md'




const EventList = () => {
  const [events, setEvents] = useState([]);
  const Auth = getAuth();
  const user = Auth.currentUser;

  useEffect(()=>{
    if(user?.email){
    onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
     setEvents(doc.data()?.events);
     console.log(events);
    })}
   },[user?.email]);

   const eventRef=doc(db,'users',`${user?.email}`)
      const deleteEvent=async(passedID)=>{
        try {
            const result=events.filter((item)=>item.uuid!==passedID);
            await updateDoc(eventRef ,{
                events:result
            })
        } catch (error) {
            console.log(error);
        }
      }


  return (
    <div>
      <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {events.map((event) => (
          <div key={event.uuid} className="flex justify-between bg-slate-600 rounded-xl p-8 md:[30vw] lg:w-[20vw] items-center mb-2">
            <div>
              <h3 className="font-bold text-white text-2xl mb-3">{event.title}</h3>
              <p className="text-gray-300">{event.date}</p>
            </div>
            <MdDelete onClick={()=>deleteEvent(event.uuid)} color='white' size='2rem'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;