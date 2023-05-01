import React,{useEffect, useState} from 'react';
import {FcGoogle} from 'react-icons/fc'
import { auth, db} from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const Login = () => {

  const [isLogin,setIsLogin] = useState(false);
  
  const [user] = useAuthState(auth);

  const [loginEmail,setLoginEmail] = useState("");
  const [loginPassword,setLoginPassword] = useState("");

  const [registerEmail,setRegisterEmail] = useState("");
  const [registerPassword,setRegisterPassword] = useState("");
  const [registerName,setRegisterName] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/dashboard");
  },[user])

  const googleProvider = new GoogleAuthProvider();
console.log(JSON.stringify( import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY));



const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      setDoc(doc(db, 'users', user.email), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        events:[]
    })
    }
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const authentication = getAuth();
      console.log(name,email,password);
      const res = await createUserWithEmailAndPassword(authentication, email, password);
      const user = res.user;
      await setDoc(doc(db, 'users', email), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        events:[]
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center w-full h-[100vh] ">
      {
        isLogin? (
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
          <h2 className='p-3 text-3xl font-bold text-black'>Reminder App</h2>
          <div className="inline-block border-[1px] justify-center w-full border-blue-400 border-solid"></div>
          <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>
         
          {/* Inputs */}
          <div className='flex flex-col w-[70%] items-center justify-center'>
           <input onChange={(e)=>setLoginEmail(e.target.value)} value={loginEmail} type='email' className='rounded-xl h-14 px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Email'></input>
           <input onChange={(e)=>setLoginPassword(e.target.value)} value={loginPassword} type="password" className='rounded-xl h-14 px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password'></input>
           <div className='flex space-x-2 m-4 items-center justify-center'>
           <button  onClick={() => logInWithEmailAndPassword(loginEmail, loginPassword)} className='rounded-2xl m-2 ml-14 text-white bg-blue-400 w-48 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
             Sign In
           </button>
             <div onClick={signInWithGoogle} className="socialIcon">
             <FcGoogle className='h-10 w-10'/>  
             </div>
          </div>
          </div>
          <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
          <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
          <p className='text-black mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(false)}>Create a New Account?</p>
       </div>
        ):(
          <div className="bg-black text-white rounded-2xl shadow-2xl  flex flex-col w-full  md:w-2/6 items-center max-w-4xl transition duration-1000 ease-in">
          <h2 className='p-3 text-3xl font-bold text-white'>Reminder App</h2>
         <div className="inline-block border-[1px] justify-center w-full border-white border-solid"></div>
         <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
         {/* Inputs */}
         <div className='flex flex-col w-[70%] text-black items-center justify-center mt-2'>
         <input value={registerName}  onChange={(e)=>{setRegisterName(e.target.value)}} className='rounded-xl h-14 px-2 py-1 w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Name' ></input>
          <input type='email' className='rounded-xl h-14 px-2 py-1 w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Email' value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)}></input>
          <input type="password" className='rounded-xl h-14 px-2 py-1 w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' placeholder='Password' value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)}></input>
          <div className='flex space-x-2 m-4 items-center justify-center'>
          <button onClick={()=>{registerWithEmailAndPassword(registerName,registerEmail,registerPassword);
            setIsLogin(true);
          }} className='rounded-2xl m-2 ml-14 text-black bg-white w-48 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'>
            Sign Up
          </button>
            <FcGoogle onClick={signInWithGoogle} className='h-10 w-10'/>  
            </div>
         </div>
         
         <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
         <p className='text-white mt-4 text-sm'>Already have an account?</p>
         <p className='text-blue-400 mb-4 text-sm font-medium cursor-pointer' onClick={() => setIsLogin(true)}>Sign In to your Account</p>
      </div>
        )
      }
    </div>
  )
}

export default Login;