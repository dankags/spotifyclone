"use client"
import Link from 'next/link'
import {  useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const Form = () => {

  const route = useRouter()
  const passwordRef=useRef()
  const [showPassWord,setShowPassWord]=useState(false)
  const [inputValue,setInputValue]=useState({
    email:"",
    password:"",
    name:"",
    gender:null
  })
  const [dateInput, setDateInput] = useState({
    day: null,
    month: "00",
    year: null,
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    const birthDate = new Date(
      parseInt(dateInput.year),
      parseInt(dateInput.month),
      parseInt(dateInput.day)
    ).toISOString();
    const formData = { ...inputValue, birthDate };
    try {
      if (birthDate) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          route.replace("/dashboard/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
   const handleShowPassword = () => {
     if (showPassWord) {
       passwordRef?.current.focus();
       setShowPassWord(!showPassWord);
       return;
     }
     passwordRef?.current.focus();
     setShowPassWord(!showPassWord);
     return;
   };
  return (
    <form onSubmit={handleRegister} className="w-10/12 flex flex-col items-center">
    <div className="w-full flex flex-col items-start gap-3">
      <div className="w-full flex flex-col">
        <label htmlFor="email" className="mb-2 text-xs font-extrabold ">
          What&apos;s your email?
        </label>
        <input
          required={true}
          type="email"
          placeholder="Enter your email."
          onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
          name="email"
          id=""
          className="py-2 pl-2 text-base font-medium placeholder:text-stone-500 placeholder:text-base placeholder:font-medium ring-1 ring-gray-500 rounded-md focus:outline-green-500"
        />
        <Link
          href=""
          className=" underline text-sm font-normal text-green-600 hover:text-green-500"
        >
          Use phone number instead
        </Link>
      </div>

      <div className="w-full flex flex-col">
        <label htmlFor="email" className="mb-2 text-xs font-extrabold ">
          Create password
        </label>
        <div className="w-full flex items-center ring-1 ring-gray-500 rounded-md focus-within:outline  focus-within:outline-green-500 focus-within:outline-2">
          <input
            ref={passwordRef}
            required={true}
            type={showPassWord ? "text" : "password"}
            onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
            placeholder="Create password."
            name="password"
            id=""
            className="w-11/12 focus:outline-none py-2 pl-2 text-base font-medium rounded-md placeholder:text-stone-500 placeholder:text-base placeholder:font-medium "
          />
            <div
            
            href=""
            className="w-1/12 mr-2 flex justify-center items-center  text-sm font-normal text-gray-600 hover:text-gray-500 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassWord ? (
              <MdOutlineVisibility size={20} />
            ) : (
              <MdOutlineVisibilityOff size={20} />
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col">
        <label htmlFor="email" className="mb-2 text-xs font-extrabold ">
          What should we call you?
        </label>
        <input
          required={true}
          onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
          type="text"
          placeholder="Enter a profile name."
          name="name"
          id=""
          className="py-2 pl-2 text-base font-medium placeholder:text-stone-500 placeholder:text-base placeholder:font-medium ring-1 ring-gray-500 rounded-md focus:outline-green-500"
        />
        <span className="text-sm font-normal">
          This appears on your profile
        </span>
      </div>
    </div>
    <div className="w-full pt-5 flex flex-col items-start gap-2">
      <span className="text-xs font-extrabold">
        What is your date of birth?
      </span>
      <div className="w-full flex items-center gap-3">
        <div className="w-3/12 flex flex-col">
          <label htmlFor="day" className="font-medium mb-2">
            Day
          </label>
          <input
            required
            placeholder="DD"
            type="number"
            onChange={(e)=>{setDateInput(prev=>({...prev,[e.target.name]:`${e.target.value<10 ? `0${e.target.value}`:`${e.target.value}`}`}))}}
            name="day"
            id="day"
            max="31"
            min="1"
            className="pl-2 py-2 ring-1 text-base font-medium ring-gray-500 rounded-md placeholder:text-stone-500 placeholder:text-base placeholder:font-medium focus:outline-green-500"
          />
        </div>

        <div className="w-6/12 flex flex-col ">
          <label htmlFor="month" className="font-medium mb-2">
            Month
          </label>
          <select
            name="month"
            id="month"
            onChange={(e)=>{setDateInput(prev=>({...prev,[e.target.name]:`${months.indexOf(e.target.value)<10 ? `0${months.indexOf(e.target.value)}`:`${months.indexOf(e.target.value)}` }`}))}}
            placeholder="Month"
            required
            className="pl-2 py-2 ring-1 ring-gray-500 rounded-md text-base font-medium focus:outline-green-500"
          >
            {/* <option value="" selected disabled className='text-stone-400 text-base font-medium'>Month</option> */}
            {months.map((month, i) => (
              <option
                value={month}
                key={i}
                className=" text-base font-medium hover:bg-neutral-500 hover:text-neutral-50"
              >
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="w-3/12 flex flex-col">
          <label htmlFor="year" className="font-medium mb-2">
            Year
          </label>
          <input
            required
            placeholder="YYYY"
            type="number"
            onChange={(e)=>{setDateInput(prev=>({...prev,[e.target.name]:e.target.value}))}}
            name="year"
            id="year"
            min="1990"
            className="pl-2 py-2 text-base font-medium ring-1  ring-gray-500 rounded-md placeholder:text-stone-500 placeholder:text-base placeholder:font-medium focus:outline-green-500"
          />
        </div>
      </div>
    </div>

    <div className="w-full flex flex-col items-start gap-3">
      <div className="pt-4">
        <span className="text-xs font-extrabold">
          What&apos;s your gender?
        </span>

        <div className="pt-3">
          <div className="flex gap-4 pb-3">
            <input type="radio" required name="gender"  onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}} id="Male" value="male" className="" />
            <label className="mr-4 text-sm font-bold " htmlFor="Male">
              Male
            </label>
            <input
              type="radio"
              required
              name="gender"
              onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
              id="Female"
              value="Female"
            />
            <label className="mr-4 text-sm font-bold " htmlFor="Female">
              Female
            </label>
            <input
              type="radio"
              required
              name="gender"
              onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
              id="nonBinary"
              value="Non binary"
            />
            <label
              className="mr-4 text-sm font-bold "
              htmlFor="nonBinary"
            >
              Non binary
            </label>
          </div>
          <input
            type="radio"
            required
            name="gender"
            onChange={(e)=>{setInputValue(prev=>({...prev,[e.target.name]:e.target.value}))}}
            id="notToSay"
            value="Prefer not to say"
          />
          <label className="ml-2 text-sm font-bold " htmlFor="notToSay">
            Prefer not to say
          </label>
        </div>

        <div className="pt-5 flex flex-col gap-3">
          <div>
            <input
              type="checkbox"
              required
              name=""
              id=""
              className="accent-green-500 mr-2"
            />
            <span className="text-sm font-semibold">
              I would prefer not to receive marketing messages from
              spotify
            </span>
          </div>
          <div>
            <input
              type="checkbox"
              required
              name=""
              id=""
              className="accent-green-500 mr-2"
            />
            <span className="text-sm font-semibold">
              Share my registration data with spotify&apos;s content
              providers for marketing purposes
            </span>
          </div>
        </div>
      </div>
    </div>

    <button
      type="submit"
      className="w-5/12 mt-4 py-3 px-6 rounded-3xl text-base font-bold text-black bg-green-500 hover:bg-green-400 "
    >
      Sign up
    </button>
  </form>
  )
}
