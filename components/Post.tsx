import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useRecoilState } from "recoil";
import { dataAtom } from "@/atoms/atoms";
import { KeychainSDK } from "keychain-sdk";
import { Vote } from "keychain-sdk";
import { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

 function Post({ data } : any) {

     const [ user, setUser ] = useRecoilState(dataAtom)
     const [link ,setLink ] = useState("")
     const [ auther , setAuher] = useState("")
     const [ weight , setWeight ] = useState("2000")


const handleSubmit = async ( event : any ) => {

    event.preventDefault();

try
{
    const keychain = new KeychainSDK(window);
    undefined
    const formParamsAsObject = {
     "data": {
          "username": user ,
          "author": auther,
          "permlink": link,
          "weight": weight,
     },
        "options": {
            "rpc":  "https://api.hive.blog",
        }
     
}
const vote = await keychain.vote(
     formParamsAsObject.data , formParamsAsObject.options);
console.log({ vote });
} catch (error) {
console.log({ error });
}
}

  return (
    <div className="flex flex-col space-y-2.5">

      {data.map((item : any, index : any) => (
       <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md" key={index}>
        {item.images.length > 0 ? (
                <CardContent className=" h-[90%] relative">
              {item.images.map((image : any, imageIndex : any) => (
                <Image
                key={imageIndex}
                src={image}
                alt={item.permlink}
                fill
                className="sm:rounded-md object-cover h-[80]"
              />
            ))}
            </CardContent>
          ) : (
            <p>No images found</p>
          )}
       <CardFooter key={index} className=" mt-3 flex justify-between h-[10%]">
                <p className="text-sm text-zinc-700 font-medium leading-none">
                  {item.username}
                </p>
        {/* <Button variant={"destructive"} onClick={(e) => setAuher(index.username) setLink(index.permalink) handleSubmit(e, item)}>❤</Button> */}
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="destructive" onClick={() => {setAuher(item.username); setLink(item.permalink)}}>❤</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Voting</DialogTitle>
                  {/* <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription> */}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Weight
                    </Label>
                    <Input
                    type="text"
                      id="username"
                      className="col-span-3"
                      value={weight}
                      onChange={(e) => 
                        setWeight(e.target.value) }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">vote</Button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </CardFooter>
     </Card>
      ))}
      

    </div>
  );
}

export default Post;
