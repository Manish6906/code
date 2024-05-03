import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Home() {
    const [length , setLength]= useState(8)
    const [number, setNumber]= useState(false)
    const [character , setCharacter]= useState(false)
    const [password , setPassword]= useState("")

const passwordRef= useRef(null)

const copyText=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
},[password])

    const passwordGen= useCallback(()=>{
        let str="";
        let pass="ABCEFGHIJKLNMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
        if(number) pass +="1234567890"
        if(character) pass += "~!@#$%^&*()_++-;:<>,./?\|"

        for(let i=1 ;i<=length;i++)
        {
            let char= Math.floor(Math.random() * pass.length +1)
            str += pass.charAt(char)
        }
        setPassword(str)
    },[length,number,character, setPassword])

    useEffect(()=>{
        passwordGen()
    },
        [length,number,character,passwordGen]
    )
  return (
    <>
    <div className='w-full max-w-sm mx-auto  rounded-lg px-3 my-8 bg-[#FFC470]  '>
     <h1 className='text-teal-900 font-bold font-serif  text-2xl'> Text Generator</h1>

     <input type="text" placeholder='text' className=' rounded-l-md outline-0'readOnly ref={passwordRef} value={password}/> 
     <button className='bg-blue-500 text-white  rounded-tr-lg rounded-br-md active:opacity-75' onClick={copyText}>Copy Text</button><br/>

     <input type='range' min={8} max={15} value={length} onChange={(e)=>{setLength(e.target.value)}}></input><br/>
     <label htmlFor="">Length: {length} </label>
   <br/>
     <input type='checkbox' defaultValue={number} onChange={() =>{setNumber((pre)=> !pre)}}></input>
     <label htmlFor="" >Number</label><br/>
     <input type='checkbox' defaultValue={character} onChange={()=>{setCharacter((pre)=> !pre)}}></input>
     <label htmlFor=""  >Character</label><br/>
    <button className='bg-blue-700 text-white rounded-md active:opacity-75' onClick={passwordGen}>Refresh</button>
    </div>
    </>
  )
}
