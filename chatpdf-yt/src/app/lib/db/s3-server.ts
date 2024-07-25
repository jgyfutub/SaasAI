import AWS from 'aws-sdk'
import fs from 'fs'
export async function  dowloadFromS3(file_key:string) {
    try{
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
            region: process.env.NEXT_PUBLIC_AWS_REGION
        })
        const s3=new AWS.S3({
            params:{
                Bucket:process.env.AWS_SECRET_BUCKET_NAME,
            },
            region:'eu-north-1'
        })
        const params={
            Bucket:"chatpdf-ved",
            Key:file_key
        }
        const obj=await s3.getObject(params).promise()
        const file_name=`/tmp/pdf-${Date.now()}.pdf`
        fs.writeFileSync(file_name,obj.Body as Buffer)
    }catch(error){
        console.log(error)
        return null
    }
}