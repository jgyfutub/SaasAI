import {Pinecone } from '@pinecone-database/pinecone'
import { dowloadFromS3 } from './s3-server'
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
let pinecone : Pinecone|null=null
export const getPineconeClient=async()=>{
    if(!pinecone){
        const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! })
    }
    return pinecone
}
export async function loadS3IntoPinecone(fileKey:string){
    console.log('downloading')
    const file_name=await dowloadFromS3(fileKey)
    if (!file_name){
     throw new Error("could not download from s3")
    }
    const loader=new PDFLoader(file_name)
    const pages=await loader.load()
    console.log()
    return pages
}