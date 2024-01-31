"use client"
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { MdOutlineEdit } from 'react-icons/md'
import { useSession } from 'next-auth/react'

const UserDialog = ({children,setImgName}) => {
    const {data,update}=useSession();
    const [personalInfo,setPersonalinfo]=useState({
        img:'',
        name:''
    })
    const[imageFile,setImgFile]=useState(null)

    useEffect(() => {
      const upload = async () => {
        const formData = new FormData()
      const imageUniqueId = new Date().getTime + imageFile.name
      formData.append("file", imageFile)
      formData.append("publicId",imageUniqueId)
      formData.append("upload_preset","my-uploads")
      const cloudinaryRes=await fetch("https://api.cloudinary.com/v1_1/dxqbb56ul/image/upload",{
        method:"POST",
        body:formData
      }).then(res => res.json()).catch((error) => {
        console.log(error)
        return
      })
      update({image:`${cloudinaryRes.url}`})
    // setImgCloudinaryUrl(`${cloudinaryRes.url}`)
      }
      imageFile&&upload()
    },[imageFile])

    const handleInputs=(e)=>{
      const {name,value}=e.target;
      if(name == "file"){
        const file=e.target.files[0];
        if(file){
        setImgFile(file)  
        const ImgUrl=URL.createObjectURL(file);
        setImgName(prev=>({...prev,img:ImgUrl}))
        setPersonalinfo(prev=>({...prev,img:ImgUrl}))
    }
      }
      setPersonalinfo(prev=>({...prev,[name]:value}))
      setImgName(prev=>({...prev,[name]:value}))
    }
    const handleForm=(e)=>{
      update({name:personalInfo.name})
    }
    return (
        <Dialog>
          <DialogTrigger asChild>
            {children}
          </DialogTrigger>
          <DialogContent className="sm:min-w-[425px] bg-neutral-800 shadow-lg shadow-neutral-950 border-none">
            <DialogHeader>
              <DialogTitle className="text-xl">profile details</DialogTitle>
            </DialogHeader>
               <div onSubmit={handleForm} className='flex items-center gap-x-2'>
               <div className='w-4/12 flex items-center justify-center '>
                            <label htmlFor="image" className='group relative h-44 w-44 cursor-pointer'>
                                <div className='min-h-44 min-w-44 relative'>
                                    <Image src={data?.user.image ? data?.user.image :personalInfo.img} alt={"profile"} fill className='shadow-xl shadow-neutral-900 object-cover rounded-full' />
                                </div>
                                <div className='w-full h-full absolute top-0 left-0 rounded-full flex flex-col justify-center items-center gap-2 opacity-0 text-neutral-50 group-hover:bg-neutral-900/75 group-hover:opacity-100'>
                                   <MdOutlineEdit className='text-4xl'/> 
                                   <span className='text-base font-semibold '>Choose photo</span>
                                </div>
                                <input onChange={handleInputs} type="file" name="file" id="image" className='hidden' accept="image/*" />
                            </label>
                        </div>
                        <div className='w-8/12 pl-3 flex flex-col justify-center gap-3'>
                            <input type="text" placeholder={data?.user.name ? data.user.name : "Username"} name="name" id="" onChange={handleInputs} className='px-3 py-3 text-base font-medium rounded-md bg-neutral-700  placeholder:text-stone-200 placeholder:capitalize  focus:outline-neutral-50 ' />
                            <div className='w-full flex items-center justify-end'>
                            <button onClick={handleForm} className='w-3/12 py-2 px-3 text-base font-bold rounded-3xl bg-neutral-50 text-neutral-900  hover:scale-105'>Save</button>
                            </div>
                        </div>
               </div>
            <DialogFooter>
            <DialogDescription className="w-full flex items-center justify-start text-xs text-white font-bold">
            By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.
              </DialogDescription>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
}

export default UserDialog