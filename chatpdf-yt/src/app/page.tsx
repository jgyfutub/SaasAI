// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LinkProps } from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const {userId}=await auth()
  const isAuth= !userId
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          <UserButton afterSwitchSessionUrl="/"/>
        </div>
        <div className="flex mt-2">
          {isAuth &&
          <Button>Go to Chats</Button>}
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-800"> Join million of students,researchers and professionlas blah blah blah</p>
        <div className="w-full mt-4">
          {isAuth ? (<FileUpload/>):(
            // <LinkProps/>
            <div>
          <Button>
            Login to get started
            <LogIn className="w-4 h-4 ml-2"/>
          </Button>
          </div>
          // </Link>
          )}
        </div>
      </div>
      </div>
    </div>)
    

}