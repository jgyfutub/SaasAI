import { messages } from "@/app/lib/db/schema"
import { NextResponse } from "next/server"

// /api/create-chat
export async function POST(req:Request,res:Request){
    try{
        const body=await req.json()
        const [file_key,file_name]=body
        NextResponse.json({message:"success"})
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"server error"})
    }
}