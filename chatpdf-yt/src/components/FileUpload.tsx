"use client"
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToS3 } from "../app/lib/db/s3";
import { useMutation } from "@tanstack/react-query";
import axios from 'axios'
import { toast } from "react-hot-toast";
const FileUpload=()=>{
    const [upload,isupload]=useState(false)
    const {mutate,isPending}=useMutation({
        mutationFn:async({file_key,file_name}:{file_key:string;file_name:string})=>{
            const response=await axios.post('@/api/create-chat',{file_key,file_name})
            return response.data
        }
    })
    const {getRootProps,getInputProps}=useDropzone({
        accept:{'application/pdf':[".pdf"]},
        maxFiles:1,
        onDrop:async (acceptedFiles)=>{
            console.log(acceptedFiles)
            const file=acceptedFiles[0]
            if (file.size>10*1024*1024){
                toast.error("file too large")
                alert("upload a smaller file")
                return
            }else{
                console.log("dd")
            }
           try{
            isupload(true)
            const data=await uploadToS3(file)
            if(!data?.file_key || !data.file_name){
                alert("Something went wrong")
            }
            mutate(data,{
                onSuccess:(data)=>{
                    console.log(data)
                },
                onError:(err)=>{
                    console.log(err)
                }
            })
           }catch(error){
            console.log(error)
           }finally{
            isupload(false)
           }
        }
    })
    return (
        <div className="p-2 bg-white rounded-xl">
            <div {...getRootProps({
                className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
            })}>
                <input {...getInputProps()}/>
                {(upload || isPending)?(
                    <>
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
                    <p className="mmt-2 text-sm text-slate-400">
                        sending text to gpt my nigga
                    </p>
                    </>
                ):(
                    <>
                    <Inbox className="w-10 h-10 text-blue-500"/>
                    <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
                    </>
                )}
            </div>
        </div>
    )
}
export default FileUpload