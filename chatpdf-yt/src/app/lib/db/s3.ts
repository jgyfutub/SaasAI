import AWS from 'aws-sdk'
export async function uploadTable(file:File){
    try{
        AWS.config.update({
            accessKeyId:process.env.AWS_ACCESS_KEY_ID,
            // secretAccessKey
        })
    }catch(error){

    }
}