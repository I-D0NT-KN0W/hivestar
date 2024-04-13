"use client"

import { Button } from "@/components/ui/button"
import { KeychainKeyTypes, KeychainSDK } from "keychain-sdk";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, FormEvent } from "react"
import { useRecoilState } from "recoil";
import { dataAtom } from "@/atoms/atoms";
import { SquarePlus } from 'lucide-react';
import { UploadButton } from "@/lib/uploadthing";
import { Post } from "keychain-sdk";


function Create() {

  const [ user, setUser ] = useRecoilState<string>(dataAtom)
    const [title, setTitle] = useState("");
    const [ resp , setResp] = useState("")


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
    //     console.log(name);
    
    //     setData({            
    //     username: name,
    //     message: "{\"login\":\"123\"}",
    //     method : KeychainKeyTypes.posting,
    //     title: "Login"
    // })

    //     console.log(data)
    try
    {
      const keychain = new KeychainSDK(window);
      undefined
      const formParamsAsObject = {
       "data": {
            "username": user,
            "title": title,
            "body": resp,
            "parent_perm": "blog",
            "json_metadata": "{\"format\":\"markdown\",\"description\":\"A blog post\",\"tags\":[\"Image\"]}",
            "permlink": title,
            "comment_options": ""
       }
  }
      
      const post = await keychain
           .post(
                formParamsAsObject.data as Post);
      console.log({ post });
    } catch (error) {
      console.log({ error });
    }
  
    }


  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><SquarePlus className="mr-1" />Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      {!user && <p className=" text-red-600">please login first</p>}
      { user && <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Upload your image</DialogTitle>
          <DialogDescription>
            Upload Image and write your title.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          let firstUrl = res.length > 0 ? res[0].url : '';
          setResp(firstUrl)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
            />
        </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className=" text-center">
              Title :
            </Label>
            <Input
            type="text"
              id="username"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">upload</Button>
        </DialogFooter>
      </form>}
      </DialogContent>
    </Dialog>
    </>
  )
}

export default Create;
