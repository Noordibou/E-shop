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
    className='flex'>
        <input type='text'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Search...'
         className=' placeholder-gray-500 text-gray-800 px-2 rounded-md outline-none  dark:text-orange-400'/>
        <button type='submit'
        disabled={!input}
        className='text-mainColor font-semibold font-titleFont outline-none  px-1 disabled:text-bgColor'>Search</button>
    </form>
  )
}
