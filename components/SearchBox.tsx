"use client";
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBox() {
    const [input, setInput]= useState("")
    const router = useRouter()
    const handleSearch = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(input){
            router.push(`/search?term=${input}`)
        }

    }
  return (
    <form 
    onSubmit={handleSearch}
    className='flex justify-end mr-4'>
        <input type='text'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Search...'
         className=' placeholder-gray-500 text-gray-800 px-2 rounded-md outline-none w-[40%] h-[50%] mt-3 mr-1  dark:text-mainColor'/>
        <button type='submit'
        disabled={!input}
        className='text-mainColor bg-bgColor rounded-full my-3 font-titleFont outline-none  px-1 disabled:text-black'>Search</button>
    </form>
  )
}
