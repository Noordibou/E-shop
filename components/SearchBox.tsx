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
    className='max-w-6xl mx-auto flex justify-between items-center px-5'>
        <input type='text'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder='Search...'
         className='flex-1 placeholder-gray-500 text-gray-500 outline-none  dark:text-orange-400'/>
        <button type='submit'
        disabled={!input}
        className='text-orange-400 disabled:text-gray-400'>Search</button>
    </form>
  )
}
