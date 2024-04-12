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


function Loginbut() {

    const [name, setName] = useState("");
    const [data, setData] = useState({        username: "",
    message: "{\"login\":\"123\"}",
    method : KeychainKeyTypes.posting,
    title: "Login"
    })


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        console.log(name);
    
        setData({            
        username: name,
        message: "{\"login\":\"123\"}",
        method : KeychainKeyTypes.posting,
        title: "Login"
    })

        console.log(data)
        try
      {
        const keychain = new KeychainSDK(window);
       
        const login = await keychain.login(data);
        console.log({ login });
      } catch (error) {
        console.log({ error });
      }
    }


  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Login using keychain</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
            type="text"
              id="username"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">log in</Button>
        </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>
    </>
  )
}

export default Loginbut;
