import { messages } from "@/app/lib/db/schema"
import { NextResponse } from "next/server"

export async function POST(req:Request,res:Request){
    try{
        const body=await req.json()
        const [file_key,file_name]=body
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"server error"})
    }
}